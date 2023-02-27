import { _decorator } from 'cc';
import EnumResult from '../enumerators/ResultType';
import ResultPossibilities from './ResultPossibilities';
const {ccclass, property} = _decorator;

@ccclass('MachineData')
export default class MachineData{
  public static Machine_3_reels: MachineData = {
      resultPossibilities: {
                              possibilities: [
                                              {type: EnumResult.Type.NoResult, percentage: 50},
                                              {type: EnumResult.Type.OneRow, percentage: 33},
                                              {type: EnumResult.Type.TwoRows, percentage: 10},
                                              {type: EnumResult.Type.ThreeRows, percentage: 7}
                                          ]
                           },
                           numberOfReels: 3,
                           numberOfTokens: 19,
                           numberOfRows: 3,
                           betValue: 1
  };


  public static Machine_5_reels: MachineData = {
      resultPossibilities: {
                              possibilities: [
                                              {type: EnumResult.Type.NoResult, percentage: 50},
                                              {type: EnumResult.Type.OneRow, percentage: 33},
                                              {type: EnumResult.Type.TwoRows, percentage: 10},
                                              {type: EnumResult.Type.ThreeRows, percentage: 7}
                                          ]
                           },
                           numberOfReels: 5,
                           numberOfTokens: 19,
                           numberOfRows: 3,
                           betValue: 1
  };


  public static Machine_7_reels: MachineData = {
      resultPossibilities: {
                              possibilities: [
                                              {type: EnumResult.Type.NoResult, percentage: 50},
                                              {type: EnumResult.Type.OneRow, percentage: 33},
                                              {type: EnumResult.Type.TwoRows, percentage: 10},
                                              {type: EnumResult.Type.ThreeRows, percentage: 7}
                                          ]
                           },
                           numberOfReels: 7,
                           numberOfTokens: 19,
                           numberOfRows: 3,
                           betValue: 1
  };

  public resultPossibilities: ResultPossibilities = null;
  public numberOfReels: number = 3;
  public numberOfTokens: number = 30;
  public numberOfRows: number = 3;
  public betValue: number = 1;
}