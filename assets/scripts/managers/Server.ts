import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import ResultPossibilities from "../structs/ResultPossibilities";
import EnumResult from "../enumerators/ResultType";
import Possibility from "../structs/Possibility";
import ResultData from "../structs/ResultData";
class ChosenRowData{
    public rowIndex: number = 0;
    public tokenIndex: number = 0;
}
class ServerMachine{
    public static DefaultMachine: ServerMachine = {
        resultPossibilities: {
                                possibilities: [
                                                {type: EnumResult.Type.NoResult, percentage: 50},
                                                {type: EnumResult.Type.OneRow, percentage: 33},
                                                {type: EnumResult.Type.TwoRows, percentage: 10},
                                                {type: EnumResult.Type.ThreeRows, percentage: 7}
                                            ]
                             },
                             numberOfReels: 3,
                             numberOfTokens: 30,
                             numberOfReelRows: 3
    };
    public resultPossibilities: ResultPossibilities = null;
    public numberOfReels: number = 3;
    public numberOfTokens: number = 30;
    public numberOfReelRows: number = 3;
}
//NOT OPTIMAL IMPLEMENTATION
//Just a placeholder

@ccclass('Server')
export default class Server extends Component{
    private _machines: { [id: string] : ServerMachine; } = {};
    start(): void{
        this._machines["machine_test_identification"] = ServerMachine.DefaultMachine;
    }
   /**
    * Finds a machine on server by identification
    * @param machineId 
    */
    private GetMachine(machineId: string): ServerMachine{
        if(this._machines[machineId] == undefined)
        return null;

        return this._machines[machineId];
    }
   /**
    * Choose which kind of result the machine will output
    * @param PossibilitiesCollection 
    */
    private CalculatePossibility(PossibilitiesCollection: ResultPossibilities): Possibility{
        let possibilities = PossibilitiesCollection.possibilities;

        let sumOfWeights = 0;

        for(let i = 0; i < possibilities.length; i++) {
        sumOfWeights += possibilities[i].percentage;
        }

        let randomNumber = Math.random() * sumOfWeights;
        let chosenPossibility;

        for(let i = 0; i < possibilities.length; i++) {
        if(randomNumber < possibilities[i].percentage){
        chosenPossibility = possibilities[i];
        break;
        }

        randomNumber -= possibilities[i].percentage;
        }

        return chosenPossibility;
    }
   /**
    * Generate the resulting number array for display
    * @param machineNumber 
    */
    public GetMachineResult(machineNumber: string): ResultData{
        let finalArray: Array<Array<number>> = null;
        let currentMachine = this.GetMachine(machineNumber);
        let chosenPossibility;

       //If current machine id is not registered, get the default one
        if(currentMachine == null)
            currentMachine = ServerMachine.DefaultMachine;

       //First calculate possibility among existing ones
        chosenPossibility = this.CalculatePossibility(currentMachine.resultPossibilities);

        let numberOfTokens = currentMachine.numberOfTokens
        let numberOfRows = currentMachine.numberOfReelRows;

       //Select which rows are not going to be randomized (will be equals)
        let numberOfWinningRows = chosenPossibility.type;


       //Fill an array with all possible tokens to choose
        let tokensIndexArray = this.getTokenArray(numberOfTokens);

       //Index of winning rows
        let winningRowsData: ChosenRowData[] = [];

       //If there is a winner, decice which of the rows will be chosen and what tokens will be chosen
       //Made it this way to future-proof the method, in case of machines with more than 3 rows
        if(chosenPossibility.type != EnumResult.Type.NoResult)
            winningRowsData = this.chooseRandomWinnerRows(numberOfWinningRows, currentMachine, tokensIndexArray);

        finalArray = this.generateFinalArray(winningRowsData, currentMachine);


        let finalResultData: ResultData = new ResultData;
        finalResultData.selectedTokens = finalArray;

        let winningTokens = []
        winningRowsData.forEach(element => {
            winningTokens.push(element.tokenIndex);
        });
        finalResultData.winningTokens = winningTokens;

        return finalResultData;
    }
    /**
     * Generates the final array based on the input winning row data, remaining token array and machine
     */
    generateFinalArray(winningRowsData: Array<ChosenRowData>, currentMachine: ServerMachine){
        let finalArray = [];

       //Initialize main array
        finalArray = [];
        for(let i = 0; i < currentMachine.numberOfReels; i++){
        finalArray.push([]);
        }

        let allPossibleTokens = this.getTokenArray(currentMachine.numberOfTokens, winningRowsData);

       //Fill in main array
        for(let currentReelNumber = 0; currentReelNumber < currentMachine.numberOfReels; currentReelNumber++){
           //This will prevent randomized tiles to repeat on the same reel
            let currentReelTokens = allPossibleTokens.map(a => a);

            for(let currentRowNumber = 0; currentRowNumber < currentMachine.numberOfReelRows; currentRowNumber++){
                let isThisWinnerRow = winningRowsData.filter(value => value.rowIndex == currentRowNumber);

                let thisPlaceToken;

                if(isThisWinnerRow.length > 0){
                    let rowData = isThisWinnerRow[0];

                    thisPlaceToken = rowData.tokenIndex;
                }else{
                    let randomTokenIndex = Math.floor(Math.random() * (currentReelTokens.length - 1));
                    let randomToken = currentReelTokens[randomTokenIndex];

                    thisPlaceToken = randomToken;

                    currentReelTokens.splice(randomTokenIndex, 1);
                }

                finalArray[currentReelNumber].push(thisPlaceToken);
            }
        }



        return finalArray;
    }
   /**
    * Generates a token array
    * @param numberOfTokens 
    */
    getTokenArray(numberOfTokens: number, winningTokensData?: Array<ChosenRowData>): Array<number>{

        let allTokensIndexes = [];
        for(let i = 0; i < numberOfTokens; i++){
            if(winningTokensData == undefined){
                allTokensIndexes.push(i);
                continue;
            }

            let canUseToken = true;

            //Make sure the random generated tokens will not repeat the winning ones
            winningTokensData.forEach(winningElement => {
                if(winningElement.tokenIndex == i)
                canUseToken = false;
            });

            if(canUseToken)
                allTokensIndexes.push(i);
        }


        return allTokensIndexes;
    }
   /**
    * Calculate all the winning rows
    * @param numberOfWinningRows 
    * @param currentMachine 
    * @param tokenIndexArray 
    */
    chooseRandomWinnerRows(numberOfWinningRows: number, currentMachine: ServerMachine, tokenIndexArray: Array<number>): Array<ChosenRowData>{
        let winningRowsData = [];

        let canFinishLoop = false;
        for(let i = 0; i < numberOfWinningRows; i++){
            let indexNumber;
            let randomTokenIndex;


            //First select which row index
            canFinishLoop = false;

            while(!canFinishLoop){
                indexNumber= Math.floor(Math.random() * currentMachine.numberOfReelRows); //0 to numberOfRows
                randomTokenIndex = Math.floor(Math.random() * (currentMachine.numberOfTokens - 1));

                if(i > 0){
                    //check if this row or token has been used before
                    let hasBeenUsedBefore = winningRowsData.filter(value => value.rowIndex == indexNumber || value.tokenIndex == randomTokenIndex).length > 0;

                    canFinishLoop = !hasBeenUsedBefore;
                }else
                    canFinishLoop = true;
            }


            let rowData: ChosenRowData = new ChosenRowData;
            rowData.rowIndex = indexNumber;
            rowData.tokenIndex = randomTokenIndex;

            winningRowsData.push(rowData);
            tokenIndexArray.splice(randomTokenIndex, 1);
        }

        return winningRowsData;
    }
}


