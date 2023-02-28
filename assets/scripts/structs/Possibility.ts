import { _decorator } from 'cc';
const {ccclass, property} = _decorator;


// //This should be a struct, but since we don't have it...

@ccclass('Possibility')
export default class Possibility{
    token = "";
    percentage = 0;
    value = 0;
}