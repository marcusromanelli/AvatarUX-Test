import { _decorator, Component, SpriteFrame, AudioSource, Sprite, Node, resources, tween, v2, Vec3, ccenum } from 'cc';
const { ccclass, property } = _decorator;

import Slot from "../enumerators/SlotDirection";
import Reel from "./Reel";
import ResultData from "../structs/ResultData";
import TokenData from "../structs/TokenData";
import TokenIcon from '../structs/TokenIcon';
import TilePopWin from './TilePopWin';
import { PopWinData, WinData } from '../managers/Server';

@ccclass('Tile')
export default class Tile extends Component {
  @property({ type: [TokenIcon], visible: true })
  protected textures: TokenIcon[] = [];

  @property({ type: TilePopWin })
  private popWinUp: TilePopWin = null;

  @property({ type: TilePopWin })
  private popWinDown: TilePopWin = null;

  @property({ type: AudioSource })
  protected audioSource = null;

  @property({ type: Sprite })
  protected sprite = null;

  protected parentReel: Reel = null;
  protected spinDirectionModifier: number;
  protected willStopSpinning: boolean;
  protected tokenData: TokenData;
  protected currentSprite: TokenIcon;

  initialize(parentReel: Reel): void{
        this.parentReel = parentReel;
        this.disableGlowEffect();
  }
  reset(): void{
      this.popWinUp.hide();
      this.popWinDown.hide();
  }
  setToken(key: string): void {
      this.currentSprite =  this.textures.find(tex => tex.id == key);

      this.sprite.spriteFrame = this.currentSprite.sprite;
  }
  setPopWinData(popWinData: PopWinData){
      let key = popWinData.token.id;

      this.setToken(key);

      if(popWinData.won)
            this.enableGlowEffect();
  }
  setTokenData(tokenData: TokenData): void {

      if(tokenData.winnerData != null){
            let hasPopWin = tokenData.winnerData.popWinData.length > 0;

            if(hasPopWin){
                  var currentReelTopWinData = tokenData.winnerData.popWinData[this.parentReel.ReelIndex];
                  var currentReelBottomWinData = tokenData.winnerData.popWinData[this.parentReel.ReelIndex + 1];

                  this.popWinUp.setWinData(currentReelTopWinData);
                  this.popWinDown.setWinData(currentReelBottomWinData);
            }
      }

      let key = tokenData.tokenIndex;

      this.setToken(key);
  }
  showPopWin(): void{

  }
  setRandom(): void {
        const randomIndex = Math.floor(Math.random() * this.textures.length);

        this.setToken(this.textures[randomIndex].id);
  }
  startSpinning(spinDirectionModifier: number, startDelayTime: number): void{
      this.reset();

      this.tokenData = null;
      this.disableGlowEffect();
      this.spinDirectionModifier = spinDirectionModifier == Slot.Direction.Up ? 1 : -1;

      //Await to start
      const startDelay = tween().target(this.node).delay(startDelayTime);
      //Start moving
      const start = tween().target(this.node).by(0.25, { position: new Vec3(0, 144 * this.spinDirectionModifier, 0) }, { easing: 'backIn' });
      //Change Token
      const doChange = tween().call(() => this.changeTileToken());
      //??? Maybe call main spin loop?
      const callSpinning = tween().target(this.node).call(() => this.doContinueSpinning(5));

      startDelay
            .then(start)
            .then(doChange)
            .then(callSpinning)
            .start();
  }
 /**
  * Main spin loop
  * @param times Number of movements
  */
  doContinueSpinning(times = 1): void {      
      this.willStopSpinning = false;

      //Move again
      const move = tween().target(this.node).by(0.04, { position: new Vec3(0, 144 * this.spinDirectionModifier, 0) });
      //Change token again
      const doChange = tween().target(this.node).call(() => this.changeTileToken());

      //Repeat above loop x times
      const repeat = tween().target(this.node).repeat(times, move.then(doChange));

      //Check if after current loop, the reel is ready to stop
      const checkEnd = tween().target(this.node).call(() => this.checkSpinningHasEnded());

      //Initiate all these above
      repeat.then(checkEnd).start();
  }
 /**
  * Logic to check if the current Reel needs to stop or keep spinning
  * @param element Tile to check stuff to
  */
  checkSpinningHasEnded(): void {
        if (this.willStopSpinning) {
            this.audioSource.play();
            this.finnishSpinning();
        } else
            this.doContinueSpinning();
  }
 /**
  * Set a particular Tile to a particular Token number
  * @param element 
  */
  changeTileToken(): void {
        if (this.node.position.y * this.spinDirectionModifier > 288) {
            this.node.position = new Vec3(0, -288 * this.spinDirectionModifier, 0);

            if(this.parentReel.hasResult())
                  this.tokenData = this.parentReel.requestResult();

            if(this.tokenData == null)
                  this.setRandom();
            else
                  this.setTokenData(this.tokenData);
        }
  }
  public stopSpinning(): void{
        this.willStopSpinning = true;
  }
 /**
  * Stop spinning procedures
  * @param element 
  */
  finnishSpinning(): void {  
      //Move again
      const move = tween().target(this.node).by(0.04, { position: new Vec3(0, 144 * this.spinDirectionModifier, 0) }, { easing: 'bounceOut' });
      //Change Token (AGAIN)
      const doChange = tween().target(this.node).call(() => this.changeTileToken());
      //Finish 
      const end = tween().target(this.node).by(0.2, { position: new Vec3(0, 144 * this.spinDirectionModifier, 0) }, { easing: 'bounceOut' });

      //Run the damn thing
      move
      .then(doChange)
      .then(move)
      .then(doChange)
      .then(end)
      .then(doChange)
      .start();
  }
  checkGlowEffect(): void{
        if(this.tokenData != null && this.tokenData.winnerData)
            this.enableGlowEffect();
  }
  showPopWins(): void{
      this.popWinUp.showPopWin();
      this.popWinDown.showPopWin();
  }
  enableGlowEffect(): void{
        this.toggleGlowEffect(true);
  }
  disableGlowEffect(): void{
        this.toggleGlowEffect(false);
  }
  toggleGlowEffect(value: boolean): void{
      if(this.currentSprite == null)
            return;

      if(value)
            this.sprite.spriteFrame = this.currentSprite.glow;
      else
            this.sprite.spriteFrame = this.currentSprite.sprite;
  }
}