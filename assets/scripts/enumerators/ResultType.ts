import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

enum EType {
  NoResult = 0,
  OneRow = 1,
  TwoRows = 2,
  ThreeRows = 3
}

@ccclass('ResultType')
export default class EnumResult extends Component {
    static Type = EType;
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const { ccclass } = cc._decorator;
// 
// 
// enum EType {
//   NoResult = 0,
//   OneRow = 1,
//   TwoRows = 2,
//   ThreeRows = 3
// }
//   
// @ccclass
// export default class EnumResult extends cc.Component {
//     static Type = EType;
//   }
