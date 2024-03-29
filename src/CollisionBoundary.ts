/**
 * Helpful in visual debugging of collisions. 
 * Draws a red rectangle around an object.
 */
export class CollisionBoundary {
    private ctx: CanvasRenderingContext2D
   constructor(context: CanvasRenderingContext2D) {
    this.ctx = context
   }
  
   draw(postionX: number, positionY: number, width: number = 16) {
    this.ctx.lineWidth = 1
    this.ctx.beginPath();
    this.ctx.rect(postionX, positionY, width, width);
    this.ctx.strokeStyle = "#ff0000";
    this.ctx.stroke();
    this.ctx.closePath();
   }
  }
  
  
  