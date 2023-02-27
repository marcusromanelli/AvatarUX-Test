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