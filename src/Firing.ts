import { canvas, bullet, enemyProps, enemies, updateScore, score, updateGameState, GAME_STATES } from "./main";

export class Firing {
  private readonly dBY = 10; // the constant by which the bullet will be fired
  private braf: number = 0;

  // bullet positions
  private bulletY = canvas.height - 16;
  private bulletX;

  constructor(initialPosition: number) {
    this.bulletY = canvas.height - 16;
    this.bulletX = initialPosition + 4;
  }

  FireBullet = () => {
    if (this.bulletY < 0) {
      cancelAnimationFrame(this.braf);
      this.bulletY = canvas.height - 16;
    } else {
      // collisionBoundary.draw(this.bulletX, this.bulletY, 8);

      bullet.updateToCanvas(this.bulletX, this.bulletY);
      this.bulletY -= this.dBY;

      // this enables the bullet to be redrawn every frame and is decoupled from the game loop
      // as this is fired only when a users presses space key.
      this.braf = requestAnimationFrame(this.FireBullet);

      // after drawing the bullet checking for collision detection
      this.collisionDetection();
    }
  };

  getPos = (): { x: number; y: number } => {
    return { x: this.bulletX, y: this.bulletY };
  };

  removeBullet = () => {
    cancelAnimationFrame(this.braf);
  };

  collisionDetection() {
    for (let i = 0; i < enemyProps.enemyColumnCount; i++) {
      for (let j = 0; j < enemyProps.enemyRowCount; j++) {
        const e = enemies[i][j];
        if (e.collided !== true) {
          if (
            this.bulletX + 8 >= e.x &&
            this.bulletX <= e.x + 16 &&
            this.bulletY <= e.y + 8 &&
            this.bulletY >= e.y 
          ) {
            e.collided = true;
            updateScore()
            this.removeBullet();
            if(score === enemyProps.enemyRowCount * enemyProps.enemyColumnCount) {
              updateGameState(GAME_STATES.END)
            }
            return;
          }
        }
      }
    }
  }
}
