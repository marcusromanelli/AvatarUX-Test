import { _decorator } from 'cc';
import ResultPossibilities from './ResultPossibilities';
const {ccclass, property} = _decorator;

@ccclass('MachineData')
export default class MachineData{
  public static Machine_5_reels: MachineData = {
                                                    resultPossibilities: {
                                                      possibilities: [
                                                                        {id: "H3", percentage: 2, value: 100},
                                                                        {id: "H2", percentage: 4, value: 90},
                                                                        {id: "H4", percentage: 6, value: 80},
                                                                        {id: "H1", percentage: 8, value: 70},
                                                                        {id: "H5", percentage: 10, value: 60},
                                                                        {id: "H6", percentage: 12, value: 50},
                                                                        {id: "M1", percentage: 14, value: 40},
                                                                        {id: "M2", percentage: 16, value: 30},
                                                                        {id: "M3", percentage: 18, value: 20},
                                                                        {id: "M4", percentage: 20, value: 15},
                                                                        {id: "M5", percentage: 22, value: 10},
                                                                        {id: "M6", percentage: 24, value: 5},
                                                                        {id: "Q", percentage: 26, value: 4},
                                                                        {id: "9", percentage: 28, value: 3},
                                                                        {id: "10", percentage: 30, value: 2},
                                                                        {id: "A", percentage: 32, value: 2},
                                                                        {id: "K", percentage: 34, value: 2},
                                                                        {id: "J", percentage: 36, value: 2}
                                                                      ]
                                                  },
                                                  numberOfReels: 5,
                                                  numberOfTokens: 18,
                                                  numberOfRows: 3,
                                                  betValue: 1
  };

  public resultPossibilities: ResultPossibilities = null;
  public numberOfReels: number = 3;
  public numberOfTokens: number = 30;
  public numberOfRows: number = 3;
  public betValue: number = 1;
}