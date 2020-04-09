import {SceneObject} from '../scene/SceneObject'
import {AnimatedSpriteType} from '../scene/sprite/AnimatedSpriteType'
import { Behavior } from './Behavior';
import { AnimatedSprite } from '../scene/sprite/AnimatedSprite';
import { Vector3 } from '../math/Vector3';

export class PlayerBehavior extends Behavior {
    private distance : number;
    private x : number;
    private y : number;
    public mouseX : number;
    public mouseY : number;
    private inc : number;

    public constructor() {
        super();
        this.distance = 10;
        this.mouseX = 0;
        this.mouseY = 0;
        this.inc = 10;
    }
    public update(pos : Vector3, offX : number, offY : number) : void {
        let spriteX = pos.getX();
        let spriteY = pos.getY();
        let incX = 0;
        let incY = 0;
        if (spriteX < this.mouseX)
        {
            if (this.mouseX - spriteX < this.inc)
            {
                incX = this.mouseX - spriteX;
            }
            else {
                incX = this.inc;
            }
            
        }
        else if (spriteX > this.mouseX)
        {
            if (spriteX - this.mouseX < this.inc)
            {
                incX = this.mouseX - spriteX;
            }
            else {
                incX = -this.inc;
            }
        }
        if (spriteY < this.mouseY)
        {
            if (this.mouseY - spriteY < this.inc)
            {
                incY = this.mouseY - spriteY;
            }
            else {
                incY = this.inc;
            }
            
        }
        else if (spriteY > this.mouseY)
        {
            if (spriteY - this.mouseY < this.inc)
            {
                incY = this.mouseY - spriteY;
            }
            else {
                incY = -this.inc;
            }
        }
        else {
            incX = 0;
            incY = 0;
        }
        pos.set(
            spriteX + incX,
            spriteY + incY, 
            pos.getZ(), 
            pos.getW());
    }
}