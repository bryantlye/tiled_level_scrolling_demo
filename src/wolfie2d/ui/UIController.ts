/*
 * This provides responses to UI input.
 */
import {AnimatedSprite} from "../scene/sprite/AnimatedSprite"
import {SceneGraph} from "../scene/SceneGraph"
import { Viewport } from "../scene/Viewport";
import { TiledLayer } from "../scene/tiles/TiledLayer";
import { PlayerBehavior } from "../ai/PlayerBehavior";

export class UIController {
    private spriteToDrag : AnimatedSprite;
    private scene : SceneGraph;
    private dragOffsetX : number;
    private dragOffsetY : number;

    public constructor(canvasId : string, initScene : SceneGraph) {
        this.spriteToDrag = null;
        this.scene = initScene;
        this.dragOffsetX = -1;
        this.dragOffsetY = -1;

        let canvas : HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(canvasId);
        canvas.addEventListener("mousedown", this.mouseDownHandler);
        canvas.addEventListener("mousemove", this.mouseMoveHandler);
        canvas.addEventListener("mouseup", this.mouseUpHandler);
        canvas.addEventListener("keydown", this.keyDownHandler);
    }

    public mouseDownHandler = (event : MouseEvent) : void => {
        let vp : Viewport = this.scene.getViewport();
        let mousePressX : number = event.clientX;
        let mousePressY : number = event.clientY;
        let sprite : AnimatedSprite = this.scene.getSpriteAt(mousePressX + vp.getX(), mousePressY+ vp.getY());
        console.log("mousePressX: " + mousePressX);
        console.log("mousePressY: " + mousePressY);
        console.log("sprite: " + sprite);
        if (sprite != null) {
            // START DRAGGING IT
            this.spriteToDrag = sprite;
            this.dragOffsetX = sprite.getPosition().getX() - mousePressX;
            this.dragOffsetY = sprite.getPosition().getY() - mousePressY;
        }
    }
    
    public mouseMoveHandler = (event : MouseEvent) : void => {
        if (this.spriteToDrag != null) {
            this.spriteToDrag.getPosition().set(event.clientX + this.dragOffsetX, 
                                                event.clientY + this.dragOffsetY, 
                                                this.spriteToDrag.getPosition().getZ(), 
                                                this.spriteToDrag.getPosition().getW());
        }
        let player : AnimatedSprite = this.scene.getPlayerSprite();
        let c_behavior : PlayerBehavior = <PlayerBehavior>player.getBehavior();
        c_behavior.mouseX = event.clientX;
        c_behavior.mouseY = event.clientY;
    }

    public mouseUpHandler = (event : MouseEvent) : void => {
        this.spriteToDrag = null;
    }
    
    public keyDownHandler = (event : KeyboardEvent) : void => {
        let kc : number = event.keyCode;
        console.log(event.keyCode);
        let vp : Viewport = this.scene.getViewport();
        let world : TiledLayer[] = this.scene.getTiledLayers();
        let worldWidth : number = world[0].getColumns() * world[0].getTileSet().getTileWidth();
        let worldHeight : number = world[0].getRows() * world[0].getTileSet().getTileHeight(); 
        let inc_amt : number = 10;
        //right (D key)
        if (kc == 68)
        {
            if (vp.getX()+vp.getWidth()+inc_amt <= worldWidth) {
                vp.inc(inc_amt, 0);
            }
        }

        //left (A key)
        if (kc == 65) 
        {
            if (vp.getX() - inc_amt >= 0) {
                vp.inc((-inc_amt), 0);
            }
        }

        //up (W key)
        if (kc == 87)
        {
            if (vp.getY() - inc_amt >= 0) {
                vp.inc(0, (-inc_amt));
            }
        }

        if (kc == 83)
        {
            if (vp.getY()+vp.getHeight()+inc_amt <= worldWidth) {
                vp.inc(0, inc_amt);
            }
        }
    }
}