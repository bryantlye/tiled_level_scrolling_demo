import {SceneObject} from '../scene/SceneObject'
import {AnimatedSpriteType} from '../scene/sprite/AnimatedSpriteType'
import { Behavior } from './Behavior';
import { AnimatedSprite } from '../scene/sprite/AnimatedSprite';
import { Vector3 } from '../math/Vector3';

export class MantisBehavior extends Behavior {
    private distance : number;
    private scale : number;
    private x : number;
    private y : number;
    public constructor() {
        super();
        this.scale = 200;
        this.distance = Math.floor(Math.random() * this.scale)
        this.x = (Math.random()*2) - 1;
        this.y = (Math.random()*2) - 1;
    }
    public update(pos : Vector3) : void {
        if (this.frameCounter < this.distance) {
            let spriteX = pos.getX();
            let spriteY = pos.getY();

            pos.set(
                spriteX + this.x,
                spriteY + this.y, 
                pos.getZ(), 
                pos.getW());
        }
        else  {
            this.frameCounter = 0;
            this.distance = Math.floor(Math.random() * this.scale);
            this.x = (Math.random()*2) - 1;
            this.y = (Math.random()*2) - 1;
        }
        this.frameCounter++;
    }
}