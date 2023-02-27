import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import Server from "./Server";
import ResultData from "../structs/ResultData";
import MachineData from "../structs/MachineData";

@ccclass('RestManager')
export default class RestManager extends Component {
   //Placeholderr
    @property(Server)
    public server: Server = null;

    
    requestReelResult(machineId: string): Promise<ResultData>{
        let returnPromise = new Promise<ResultData>(resolve => {
            resolve(this.server.GetMachineResult(machineId));
        });

        return returnPromise;
    }

    requestMachineData(machineId: string): Promise<MachineData>{
        let returnPromise = new Promise<MachineData>(resolve => {
            resolve(this.server.GetMachineData(machineId));
        });

        return returnPromise;
    }
}