import { _decorator, Component, Prefab, Widget, CCInteger, CCFloat, instantiate, CCString, Label, tween, Tween } from 'cc';
const { ccclass, property } = _decorator;

import SpinButton from '../ui/SpinButton';
import Reel from './Reel';
import EnumSlot from '../enumerators/SlotDirection';
import ResultData from '../structs/ResultData';
import MachineData from '../structs/MachineData';

@ccclass('Machine')
export default class Machine extends Component {
//  /**
//   * Spin button component
//   */
@property(CCString)
public machineId = "machine_test_identification";
//  /**
//   * Bet value component
//   */
@property(Label)
public betValueLabel = null;
//  /**
//   * Auto play component
//   */
@property(Label)
public autoPlaylabel = null;
//  /**
//   * Spin button component
//   */
@property(SpinButton)
public button = null;
//  /**
//   * Reel main prefab
//   */
@property(Prefab)
public _reelPrefab = null;
//  /**
//   * Machine widget component
//   */
@property(Widget)
public widget = null;
//  /**
//   * Celebration component
//   */
@property(Label)
public celebration = null;
@property({ type: Prefab })
get reelPrefab(): Prefab {
      return this._reelPrefab;
}
set reelPrefab(newPrefab: Prefab) {
      this._reelPrefab = newPrefab;

      if (newPrefab !== null) {
            this.createMachine();
      }
}

  private _machineData: MachineData ;
  /**
   * Delay time between each Reel spin
   */
  @property({ type: CCFloat, range: [0.01, 0.5], slide: true })
  public minRunTime = 2;
  private reelSpinDelaySpeed = 0.03;
  private reels: Reel[] = [];
  public isSpinning = false;
  private onFinishStop;
  private isAutoPlay = false;

//  /**
//   * initializes the machine state. If machine was already initialized, just reassign the generated Reels
//   */
  public SetData(machineData: MachineData): void{
      this._machineData = machineData;

      this.createMachine();
  }
 /**
  * Delete all generated children
  */
  clearChildren(): void{
        this.node.removeAllChildren();
        this.reels = [];
  }
 /**
  * Assign the current children to Reel list
  */
  assignChildren(): void{
        this.reels = this.node.getComponentsInChildren(Reel);

        let i = 1;
        this.reels.forEach(reel => {
              let spinDirection = (i % 2) ? EnumSlot.Direction.Down : EnumSlot.Direction.Up;

              reel.createReel(this._machineData.numberOfRows, i, spinDirection);
              i++;
        });
  }
 /**
  * Initializes all Reels
  */
  createMachine(): void {
      this.betValueLabel.string = "Bet value: $" + this._machineData.betValue;
      this.clearChildren();

      let newReel;

      for (let i = 0; i < this._machineData.numberOfReels; i += 1) {
            let spinDirection = i % 2 ? EnumSlot.Direction.Down : EnumSlot.Direction.Up;

            this.instantiateReel(spinDirection, i);
      }

      this.widget.updateAlignment();
  }
 /**
  * Instantiate a Reel and set a Spin Direction;
  * @param spinDirection Which direction will the Reel spin?
  */
  instantiateReel(spinDirection: number, i: number): void{
        let newReelNode = instantiate(this.reelPrefab);
        let newReel = newReelNode.getComponent(Reel);

        newReel.createReel(this._machineData.numberOfRows, i, spinDirection);


        this.node.addChild(newReel.node);
        this.reels.push(newReel);
  }
 /**
  * Machine spinning startup process
  */
  spin(): void {
        this.isSpinning = true;

        this.disableButton();

        this.spinAllReels();
  }
 /**
  * Spins all Reels
  */
  spinAllReels(): void{
        for (let i = 0; i < this._machineData.numberOfReels; i ++)
        this.spinReel(i);
  }
 /**
  * Spins a particular Reel
  * @param reelNumber Reel index
  */
  spinReel(reelNumber): void{
        if(reelNumber < 0)
          reelNumber = 0;

        if(reelNumber >= this._machineData.numberOfReels)
          reelNumber = this._machineData.numberOfReels - 1;

        this.reels[reelNumber].doSpin(this.reelSpinDelaySpeed * reelNumber);
  }
 /**
  * Shows the Main button with a preset "SPIN" label
  */
  showSpinButton(): void{
        this.showButtonWithLabel("SPIN");
  }
 /**
  * Shows the Main button with a custom string label
  * @param label The desirable text
  */
  showButtonWithLabel(label): void{
      if(!this.isAutoPlay)
            this.button.enable();

      this.button.setLabel(label);
  }
 /**
  * Disables the visibility of the Main button
  */
  disableButton(): void{
        this.button.disable();
  }

  calculateSpinStopDelayTime(randomSeed: number, reelIndex: number): number{
      return (reelIndex < 2 + randomSeed ? reelIndex / 4 : randomSeed * (reelIndex - 2) + reelIndex / 4) * 1000;
  }
  setAutoPlay(value: boolean): void{
      if(value)
            this.disableButton();

      this.isAutoPlay = value;

      this.autoPlaylabel.string = value ? "AUTOPLAY ON" : "" ;
  }

 /**
  * Machine spinning Stop process. Sends result information to each Reel.
  * @param result S
  */
  stop(result: ResultData, onFinishStop): void {
        this.disableButton();

        const rngMod = Math.random() / 2;
        let buttonDelay = this.calculateSpinStopDelayTime(rngMod, this._machineData.numberOfReels);

        setTimeout(() => {
            this.isSpinning = false;
        }, buttonDelay);

        for (let i = 0; i < this._machineData.numberOfReels; i += 1) {
            const spinDelay = this.calculateSpinStopDelayTime(rngMod, i);
            const theReel = this.reels[i];

            setTimeout(() => {
                  theReel.readyStop(result.selectedTokens[i], result.winningTokens);
            }, spinDelay);
        }

        this.showCelebration(result, buttonDelay, onFinishStop);
  }
  showCelebration(result: ResultData, buttonDelay: number, onFinishStop){
      var tryCelebrationLabel: Tween<unknown>;
      
      if(result.hasPrize())
            tryCelebrationLabel = tween()
            .target(this.celebration)
            .call(() => { this.showCelebrationLabel(result.totalPrize); } )
            .delay(2.5)
            .call(() => { this.hideCelebrationLabel(); });
      else
            tryCelebrationLabel = tween().target(this.node).delay(0.25);

      tween()
      .target(this.node)
      .delay(buttonDelay/1000)
      .call(() => {
            this.showGlowingTiles();
      })
      .delay(0.5)
      .call(() => {
            this.showPopWins();
      })
      .delay(0.5)
      .then(tryCelebrationLabel)
      .call(() => {
            this.showSpinButton();

            if(onFinishStop != null)
                  onFinishStop();
      }).start();
  }
  showCelebrationLabel(value: number){
      this.celebration.string = "WON $ " + value;
  }
  hideCelebrationLabel(){
      this.celebration.string = "";
  }
  showGlowingTiles(){
      for (let i = 0; i < this._machineData.numberOfReels; i += 1) {
            const theReel = this.reels[i];

            theReel.showGlowingTiles();
      }

  }
  showPopWins(){
      for (let i = 0; i < this._machineData.numberOfReels; i += 1) {
            const theReel = this.reels[i];

            theReel.showPopWins();
      }

  }
}