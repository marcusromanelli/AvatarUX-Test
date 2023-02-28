import { _decorator } from 'cc';
import { ChosenRowData } from '../managers/Server';
const {ccclass, property} = _decorator;

import TokenData from "./TokenData";

@ccclass('ResultReel')
export default class ResultReel {
    public selectedTokens: Array<string> = null;
    //public winningTokens: ChosenRowData[] = null;

    //isTokenWinning(tokenIndex: number): boolean{
    //     return this.winningTokens.filter(winningTokenIndex => winningTokenIndex.tokenIndex == tokenIndex).length > 0;
    //}
    getNextToken(): TokenData{
        let tokenData = new TokenData;

        tokenData.tokenIndex = this.selectedTokens.pop();
        //tokenData.isWinner = this.isTokenWinning(tokenData.tokenIndex);

        return tokenData;
    }
}