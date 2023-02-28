import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('UserData')
export default class UserData{
  public id: string = "";
  public wallet: number = 999;

  constructor(){
    this.id = (Math.floor(Math.random() * 9999999)).toString();
  }
}