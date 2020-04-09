export class Viewport {
    private width : number;
    private height : number;
    private x : number;
    private y : number;

    public constructor(initWidth : number, initHeight : number) {
        this.width = initWidth;
        this.height = initHeight;
        this.x = 0;
        this.y = 0;
    }

    public getWidth() : number {
        return this.width;
    }

    public getHeight() : number {
        return this.height;
    }

    public getX() : number {
        return this.x;
    }

    public getY() : number {
        return this.y;
    }

    public inc(incX : number, incY : number) : void {
        console.log("old x: " + this.x)
        console.log("old y: " + this.y)
        this.x += incX;
        this.y += incY;
        console.log("new x: " + this.x)
        console.log("new y: " + this.y)
    }

    public setPosition(initX : number, initY : number) : void {
        this.x = initX;
        this.y = initY;
    }

    public contains(pointX : number, pointY : number) : boolean {

        let vpLeft = this.x;
        let vpRight = this.x + this.width;
        let vpTop = this.y;
        let vpBottom = this.y + this.height;
        if (    (pointX < vpLeft)
            ||  (vpRight < pointX)
            ||  (pointY < vpTop)
            ||  (vpBottom < pointY)) {
                return false;
        }
        else {
            return true;
        }
    }
}