import { _decorator, Component, AudioClip, AudioSource, Button } from 'cc';
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
  restManager: RestManager = null;
  /**
    * User manager component
    */
   @property(User)
   user: User = null;
 /**
   * Main Machine component
   */
  @property(Machine)
  machine: Machine = null;
 /**
   * Audio component
   */
  @property(AudioSource)
  audioSource: AudioSource = null;
 /**
 * Auto play button
 */
  @property({ type: Button })
  autoPlayButton: Button = null;
 /**
 * Button click asset
 * TODO: A SoundManager class should exist to manage such things
 */
  @property({ type: AudioClip })
  audioClick = null;


  private result: ResultData = null;
  private isAutoPlay = false;

  start(): void{
      this.initialize();
  }

  initialize(): void{
      this.restManager.requestMachineData(this.machine.machineId)
      .then(result => {
            this.initializeMachine(result)
      });
      
      this.restManager.requestUserData(this.user)
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
      if(!this.machine.isSpinning)
            this.roll();
  }
  toggleAutoPlay(): void{
      this.isAutoPlay = !this.isAutoPlay;

      this.machine.setAutoPlay(this.isAutoPlay);

      this.clickButton();
  }
/**
 * Sends a Stop signal to the Machine class and inform the received result
 */
  stop(): void{
        if (this.result == null)
        return;

        var manager = this;

        this.machine.stop(this.result, () => {
            if(manager.isAutoPlay)
                  manager.clickButton();
        });
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
            
            let gm = this;
            setTimeout(() => {
                  this.stop();
            }, this.machine.minRunTime * 1000);
        });
  }
/**
 * Request Machine result from server
 */
  async requestResult(onResult): Promise<void> {
        this.result = null;

        this.restManager.requestReelResult(this.user.id, this.machine.machineId)
        .then(result => {
            onResult(result);
        });
  }
}