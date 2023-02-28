import { _decorator } from 'cc';
import { ChosenRowData } from '../managers/Server';
import UserData from './UserData';
const {ccclass, property} = _decorator;

@ccclass('ResultData')
export default class ResultData {
    public selectedTokens: Array<Array<number>> = null;
    public winningTokens: ChosenRowData[] = null;
    public newUserData: UserData = null;
}