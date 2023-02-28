import { _decorator } from 'cc';
const {ccclass, property} = _decorator;


// //This should be a struct, but since we don't have it...

@ccclass('TokenPossibility')
export default class TokenPossibility{
    id = "";
    percentage = 0;
    value = 0;
}