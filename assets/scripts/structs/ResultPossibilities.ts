import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import Possibility from "./Possibility";

@ccclass('ResultPossibilities')
export default class ResultPossibilities {
    possibilities: Possibility[] = [];
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import Possibility from "./Possibility";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class ResultPossibilities {
//     possibilities: Possibility[] = [];
// }
