import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('MachineData')
export default class MachineData{
  public static Machine_5_reels: MachineData = {
                                                  numberOfReels: 5,
                                                  numberOfTokens: 18,
                                                  numberOfRows: 3,
                                                  betValue: 1
  };

  //public resultPossibilities: ResultPossibilities = null;
  public numberOfReels: number = 3;
  public numberOfTokens: number = 30;
  public numberOfRows: number = 3;
  public betValue: number = 1;
}