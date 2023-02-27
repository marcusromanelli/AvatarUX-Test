import { _decorator, Component, Label } from 'cc';
const {ccclass, property} = _decorator;

import UserData from '../structs/UserData';



@ccclass('User')
export default class User extends Component{    
    @property(Label)
    public userIdLabel: Label = null;

    @property(Label)
    public userIdWallet: Label = null;

    public get id(): string{
        return this.userData == null ? null : this.userData.id;
    }

    private userData: UserData;

    public Update(userData: UserData): void{     
        this.userData = userData;

        this.userIdLabel.string = "UserId: " + userData.id;
        this.userIdWallet.string = "Wallet: $" + userData.wallet;
    }
}