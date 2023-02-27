import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('TokenData')
export default class TokenData {
    public isWinner:boolean;
    public tokenIndex: number;
}