import { _decorator, Component, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

import Machine from "../slots/Machine";
import RestManager from "./RestManager";
import ResultData from "../structs/ResultData";

@ccclass('GameManager')
export default class GameManager extends Component {
/**
 * Rest component
 */
  @property(RestManager)
  restManager = null;
/**
 * Main Machine component
 */
  @property(Machine)
  machine = null;
/**
 * Audio component
 */
  @property(AudioSource)
  audioSource = null;
/**
 * Button click asset
 * TODO: A SoundManager class should exist to manage such things
 */
  @property({ type: AudioClip })
  audioClick = null;
  private result: ResultData = null;
/**
 * Default button behaviour. Sets a Start or Stop signal to the Machine, depending on the current status
 */
  clickButton(): void {
        //this.audioSource.playEffect(this.audioClick, false);

        if(this.machine.isSpinning){
        this.stop();
        }else{
        this.roll();
        }
  }
/**
 * Sends a Stop signal to the Machine class and inform the received result
 */
  stop(): void{
        if (this.result == null)
        return;

        this.machine.stop(this.result);
        this.result = null;
  }
/**
 * Sends a Start signal to the machine
 */
  roll(): void {
        if (this.machine.isSpinning === true)
        return;

        this.machine.spin();
        this.requestResult();
  }
/**
 * Request Machine result from server
 */
  async requestResult(): Promise<void> {
        this.result = null;

        this.restManager.requestReelResult(this.machine.machineId, this.answerResult, this.answerError)
        .then(result => {
          this.machine.showStopButton();
          this.result = result;
        });
  }
  answerError(): any{
  //In case of endpoint error, we will just return random tiles.
        this.machine.showStopButton();
        this.result = null;
  }
/**
 * Send server requisition to receive new results
 */
  answerResult(answerResult): void {
  /*const slotResult = [];

  //This will be an server answer?
  //Assuming yes
        return new Promise<Array<Array<number>>>(resolve => {
        setTimeout(() => {
        resolve(slotResult);
        }, 1000 + 500 * Math.random());
        });*/
  }
}


// /**
//  * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
//  */
// import Machine from "../slots/Machine";
// import RestManager from "./RestManager";
// import ResultData from "../structs/ResultData";

// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class GameManager extends cc.Component {

//  /**
//   * Main Machine component
//   */
//  @property(RestManager)
//  restManager = null;

//  /**
//   * Main Machine component
//   */
//  @property(Machine)
//  machine = null;

//  /**
//   * Button click asset
//   * TODO: A SoundManager class should exist to manage such things
//   */
//  @property({ type: cc.AudioClip })
//  audioClick = null;

//  private result: ResultData = null;

//  /**
//   * Default button behaviour. Sets a Start or Stop signal to the Machine, depending on the current status
//   */
//  clickButton(): void {
//    cc.audioEngine.playEffect(this.audioClick, false);

//    if(this.machine.isSpinning){
//      this.stop();
//    }else{
//      this.roll();
//    }
//  }

//  /**
//   * Sends a Stop signal to the Machine class and inform the received result
//   */
//  stop(): void{
//    if (this.result == null)
//      return;

//    this.machine.stop(this.result);
//    this.result = null;
//  }

//  /**
//   * Sends a Start signal to the machine
//   */
//  roll(): void {
//    if (this.machine.isSpinning === true)
//      return;

//    this.machine.spin();
//    this.requestResult();
//  }


//  /**
//   * Request Machine result from server
//   */
//  async requestResult(): Promise<void> {
//    this.result = null;

//    this.restManager.requestReelResult(this.machine.machineId, this.answerResult, this.answerError)
//    .then(result => {
//      this.machine.showStopButton();
//      this.result = result;
//    });
//  }


//  answerError(): any{
//    //In case of endpoint error, we will just return random tiles.
//    this.machine.showStopButton();
//    this.result = null;
//  }
//  /**
//   * Send server requisition to receive new results
//   */
//  answerResult(answerResult): void {
//    /*const slotResult = [];

//    //This will be an server answer?
//    //Assuming yes
//    return new Promise<Array<Array<number>>>(resolve => {
//      setTimeout(() => {
//        resolve(slotResult);
//      }, 1000 + 500 * Math.random());
//    });*/
//  }
// }
