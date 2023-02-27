import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('ResultData')
export default class ResultData {
    public selectedTokens: Array<Array<number>> = null;
    public winningTokens: Array<number> = null;
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class ResultData {
//     public selectedTokens: Array<Array<number>> = null;
//     public winningTokens: Array<number> = null;
// }
