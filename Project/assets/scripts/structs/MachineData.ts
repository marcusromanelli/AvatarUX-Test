import { _decorator } from 'cc';
import ResultPossibilities from './ResultPossibilities';
const {ccclass, property} = _decorator;

@ccclass('MachineData')
export default class MachineData{
  public static Machine_5_reels: MachineData = {
                                                    resultPossibilities: {
                                                      possibilities: [
                                                                        {id: "H3", percentage: 4, value: 100, triggersPopWin: true},
                                                                        {id: "H2", percentage: 8, value: 90, triggersPopWin: false},
                                                                        {id: "H4", percentage: 12, value: 80, triggersPopWin: true},
                                                                        {id: "H1", percentage: 16, value: 70, triggersPopWin: false},
                                                                        {id: "H5", percentage: 20, value: 60, triggersPopWin: false},
                                                                        {id: "H6", percentage: 24, value: 50, triggersPopWin: true},
                                                                        {id: "M1", percentage: 28, value: 40, triggersPopWin: false},
                                                                        {id: "M2", percentage: 32, value: 30, triggersPopWin: false},
                                                                        {id: "M3", percentage: 34, value: 20, triggersPopWin: true},
                                                                        {id: "M4", percentage: 36, value: 15, triggersPopWin: true},
                                                                        {id: "M5", percentage: 38, value: 10, triggersPopWin: false},
                                                                        {id: "M6", percentage: 40, value: 5, triggersPopWin: false},
                                                                        {id: "Q", percentage: 42, value: 4, triggersPopWin: false},
                                                                        {id: "9", percentage: 44, value: 3, triggersPopWin: true},
                                                                        {id: "10", percentage: 48, value: 2, triggersPopWin: false},
                                                                        {id: "A", percentage: 50, value: 2, triggersPopWin: false},
                                                                        {id: "K", percentage: 52, value: 2, triggersPopWin: true},
                                                                        {id: "J", percentage: 56, value: 2, triggersPopWin: false}
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