// /**
//  * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
//  */
// import ResultPossibilities from "../structs/ResultPossibilities";
// import EnumResult from "../enumerators/ResultType";
// import Possibility from "../structs/Possibility";
// import ResultData from "../structs/ResultData";

// const {ccclass, property} = cc._decorator;

// class ChosenRowData{
//     public rowIndex: number = 0;
//     public tokenIndex: number = 0;
// }

// class ServerMachine{
//     public static DefaultMachine: ServerMachine = {
//         resultPossibilities: {
//                                 possibilities: [
//                                                 {type: EnumResult.Type.NoResult, percentage: 50},
//                                                 {type: EnumResult.Type.OneRow, percentage: 33},
//                                                 {type: EnumResult.Type.TwoRows, percentage: 10},
//                                                 {type: EnumResult.Type.ThreeRows, percentage: 7}
//                                             ]
//                              },
//                              numberOfReels: 3,
//                              numberOfTokens: 30,
//                              numberOfReelRows: 3
//     };

//     public resultPossibilities: ResultPossibilities = null;
//     public numberOfReels: number = 3;
//     public numberOfTokens: number = 30;
//     public numberOfReelRows: number = 3;
// }

// //NOT OPTIMAL IMPLEMENTATION
// //Just a placeholder
// @ccclass
// export default class Server extends cc.Component{
//     private _machines: { [id: string] : ServerMachine; } = {};

