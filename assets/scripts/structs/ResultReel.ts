import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import TokenData from "./TokenData";

@ccclass('ResultReel')
export default class ResultReel {
    public selectedTokens: Array<number> = null;
    public winningTokens: Array<number> = null;
    isTokenWinning(tokenIndex: number): boolean{
         return this.winningTokens.filter(winningTokenIndex => winningTokenIndex == tokenIndex).length > 0;
    }
    getNextToken(): TokenData{
        let tokenData = new TokenData;

        tokenData.tokenIndex = this.selectedTokens.pop();
        tokenData.isWinner = this.isTokenWinning(tokenData.tokenIndex);

        return tokenData;
    }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import TokenData from "./TokenData";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class ResultReel {
//     public selectedTokens: Array<number> = null;
//     public winningTokens: Array<number> = null;
// 
//     isTokenWinning(tokenIndex: number): boolean{
//         return this.winningTokens.filter(winningTokenIndex => winningTokenIndex == tokenIndex).length > 0;
//     }
// 
//     getNextToken(): TokenData{
//         let tokenData = new TokenData;
// 
//         tokenData.tokenIndex = this.selectedTokens.pop();
//         tokenData.isWinner = this.isTokenWinning(tokenData.tokenIndex);
// 
//         return tokenData;
//     }
// }
