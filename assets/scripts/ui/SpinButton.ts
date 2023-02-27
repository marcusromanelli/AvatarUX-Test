import { _decorator, Component, Label, Button } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('SpinButton')
export default class SpinButton extends Component {
    @property(Label)
    private label = null;
    @property(Button)
    private button = null;
    start(): void{
        this.enable();
    }
    setLabel(text): void{
        this.label.string = text;
    }
    /*hide(): void{
        this.toggleVisilibity(false);
    }
    show(): void{
        this.toggleVisilibity(true);
    }*/
    toggleVisilibity(value): void{
        this.button.node.active = value;
    }
    enable(): void{
        this.toggleStatus(true);
    }
    disable(): void{
        this.toggleStatus(false);
    }
    toggleStatus(value): void{
        this.button.interactable = value;
    }
}