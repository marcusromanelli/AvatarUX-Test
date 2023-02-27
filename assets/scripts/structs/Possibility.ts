import { _decorator } from 'cc';
const {ccclass, property} = _decorator;

import EnumResult from '../enumerators/ResultType';
// //This should be a struct, but since we don't have it...

@ccclass('Possibility')
export default class Possibility{
    type = EnumResult.Type.NoResult;
    percentage = 0;
}