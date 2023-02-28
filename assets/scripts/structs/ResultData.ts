import { _decorator } from 'cc';
import { WinData as WinData } from '../managers/Server';
import UserData from './UserData';
const {ccclass, property} = _decorator;

@ccclass('ResultData')
export default class ResultData {
    public selectedTokens: Array<Array<string>> = null;
    public winningTokens: WinData[] = null;
    public newUserData: UserData = null;
}