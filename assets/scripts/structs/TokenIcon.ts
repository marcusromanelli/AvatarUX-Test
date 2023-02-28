import { CCString, Sprite, SpriteFrame, _decorator } from 'cc';
const {ccclass, property} = _decorator;

@ccclass('TokenIcon')
export default class TokenIcon {
    @property({ type: CCString })
    public id: string;
    @property({ type: SpriteFrame })
    public sprite: Sprite;
    @property({ type: SpriteFrame })
    public glow: Sprite;
}