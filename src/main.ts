import "./style.css";
import { GameObject } from "./GameObject";
import { Firing } from "./Firing";
import { CollisionBoundary } from "./CollisionBoundary";

/** GLOBAL STATES */
export enum GAME_STATES {
  IDLE = "idle",
  PLAY = "play",
  END = "end",
  PAUSE = "pause",
}

export let CURRENT_GAME_STATE = GAME_STATES.IDLE;
const dx = 10; // Player speed
export let score = 0;

export function updateGameState(to: GAME_STATES) {
  CURRENT_GAME_STATE = to;
}

export function updateScore() {
  score++;
}

/** GAME UI */
const uiCanvas = document.querySelector<HTMLCanvasElement>("#ui")!;
const uiContext = uiCanvas.getContext("2d")!;

uiContext.font = "48px monospace";
uiContext.fillStyle = "white";
uiContext.fillText(
  "SPACE INVADERS",
  uiCanvas.width / 2 - uiContext.measureText("SPACE INVADERS").width / 2,
  uiCanvas.height / 2 - 40
);
uiContext.font = "16px monospace";
uiContext.fillStyle = "white";
uiContext.fillText(
  "Press space to start",
  uiCanvas.width / 2 - uiContext.measureText("Press space to start").width / 2,
  uiCanvas.height / 2 + 40
);

let pos = 0;

function DrawUI() {
  
  if (CURRENT_GAME_STATE === GAME_STATES.IDLE) {
    uiContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    uiContext.font = "48px monospace";
    uiContext.fillStyle = "white";
    uiContext.fillText(
      "SPACE INVADERS",
      uiCanvas.width / 2 - uiContext.measureText("SPACE INVADERS").width / 2,
      uiCanvas.height / 2 - 40
    );
    uiContext.font = "16px monospace";
    uiContext.fillStyle = "white";

    if (pos == 0) {
      uiContext.fillText(
        "Press space to start",
        uiCanvas.width / 2 -
          uiContext.measureText("Press space to start").width / 2,
        uiCanvas.height / 2 + 40
      );
      pos = 1;
    } else if (pos == 1) {
      uiContext.fillText(
        "Press space to start",
        uiCanvas.width / 2 -
          uiContext.measureText("Press space to start").width / 2,
        uiCanvas.height / 2 + 35
      );
      pos = 0;
    }
  } else if (CURRENT_GAME_STATE === GAME_STATES.PLAY) {
    clearInterval(uiInterval);
    uiContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);
    uiCanvas.style.display = "none";

    Draw();
  }
}

const uiInterval = setInterval(DrawUI, 750);

// End of UI LOGIC ================================

/** GAME LOGIC */
export const canvas = document.querySelector<HTMLCanvasElement>("#game")!;
export const context = canvas.getContext("2d")!;

// CREATING GAME OBJECTS
export const character = new GameObject(
  "./assets/character.png",
  context,
  "character"
);
export const bullet = new GameObject(
  "./assets/bullet.png",
  context,
  "projectile"
);
const enemy = new GameObject("./assets/enemy.png", context, "enemy");

export const collisionBoundary = new CollisionBoundary(context);

//==============================================

/** GAME LOOP */
// Necessary for implementing enemeies
// enemies properties so that values can be changed
// only in one place
export const enemyProps = {
  enemyRowCount: 5,
  enemyColumnCount: 10,
  width: 16,
  height: 16,
  enemyOffsetX: 30,
  enemyOffsetY: 30,
};

export interface Enemies {
  x: number;
  y: number;
  collided?: boolean;
}

/**
 * The result will look something like this:
 * [
 * [{x: 0, y: 0, collided: false}, {x: 0, y: 0, collided: false}}],
 * [{x: 0, y: 0...
 * ]
 * ]
 */
export let enemies: Enemies[][] = [];

// Populating the arrya beforehand idk why saw it in the mdn docs.
// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Build_the_brick_field
function enemeiesInit() {
  for (let i = 0; i < enemyProps.enemyColumnCount; i++) {
    enemies[i] = [];
    for (let j = 0; j < enemyProps.enemyRowCount; j++) {
      enemies[i][j] = { x: 0, y: 0, collided: false };
    }
  }
}

enemeiesInit()

// Initial actor(aka character) position
let x = canvas.width / 2 - 8;
let y = canvas.height - 20;

// drawing it to the canavs
character.init(x, y);

// called on every render reponsible for displaying enemies
function drawEnemy() {
  for (let i = 0; i < enemyProps.enemyColumnCount; i++) {
    for (let j = 0; j < enemyProps.enemyRowCount; j++) {
      if (enemies[i][j].collided !== true) {
        // Enemies positions
        const enemyX =
          canvas.width / 2 -
          16 * enemyProps.enemyColumnCount +
          enemyProps.enemyOffsetX * i;
        const enemyY = 100 + enemyProps.enemyOffsetY * j;

        // collisionBoundary.draw(enemyX, enemyY)

        enemies[i][j] = { x: enemyX, y: enemyY };
        enemy.updateToCanvas(enemyX, enemyY);
      }
    }
  }
}

function drawScore() {
  context.font = "16px monospace";
  context.fillStyle = "white";
  context.fillText(`Score: ${score}`, 40, 40);
}

/** CALLED ON EVERY RENDER */
function Draw() {
  if (CURRENT_GAME_STATE === GAME_STATES.END) {
    drawEndScreen();
  }
  context.clearRect(0, 0, canvas.width, canvas.height);
  character.updateToCanvas(x, y);
  drawEnemy();
  drawScore();
  requestAnimationFrame(Draw);
}

Draw();
//==============================================

/** END SCREEN UI */
const endUICanvas = document.querySelector<HTMLCanvasElement>("#end")!;
endUICanvas.style.display = "block";
const endUICanvasContext = endUICanvas.getContext("2d")!;

function drawEndScreen() {
  endUICanvasContext.font = "48px monospace";
  endUICanvasContext.fillStyle = "white";
  endUICanvasContext.fillText(
    "GAME OVER",
    endUICanvas.width / 2 -
      endUICanvasContext.measureText("GAME OVER").width / 2,
    endUICanvas.height / 2 - 40
  );
  endUICanvasContext.font = "16px monospace";
  endUICanvasContext.fillStyle = "white";
    endUICanvasContext.fillText(
      "Press enter to restart",
      endUICanvas.width / 2 -
        endUICanvasContext.measureText("Press space to restart").width / 2,
      endUICanvas.height / 2 + 40
    );
}

//==============================================

/** LISTEN FOR KEYPRESSES */
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowRight") {
    if (x > canvas.width - 32) {
      x = canvas.width - 16;
    } else {
      x += dx;
    }
  }
  if (e.code === "ArrowLeft") {
    if (x < 8) {
      x = 0;
    } else {
      x -= dx;
    }
  }
  if (e.code === "Space") {
    if (CURRENT_GAME_STATE === GAME_STATES.IDLE) {
      updateGameState(GAME_STATES.PLAY);
    } else if (CURRENT_GAME_STATE === GAME_STATES.PLAY) {
      new Firing(x).FireBullet();
    }
  }
  if (e.code === "Enter") {
    if (CURRENT_GAME_STATE === GAME_STATES.END) {
      window.location.reload()
    }
  }
});
