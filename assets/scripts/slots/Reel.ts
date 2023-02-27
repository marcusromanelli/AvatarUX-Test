import { _decorator, Component, Node, Layout, Enum, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import Slot from "../enumerators/SlotDirection";
import ResultData from "../structs/ResultData";
import ResultReel from "../structs/ResultReel";
import TokenData from "../structs/TokenData";

@ccclass('Reel')
export default class Reel extends Component {
  
/**
 * Reel main anchor
 */
  @property({ type: Node })
  public tileContainer = null;
/**
 * Reel layout
 */
  @property({ type: Layout })
  public layoutComponent = null;
/**
 * Reel spin direction
 */
  @property({ type: Enum(Slot.Direction) })
  public spinDirection = Slot.Direction.Down;
/**
 * Reel tiles array
 */
  @property({ type: [Node], visible: false })
  private tiles = [];
/**
 * Reel' Tile prefab
 */
  @property({ type: Prefab })
  public _tilePrefab = null;
  @property({ type: Prefab })
  get tilePrefab(): Prefab {
        return this._tilePrefab;
  }
  set tilePrefab(newPrefab: Prefab) {
        this._tilePrefab = newPrefab;
        this.tileContainer.removeAllChildren();
        this.tiles = [];

        if (newPrefab !== null) {
        this.createReel("");
        this.shuffle();
        }
  }
  private resultData: ResultReel = null;
/**
 * Instantiate all necessary Tiles
 */
  createReel(name: string, spinDirection?: number): void {
        if(this.tileContainer.childrenCount <= 0){
        this.tiles = [];

        this.layoutComponent.enabled = true;
    //TODO: Proceduralize tile count?
        for (let i = 0; i < 5; i ++){
        this.instantiateTile();
        }
        }else{
        this.tiles = this.getComponentsInChildren("Tile");
        }

        this.tiles.forEach(tile => {
        tile.initialize(this);
        });

        this.spinDirection = spinDirection;

        this.shuffle();
  }
/** Instantiate a single Tile */
  instantiateTile(): void{
        let newTileObject = instantiate(this.tilePrefab);
        let newTile = newTileObject.getComponent("Tile");

        this.tiles.push(newTile);

        this.tileContainer.addChild(newTile.node);
  }
/**
 * Shuffle all Tiles tokens
 */
  shuffle(): void {
        let i = 0;
        this.tiles.forEach(tile => {
        tile.setRandom();

        i++;
        });
  }
/**
 * Signals the Reel to stop spinning and show the received result
 * @param newResult Reel result
 */
  readyStop(newResult: Array<number>, winningTokens: Array<number>): void {
        const check = this.spinDirection === Slot.Direction.Down || newResult == null;

        this.resultData = new ResultReel;
        this.resultData.selectedTokens = check ? newResult : newResult.reverse();
        this.resultData.winningTokens = winningTokens;

        this.stopSpinning();
  }
/**
 * Start spinning procedure on each Tile
 * @param windUp Time to await before start spinning
 */
  doSpin(startDelayTime: number): void {
        this.layoutComponent.enabled = false;

        this.tiles.forEach(element => {
          element.startSpinning(this.spinDirection, startDelayTime);
        });
  }  
/**
 * Stop spinning all tiles
 */
  stopSpinning(): void{
        for(let i = 0; i < this.tiles.length; i++)
        this.tiles[i].stopSpinning();
  }
/**
 * Returns if server has returned a result
 */
  hasResult(): boolean{
        return this.resultData != null && this.resultData.selectedTokens.length > 0;
  }
/**
 * Request the next result in line
 */
  requestResult(): TokenData{
        return this.resultData.getNextToken();
  }
}


// /**
//  * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
//  */
// import Slot from "../enumerators/SlotDirection";
// import ResultData from "../structs/ResultData";
// import ResultReel from "../structs/ResultReel";
// import TokenData from "../structs/TokenData";


// const { ccclass, property } = cc._decorator;

// @ccclass
// export default class Reel extends cc.Component {
 
//  /**
//   * Reel main anchor
//   */
//  @property({ type: cc.Node })
//  public tileContainer = null;

//  /**
//   * Reel layout
//   */
//  @property({ type: cc.Layout })
//  public layoutComponent = null;

//  /**
//   * Reel spin direction
//   */
//  @property({ type: cc.Enum(Slot.Direction) })
//  public spinDirection = Slot.Direction.Down;

//  /**
//   * Reel tiles array
//   */
//  @property({ type: [cc.Node], visible: false })
//  private tiles = [];

//  /**
//   * Reel' Tile prefab
//   */
//  @property({ type: cc.Prefab })
//  public _tilePrefab = null;

//  @property({ type: cc.Prefab })
//  get tilePrefab(): cc.Prefab {
//    return this._tilePrefab;
//  }

//  set tilePrefab(newPrefab: cc.Prefab) {
//    this._tilePrefab = newPrefab;
//    this.tileContainer.removeAllChildren();
//    this.tiles = [];

//    if (newPrefab !== null) {
//      this.createReel("");
//      this.shuffle();
//    }
//  }

//  private resultData: ResultReel = null;

//  /**
//   * Instantiate all necessary Tiles
//   */
//  createReel(name: string, spinDirection?: number): void {
//    if(this.tileContainer.childrenCount <= 0){
//      this.tiles = [];

//      this.layoutComponent.enabled = true;
//      //TODO: Proceduralize tile count?
//      for (let i = 0; i < 5; i ++){
//        this.instantiateTile();
//      }
//    }else{
//      this.tiles = this.getComponentsInChildren("Tile");
//    }

//    this.tiles.forEach(tile => {
//      tile.initialize(this);
//    });

//    this.spinDirection = spinDirection;

//    this.shuffle();
//  }

//  /** Instantiate a single Tile */
//  instantiateTile(): void{
//    let newTileObject = cc.instantiate(this.tilePrefab);
//    let newTile = newTileObject.getComponent("Tile");

//    this.tiles.push(newTile);

//    this.tileContainer.addChild(newTile.node);
//  }

//  /**
//   * Shuffle all Tiles tokens
//   */
//  shuffle(): void {
//    let i = 0;
//    this.tiles.forEach(tile => {
//      tile.setRandom();

//      i++;
//    });
//  }

//  /**
//   * Signals the Reel to stop spinning and show the received result
//   * @param newResult Reel result
//   */
//  readyStop(newResult: Array<number>, winningTokens: Array<number>): void {
//    const check = this.spinDirection === Slot.Direction.Down || newResult == null;

//    this.resultData = new ResultReel;
//    this.resultData.selectedTokens = check ? newResult : newResult.reverse();
//    this.resultData.winningTokens = winningTokens;

//    this.stopSpinning();
//  }

//  /**
//   * Start spinning procedure on each Tile
//   * @param windUp Time to await before start spinning
//   */
//  doSpin(startDelayTime: number): void {
//    this.layoutComponent.enabled = false;

//    this.tiles.forEach(element => {
//      element.startSpinning(this.spinDirection, startDelayTime);
//    });
//  }  

//  /**
//   * Stop spinning all tiles
//   */
//  stopSpinning(): void{
//    for(let i = 0; i < this.tiles.length; i++)
//      this.tiles[i].stopSpinning();
//  }

//  /**
//   * Returns if server has returned a result
//   */
//  hasResult(): boolean{
//    return this.resultData != null && this.resultData.selectedTokens.length > 0;
//  }

//  /**
//   * Request the next result in line
//   */
//  requestResult(): TokenData{
//    return this.resultData.getNextToken();
//  }
// }
