import { _decorator, Component, SpriteFrame, AudioSource, Sprite, Node, resources, tween, v2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

import Slot from "../enumerators/SlotDirection";
import Reel from "./Reel";
import ResultData from "../structs/ResultData";
import TokenData from "../structs/TokenData";
import TokenIcon from '../structs/TokenIcon';
import Tile from './Tile';
import { PopWinData, WinData } from '../managers/Server';

@ccclass('TilePopWin')
export default class TilePopWin extends Component {

  private tile: Tile;  
  private popWinData: PopWinData = null;

  setWinData(popWinData: PopWinData): void{
      this.popWinData = popWinData;

      if(this.tile == null){
            this.tile = this.node.getComponent(Tile);
      }

      this.tile.setPopWinData(popWinData);
  }

  hide(): void{
      this.popWinData = null;
      if(this.tile != null){
            this.tile.node.active = false;
      }
  }
  showPopWin(): void{
      if(this.popWinData != null){
            this.tile.node.active = true;
      }
  }
}