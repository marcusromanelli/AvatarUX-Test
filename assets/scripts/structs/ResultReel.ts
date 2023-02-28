import { _decorator } from 'cc';
import { WinData } from '../managers/Server';
const {ccclass, property} = _decorator;

import TokenData from "./TokenData";

@ccclass('ResultReel')
export default class ResultReel {
    public selectedTokens: Array<string> = null;
    public winningTokens: WinData[] = null;

    isTokenWinning(tokenIndex: string): boolean{
         return this.winningTokens.filter(winningTokenIndex => winningTokenIndex.tokenIndex.id == tokenIndex).length > 0;
    }
    getNextToken(): TokenData{
        let tokenData = new TokenData;

        tokenData.tokenIndex = this.selectedTokens.pop();
        tokenData.isWinner = this.isTokenWinning(tokenData.tokenIndex);

        return tokenData;
    }
}