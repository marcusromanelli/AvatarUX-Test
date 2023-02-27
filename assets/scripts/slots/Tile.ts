import { _decorator, Component, SpriteFrame, AudioSource, Sprite, Node, resources, tween, v2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import Slot from "../enumerators/SlotDirection";
import Reel from "./Reel";
import ResultData from "../structs/ResultData";
import TokenData from "../structs/TokenData";

@ccclass('Tile')
export default class Tile extends Component {
  @property({ type: [SpriteFrame], visible: true })
  private textures = [];

  @property({ type: AudioSource })
  private audioSource = null;

  @property({ type: Sprite })
  private sprite = null;

  @property({ type: Node })
  private glowEffect = null;

  private parentReel = null;
  private spinDirectionModifier: number;
  private willStopSpinning: boolean;
  private tokenData: TokenData;

  initialize(parentReel: Reel): void{
        this.parentReel = parentReel;
        this.disableGlowEffect();
  }
  /*async onLoad(): Promise<void> {
        await this.loadTextures();
  }
  async resetInEditor(): Promise<void> {
        await this.loadTextures();
        this.setRandom();
  }
  async loadTextures(): Promise<boolean> {
        const tile = this;

        return new Promise<boolean>(resolve => {
            resources.load("gfx/Square", SpriteFrame, (err, loadedTextures) => {
                  tile.textures = loadedTextures;
                  resolve(true);
            });
        });
  }*/
  setToken(index: number): void {
        this.sprite.spriteFrame = this.textures[index];
  }
  setRandom(): void {
        const randomIndex = Math.floor(Math.random() * this.textures.length);
        this.setToken(randomIndex);
  }
  startSpinning(spinDirectionModifier: number, startDelayTime: number): void{
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
                  this.setToken(this.tokenData.tokenIndex);
        }
  }
  stopSpinning(resultTokenIndex: number): void{
        this.willStopSpinning = true;
   //this.resultToken = resultTokenIndex;
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

      //Check glow effect
      const doCheckGlow = tween().target(this.node).call(() => this.checkGlowEffect());

      //Run the damn thing
      move
      .then(doChange)
      .then(move)
      .then(doChange)
      .then(end)
      .then(doChange)
      .then(doCheckGlow)
      .start();
  }
  checkGlowEffect(): void{
        if(this.tokenData != null && this.tokenData.isWinner)
            this.enableGlowEffect();
  }
  enableGlowEffect(): void{
        this.toggleGlowEffect(true);
  }
  disableGlowEffect(): void{
        this.toggleGlowEffect(false);
  }
  toggleGlowEffect(value: boolean): void{
        this.glowEffect.active = value;
  }
}


// /**
//  * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
//  */
// import Slot from "../enumerators/SlotDirection";
// import Reel from "./Reel";
// import ResultData from "../structs/ResultData";
// import TokenData from "../structs/TokenData";

// const { ccclass, property } = _decorator;

// @ccclass
// export default class Tile extends Component {
//   @property({ type: [SpriteFrame], visible: true })
//   private textures = [];
//   @property({ type: AudioSource })
//   private audioSource = null;
//   @property({ type: Sprite })
//   private sprite = null;
//   @property({ type: Node })
//   private glowEffect = null;

//   private parentReel = null;
//   private spinDirectionModifier: number;
//   private willStopSpinning: boolean;
//   private tokenData: TokenData;

//   initialize(parentReel: Reel): void{
//     this.parentReel = parentReel;
//     this.disableGlowEffect();
//   }

//   async onLoad(): Promise<void> {
//     await this.loadTextures();
//   }

//   async resetInEditor(): Promise<void> {
//     await this.loadTextures();
//     this.setRandom();
//   }

//   async loadTextures(): Promise<boolean> {
//     const self = this;
//     return new Promise<boolean>(resolve => {
//       loader.loadResDir('gfx/Square', SpriteFrame, function afterLoad(err, loadedTextures) {
//         self.textures = loadedTextures;
//         resolve(true);
//       });
//     });
//   }