//     start(): void{
//         this._machines["machine_test_identification"] = ServerMachine.DefaultMachine;
//     }

//     /**
//      * Finds a machine on server by identification
//      * @param machineId 
//      */
//     private GetMachine(machineId: string): ServerMachine{
//         if(this._machines[machineId] == undefined)
//             return null;

//         return this._machines[machineId];
//     }

//     /**
//      * Choose which kind of result the machine will output
//      * @param PossibilitiesCollection 
//      */
//     private CalculatePossibility(PossibilitiesCollection: ResultPossibilities): Possibility{
//         let possibilities = PossibilitiesCollection.possibilities;

//         let sumOfWeights = 0;

//         for(let i = 0; i < possibilities.length; i++) {
//             sumOfWeights += possibilities[i].percentage;
//         }

//         let randomNumber = Math.random() * sumOfWeights;
//         let chosenPossibility;

//         for(let i = 0; i < possibilities.length; i++) {
//             if(randomNumber < possibilities[i].percentage){
//                 chosenPossibility = possibilities[i];
//                 break;
//             }

//             randomNumber -= possibilities[i].percentage;
//         }

//         return chosenPossibility;
//     }

//     /**
//      * Generate the resulting number array for display
//      * @param machineNumber 
//      */
//     public GetMachineResult(machineNumber: string): ResultData{
//         let finalArray: Array<Array<number>> = null;
//         let currentMachine = this.GetMachine(machineNumber);
//         let chosenPossibility;

//         //If current machine id is not registered, get the default one
//         if(currentMachine == null){
//             currentMachine = ServerMachine.DefaultMachine;
//         }

//         //First calculate possibility among existing ones
//         chosenPossibility = this.CalculatePossibility(currentMachine.resultPossibilities);

//         let numberOfTokens = currentMachine.numberOfTokens
//         let numberOfRows = currentMachine.numberOfReelRows;

//         //Select which rows are not going to be randomized (will be equals)
//         let numberOfWinningRows = chosenPossibility.type;
        
        
//         //Fill an array with all possible tokens to choose
//         let tokensIndexArray = this.getTokenArray(numberOfTokens);
        
//         //Index of winning rows
//         let winningRowsData: ChosenRowData[] = [];

//         //If there is a winner, decice which of the rows will be chosen and what tokens will be chosen
//         //Made it this way to future-proof the method, in case of machines with more than 3 rows
//         if(chosenPossibility.type != EnumResult.Type.NoResult)
//             winningRowsData = this.chooseRandomWinnerRows(numberOfWinningRows, currentMachine, tokensIndexArray);

//         finalArray = this.generateFinalArray(winningRowsData, currentMachine);


//         let finalResultData: ResultData = new ResultData;
//         finalResultData.selectedTokens = finalArray;

//         let winningTokens = []
//         winningRowsData.forEach(element => {
//             winningTokens.push(element.tokenIndex);
//         });
//         finalResultData.winningTokens = winningTokens;

