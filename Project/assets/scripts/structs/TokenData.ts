import { _decorator } from 'cc';
import { WinData } from '../managers/Server';
const {ccclass, property} = _decorator;

@ccclass('TokenData')
export default class TokenData {
    public winnerData: WinData;
    public tokenIndex: string;
}