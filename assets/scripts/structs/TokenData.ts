import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('TokenData')
export default class TokenData {
    public isWinner:boolean;
    public tokenIndex: number;
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class TokenData {
//     public isWinner:boolean;
//     public tokenIndex: number;
// }
