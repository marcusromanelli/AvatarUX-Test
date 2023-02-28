import { _decorator, Component, random } from 'cc';
const {ccclass, property} = _decorator;

import ResultData from "../structs/ResultData";
import MachineData from '../structs/MachineData';
import UserData from '../structs/UserData';
import TokenPossibility from '../structs/Possibility';

export class WinData{
    public rowIndex: number = 0;
    public tokenIndex: TokenPossibility;
    public value = 0;
}

class RowTokenUse{
    public usedTokens: string[] = [];
}

//NOT OPTIMAL IMPLEMENTATION
//Just a placeholder

@ccclass('Server')
export default class Server extends Component{
    private _initialized = false;
    private _machines: { [id: string] : MachineData; } = {};
    private _users: UserData[] = [];

    private checkInitialization(){
        this.initialize();
    }

    private initialize(){
        if(this._initialized)
            return;

        this._machines["Machine_5_reels"] = MachineData.Machine_5_reels;
        this._initialized = true;
    }

   
    /**
     * Finds a machine on server by identification
     * @param machineId 
     */
    public GetMachineData(machineId: string): MachineData{
        this.checkInitialization();

        if(this._machines[machineId] == undefined)
            return null;

        return this._machines[machineId];
    }

    FindTokenById(currentMachine: MachineData, id: string): TokenPossibility{
        let tokens = currentMachine.resultPossibilities.possibilities;

        return tokens.find(token => token.id == id);        
    }

    FindTokenByPercentage(currentMachine: MachineData): TokenPossibility{
        let tokens = currentMachine.resultPossibilities.possibilities;
        const totalPercentage = tokens.reduce((acc, token) => acc + token.percentage, 0);
        let randomNum = Math.floor(Math.random() * totalPercentage);
        
        for (const token of tokens) {
            randomNum -= token.percentage;
            if (randomNum < 0) {
                return token;
            }
        }

        // This should never be reached, but just in case:
        throw new Error("Could not choose a token");
        
    }
    GetRandomToken(currentMachine: MachineData, usedTokens: RowTokenUse): TokenPossibility{
        let token: TokenPossibility;
        let canFinish = false;

        while(!canFinish){            
            token = this.FindTokenByPercentage(currentMachine);

            canFinish = usedTokens == null || usedTokens != null && usedTokens.usedTokens.filter(value => value == token.id).length <= 0;
        }

        return token;
    }
    /**
    * Generate the resulting number array for display
    * @param machineNumber 
    */
    public GetMachineResult(userId: string, machineNumber: string): ResultData{
        let user = this.GetUserData(userId);
        let currentMachine = this.GetMachineData(machineNumber);

        if(user.wallet - currentMachine.betValue < 0)
            return null;

        user.wallet -= currentMachine.betValue;

        //If current machine id is not registered, get the default one
        if(currentMachine == null)
            currentMachine = MachineData.Machine_5_reels;

        let finalResultData: ResultData = new ResultData;
        finalResultData.selectedTokens = [];
        finalResultData.newUserData = user;

        let winningData: WinData[] = [];
        let usedTokensPerReel: { [rowNumber: number] : RowTokenUse; } = {};

        for(let row = 0; row < currentMachine.numberOfRows; row++){
            let lastChosenToken = { token: new TokenPossibility, count: 0};

            for(let reel = 0; reel < currentMachine.numberOfReels; reel++){
                let randomToken = this.GetRandomToken(currentMachine, usedTokensPerReel[reel]);
                let tokenKey = randomToken.id;

                /*if((row == 0 && reel == 0) || (row == 0 && reel == 1) || (row == 0 && reel == 2)){
                    randomToken = this.FindTokenById(currentMachine, "9");
                    tokenKey = randomToken.id;
                }*/

                if(!(reel in usedTokensPerReel)){
                    usedTokensPerReel[reel] = { usedTokens: []};                    
                }

                usedTokensPerReel[reel].usedTokens.push(tokenKey);


                if(finalResultData.selectedTokens.length < reel)
                    finalResultData.selectedTokens.push([]);

                if(finalResultData.selectedTokens[reel] == null)
                    finalResultData.selectedTokens[reel] = [];

                finalResultData.selectedTokens[reel].push(tokenKey);

                if(lastChosenToken.token.id == tokenKey){
                    lastChosenToken.count++;
                    
                    if(lastChosenToken.count >= 3)
                        winningData[row] = { rowIndex: row, tokenIndex: lastChosenToken.token, value: lastChosenToken.count * lastChosenToken.token.value  };
                }else{
                    lastChosenToken.token = randomToken;
                    lastChosenToken.count = 1;
                }
            }
        }

        finalResultData.winningTokens = winningData;

        if(finalResultData.hasPrize()){
            let totalPrize = 0;

            finalResultData.winningTokens.forEach(element => {
                totalPrize += element.value;
            })

            totalPrize = totalPrize * currentMachine.betValue;

            finalResultData.totalPrize = totalPrize;


            user.wallet += totalPrize;
        }

        return finalResultData;
    }

    /**
     * Finds a machine on server by identification
     * @param machineId 
     */
    public GetUserData(userId: string): UserData{
        this.checkInitialization();

        let userData = null;

        if(this._users != null){
            this._users.forEach(element => {
                if(userData != null)
                    return;

                if(element.id == userId){
                    userData = element;
                }
            });
        }else
            this._users = [];

        if(userData == null){
            userData = new UserData();
            this._users.push(userData);
        }

        return userData;
    }
}