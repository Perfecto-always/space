/** By default any game object is of type `enemy`
 * available types are:
 * - enemy
 * - character
 * - projectile
 *
 */
export class GameObject {
  private img = new Image();
  private type: "enemy" | "character" | "projectile";
  private posX: number = 0;
  private posY: number = 0;
  private ctx: CanvasRenderingContext2D;

  constructor(
    imgSrc: string,
    context: CanvasRenderingContext2D,
    type: "enemy" | "character" | "projectile" = "enemy"
  ) {
    this.img.src = imgSrc;
    this.type = type;
    this.img.width = type == "projectile" ? 8 : 16;
    this.img.height = type == "projectile" ? 8 : 16;
    this.ctx = context;
  }

  public init = (x: number = 0.5, y: number = 0.5) => {
    this.img.addEventListener("load", () => {
      this.posX = x;
      this.posY = y;
      this.ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
    });
  };

  public updateToCanvas = (x: number = 0.5, y: number = 0.5) => {
    this.ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
  };

  public pos = (dx: number, dy: number) => {
    this.posX = this.posX + dx;
    this.posY = this.posY + dy;
    this.updateToCanvas(this.posX, this.posY);
  };
}
