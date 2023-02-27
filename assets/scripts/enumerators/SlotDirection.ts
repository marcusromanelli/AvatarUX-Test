import { _decorator, Component } from 'cc';
const { ccclass } = _decorator;

enum EDirection {
  Up,
  Down,
}

@ccclass('SlotDirection')
export default class EnumSlot extends Component {
  static Direction = EDirection;
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const { ccclass } = cc._decorator;
// 
// enum EDirection {
//   Up,
//   Down,
// }
// 
// @ccclass
// export default class EnumSlot extends cc.Component {
//   static Direction = EDirection;
// }