//         return finalResultData;
//     }

//      /**
//       * Generates the final array based on the input winning row data, remaining token array and machine
//       */
//     generateFinalArray(winningRowsData: Array<ChosenRowData>, currentMachine: ServerMachine){
//         let finalArray = [];

//         //Initialize main array
//         finalArray = [];
//         for(let i = 0; i < currentMachine.numberOfReels; i++){
//             finalArray.push([]);
//         }

//         let allPossibleTokens = this.getTokenArray(currentMachine.numberOfTokens, winningRowsData);

//         //Fill in main array
//         for(let currentReelNumber = 0; currentReelNumber < currentMachine.numberOfReels; currentReelNumber++){
//             //This will prevent randomized tiles to repeat on the same reel
//             let currentReelTokens = allPossibleTokens.map(a => a);

//             for(let currentRowNumber = 0; currentRowNumber < currentMachine.numberOfReelRows; currentRowNumber++){

//                 let isThisWinnerRow = winningRowsData.filter(value => value.rowIndex == currentRowNumber);

//                 let thisPlaceToken;
//                 if(isThisWinnerRow.length > 0){
//                     let rowData = isThisWinnerRow[0];

//                     thisPlaceToken = rowData.tokenIndex;
//                 }else{
//                     let randomTokenIndex = Math.floor(Math.random() * (currentReelTokens.length - 1));
//                     let randomToken = currentReelTokens[randomTokenIndex];
                    
//                     thisPlaceToken = randomToken;

//                     currentReelTokens.splice(randomTokenIndex, 1);
//                 }

//                 finalArray[currentReelNumber].push(thisPlaceToken);
//             }
//         }



//         return finalArray;
//     }

//     /**
//      * Generates a token array
//      * @param numberOfTokens 
//      */
//     getTokenArray(numberOfTokens: number, winningTokensData?: Array<ChosenRowData>): Array<number>{

//         let allTokensIndexes = [];
//         for(let i = 0; i < numberOfTokens; i++){
//             if(winningTokensData == undefined){
//                 allTokensIndexes.push(i);
//                 continue;
//             }

//             let canUseToken = true;

//             //Make sure the random generated tokens will not repeat the winning ones
//             winningTokensData.forEach(winningElement => {
//                 if(winningElement.tokenIndex == i)
//                     canUseToken = false;
//             });

//             if(canUseToken)
//                 allTokensIndexes.push(i);
//         }
            

//         return allTokensIndexes;
//     }

//     /**
//      * Calculate all the winning rows
//      * @param numberOfWinningRows 
//      * @param currentMachine 
//      * @param tokenIndexArray 
//      */
//     chooseRandomWinnerRows(numberOfWinningRows: number, currentMachine: ServerMachine, tokenIndexArray: Array<number>): Array<ChosenRowData>{
//         let winningRowsData = [];

//         let canFinishLoop = false;
//         for(let i = 0; i < numberOfWinningRows; i++){
//             let indexNumber;
//             let randomTokenIndex;
            

//             //First select which row index
//             canFinishLoop = false;

//             while(!canFinishLoop){
//                 indexNumber= Math.floor(Math.random() * currentMachine.numberOfReelRows); //0 to numberOfRows
//                 randomTokenIndex = Math.floor(Math.random() * (currentMachine.numberOfTokens - 1));

//                 if(i > 0){
//                     //check if this row or token has been used before
//                     let hasBeenUsedBefore = winningRowsData.filter(value => value.rowIndex == indexNumber || value.tokenIndex == randomTokenIndex).length > 0;

//                     canFinishLoop = !hasBeenUsedBefore;
//                 }else 
//                     canFinishLoop = true;
//             }


//             let rowData: ChosenRowData = new ChosenRowData;
//             rowData.rowIndex = indexNumber;
//             rowData.tokenIndex = randomTokenIndex;

//             winningRowsData.push(rowData);
//             tokenIndexArray.splice(randomTokenIndex, 1);
//         }

//         return winningRowsData;
//     }
// }
