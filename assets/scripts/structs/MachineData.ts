import { _decorator } from 'cc';
import ResultPossibilities from './ResultPossibilities';
const {ccclass, property} = _decorator;

@ccclass('MachineData')
export default class MachineData{
  public static Machine_5_reels: MachineData = {
                                                    resultPossibilities: {
                                                      possibilities: [
                                                                        {token: "H3", percentage: 2, value: 100},
                                                                        {token: "H2", percentage: 4, value: 90},
                                                                        {token: "H4", percentage: 6, value: 80},
                                                                        {token: "H1", percentage: 8, value: 70},
                                                                        {token: "H5", percentage: 10, value: 60},
                                                                        {token: "H6", percentage: 12, value: 50},
                                                                        {token: "M1", percentage: 14, value: 40},
                                                                        {token: "M2", percentage: 16, value: 30},
                                                                        {token: "M3", percentage: 18, value: 20},
                                                                        {token: "M4", percentage: 20, value: 15},
                                                                        {token: "M5", percentage: 22, value: 10},
                                                                        {token: "M6", percentage: 24, value: 5},
                                                                        {token: "Q", percentage: 26, value: 4},
                                                                        {token: "9", percentage: 28, value: 3},
                                                                        {token: "10", percentage: 30, value: 2},
                                                                        {token: "A", percentage: 32, value: 2},
                                                                        {token: "K", percentage: 34, value: 2},
                                                                        {token: "J", percentage: 36, value: 2}
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