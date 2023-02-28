import { _decorator } from 'cc';
import { WinData } from '../managers/Server';
const {ccclass, property} = _decorator;

import TokenData from "./TokenData";

@ccclass('ResultReel')
export default class ResultReel {
    public selectedTokens: Array<string> = null;
    public winningTokens: WinData[] = null;

    isTokenWinning(tokenIndex: string, currentReel: number): WinData{
        if(this.winningTokens == null)
            return null

        let data = this.winningTokens.find(WinData => WinData != null && WinData.token.id == tokenIndex && currentReel >= WinData.startsAt);

        if(data == null)
            return null;

        if(data.winCount <= 0)
            return null;

        data.winCount--;

        return data;
    }
    getNextToken(currentReel: number): TokenData{
        let tokenData = new TokenData;

        tokenData.tokenIndex = this.selectedTokens.pop();
        tokenData.winnerData = this.isTokenWinning(tokenData.tokenIndex, currentReel);


        return tokenData;
    }
}