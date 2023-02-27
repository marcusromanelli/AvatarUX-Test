import { _decorator } from 'cc';
import UserData from './UserData';
const {ccclass, property} = _decorator;

@ccclass('ResultData')
export default class ResultData {
    public selectedTokens: Array<Array<number>> = null;
    public winningTokens: Array<number> = null;
    public newUserData: UserData = null;
}