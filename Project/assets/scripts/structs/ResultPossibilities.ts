import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import TokenPossibility from "./Possibility";

@ccclass('ResultPossibilities')
export default class ResultPossibilities {
    possibilities: TokenPossibility[] = [];
}