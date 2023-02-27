import { _decorator, Component, Prefab, Widget, CCInteger, CCFloat, instantiate, CCString, Label } from 'cc';
const { ccclass, property } = _decorator;

import SpinButton from '../ui/SpinButton';
import Reel from './Reel';
import EnumSlot from '../enumerators/SlotDirection';
import ResultPossibilities from '../structs/ResultPossibilities';
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
//   * Spin button component
//   */
@property(Label)
public betValueLabel = null;
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
  private reelSpinDelaySpeed = 0.03;
  private reels = [];
  public isSpinning = false;

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
        this.reels = this.node.getComponentsInChildren("Reel");

        let i = 1;
        this.reels.forEach(reel => {
              let spinDirection = (i % 2) ? EnumSlot.Direction.Down : EnumSlot.Direction.Up;

              reel.createReel(""+i+" - ", spinDirection);
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

        newReel.createReel(this._machineData.numberOfRows, i + " - ", spinDirection);


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
  * Shows the Main button with a preset "STOP" label
  */
  showStopButton(): void {
      this.showButtonWithLabel("STOP");
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
      this.button.enable();
      this.button.setLabel(label);
  }
 /**
  * Disables the visibility of the Main button
  */
  disableButton(): void{
        this.button.disable();
  }
 /**
  * Machine spinning Stop process. Sends result information to each Reel.
  * @param result S
  */
  stop(result: ResultData = null): void {
        this.disableButton();

        setTimeout(() => {
        this.isSpinning = false;

        this.showSpinButton();
        }, 2500);

        const rngMod = Math.random() / 2;
        for (let i = 0; i < this._machineData.numberOfReels; i += 1) {
        const spinDelay = i < 2 + rngMod ? i / 4 : rngMod * (i - 2) + i / 4;
        const theReel = this.reels[i];

        setTimeout(() => {
        theReel.readyStop(result.selectedTokens[i], result.winningTokens);
        }, spinDelay * 1000);
        }
  }
}