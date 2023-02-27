import { _decorator, Component, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;

import Machine from "../slots/Machine";
import RestManager from "./RestManager";
import ResultData from "../structs/ResultData";
import MachineData from '../structs/MachineData';
import UserData from '../structs/UserData';
import User from './User';

@ccclass('GameManager')
export default class GameManager extends Component {
 /**
   * Rest component
   */
  @property(RestManager)
  restManager = null;
  /**
    * User manager component
    */
   @property(User)
   user = null;
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

  start(): void{
      this.initialize();
  }

  initialize(): void{
      this.restManager.requestMachineData(this.machine.machineId, this.answerResult, this.answerError)
      .then(result => {
            this.initializeMachine(result)
      });
      
      this.restManager.requestUserData(this.user, this.answerResult, this.answerError)
      .then(result => {
            this.refreshUserData(result)
      });
  }

  initializeMachine(machineData: MachineData): void{
      this.machine.SetData(machineData);
      this.machine.node.parent.active = true;
  }

  refreshUserData(userData: UserData){
      this.user.Update(userData);
  }


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
        
        this.requestResult(result => {
            if(result == null)
                  return;

            this.refreshUserData(result.newUserData);
            this.result = result;
            this.machine.spin();
            this.machine.showStopButton();
        });
  }
/**
 * Request Machine result from server
 */
  async requestResult(onResult): Promise<void> {
        this.result = null;

        this.restManager.requestReelResult(this.user.id, this.machine.machineId, this.answerResult, this.answerError)
        .then(result => {
            onResult(result);
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