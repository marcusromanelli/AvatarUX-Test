import { _decorator, Component } from 'cc';
const {ccclass, property} = _decorator;

import Server from "./Server";
import ResultData from "../structs/ResultData";

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
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import Server from "./Server";
// import ResultData from "../structs/ResultData";
// 
// const {ccclass, property} = cc._decorator;
// 
// @ccclass
// export default class RestManager extends cc.Component {
// 
//     //Placeholderr
//     @property(Server)
//     public server: Server = null;
// 
//     requestReelResult(machineId: string): Promise<ResultData>{
//         let returnPromise = new Promise<ResultData>(resolve => {
//             resolve(this.server.GetMachineResult(machineId));
//         });
// 
//         return returnPromise;
//     }
// }
