import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('ResultData')
export default class ResultData {
    public selectedTokens: Array<Array<number>> = null;
    public winningTokens: Array<number> = null;
}