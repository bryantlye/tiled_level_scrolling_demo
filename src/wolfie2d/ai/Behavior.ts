export abstract class Behavior {

    public frameCounter : number;
    public worldWidth : number;
    public worldHeight : number;

    public constructor() {
        this.frameCounter = 0;
    }
}