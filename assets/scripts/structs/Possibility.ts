import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import EnumResult from '../enumerators/ResultType';
// //This should be a struct, but since we don't have it...

@ccclass('Possibility')
export default class Possibility{
    type = EnumResult.Type.NoResult;
    percentage = 0;
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import EnumResult from '../enumerators/ResultType';
// 
// const {ccclass, property} = cc._decorator;
// 
// 
// //This should be a struct, but since we don't have it...
// @ccclass
// export default class Possibility{
//     type = EnumResult.Type.NoResult;
//     percentage = 0;
// }
