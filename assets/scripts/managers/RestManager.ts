import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import Server from "./Server";
import ResultData from "../structs/ResultData";
import MachineData from "../structs/MachineData";
import UserData from '../structs/UserData';

@ccclass('RestManager')
export default class RestManager extends Component {
   //Placeholderr
    @property(Server)
    public server: Server = null;

    
    requestReelResult(userId: string, machineId: string): Promise<ResultData>{
        let returnPromise = new Promise<ResultData>(resolve => {
            resolve(this.server.GetMachineResult(userId, machineId));
        });

        return returnPromise;
    }

    requestUserData(userData: UserData): Promise<UserData>{
        let returnPromise = new Promise<UserData>(resolve => {
            var data = userData == null ? null : userData.id;
            resolve(this.server.GetUserData(data));
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