//   setToken(index: number): void {
//     this.sprite.spriteFrame = this.textures[index];
//   }

//   setRandom(): void {
//     const randomIndex = Math.floor(Math.random() * this.textures.length);
//     this.setToken(randomIndex);
//   }


//   startSpinning(spinDirectionModifier: number, startDelayTime: number): void{
//       this.tokenData = null;
//       this.disableGlowEffect();
//       this.spinDirectionModifier = spinDirectionModifier == Slot.Direction.Up ? 1 : -1;

//       //Await to start
//       const startDelay = tween().target(this.node).delay(startDelayTime);
//       //Start moving
//       const start = tween().target(this.node).by(0.25, { position: v2(0, 144 * this.spinDirectionModifier) }, { easing: 'backIn' });
//       //Change Token
//       const doChange = tween().call(() => this.changeTileToken());
//       //??? Maybe call main spin loop?
//       const callSpinning = tween().target(this.node).call(() => this.doContinueSpinning(5));

//       startDelay
//         .then(start)
//         .then(doChange)
//         .then(callSpinning)
//         .start();
//   }
//   /**
//    * Main spin loop
//    * @param times Number of movements
//    */
//   doContinueSpinning(times = 1): void {
//     this.willStopSpinning = false;

//     //Move again
//     const move = tween().by(0.04, { position: v2(0, 144 * this.spinDirectionModifier) });
//     //Change token again
//     const doChange = tween().call(() => this.changeTileToken());

//     //Repeat above loop x times
//     const repeat = tween().target(this.node).repeat(times, move.then(doChange));

//     //Check if after current loop, the reel is ready to stop
//     const checkEnd = tween().call(() => this.checkSpinningHasEnded());

//     //Initiate all these above
//     repeat.then(checkEnd).start();
//   }


//   /**
//    * Logic to check if the current Reel needs to stop or keep spinning
//    * @param element Tile to check stuff to
//    */
//   checkSpinningHasEnded(): void {
//     if (this.willStopSpinning) {
//       this.audioSource.play();
//       this.finnishSpinning();
//     } else
//       this.doContinueSpinning();
//   }

//   /**
//    * Set a particular Tile to a particular Token number
//    * @param element 
//    */
//   changeTileToken(): void {
//     if (this.node.position.y * this.spinDirectionModifier > 288) {
//       this.node.position = v2(0, -288 * this.spinDirectionModifier);

//       if(this.parentReel.hasResult()){
//         this.tokenData = this.parentReel.requestResult();
//       }

//       if(this.tokenData == null)
//         this.setRandom();
//       else
//         this.setToken(this.tokenData.tokenIndex);      
//     }
//   }

//   stopSpinning(resultTokenIndex: number): void{
//     this.willStopSpinning = true;
//     //this.resultToken = resultTokenIndex;
//   }
//   /**
//    * Stop spinning procedures
//    * @param element 
//    */
//   finnishSpinning(): void {  
//     //Move again
//     const move = tween().target(this.node).by(0.04, { position: v2(0, 144 * this.spinDirectionModifier) }, { easing: 'bounceOut' });
//     //Change Token (AGAIN)
//     const doChange = tween().call(() => this.changeTileToken());
//     //Finish 
//     const end = tween().by(0.2, { position: v2(0, 144 * this.spinDirectionModifier) }, { easing: 'bounceOut' });

//     //Check glow effect
//     const doCheckGlow = tween().call(() => this.checkGlowEffect());

//     //Run the damn thing
//     move
//       .then(doChange)
//       .then(move)
//       .then(doChange)
//       .then(end)
//       .then(doChange)
//       .then(doCheckGlow)
//       .start();
//   }

//   checkGlowEffect(): void{
//     if(this.tokenData != null && this.tokenData.isWinner){
//       this.enableGlowEffect();
//     }
//   }

//   enableGlowEffect(): void{
//     this.toggleGlowEffect(true);
//   }

//   disableGlowEffect(): void{
//     this.toggleGlowEffect(false);
//   }

//   toggleGlowEffect(value: boolean): void{
//     this.glowEffect.active = value;
//   }
// }
