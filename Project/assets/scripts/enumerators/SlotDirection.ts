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