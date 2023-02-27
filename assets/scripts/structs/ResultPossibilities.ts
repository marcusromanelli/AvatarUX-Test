import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import Possibility from "./Possibility";

@ccclass('ResultPossibilities')
export default class ResultPossibilities {
    possibilities: Possibility[] = [];
}