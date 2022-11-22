import k from "./game";
import loadAssets from "./loadAssets";
import { levelMap, levelConfig } from "./level";
import hero, { HeroEntity } from "./hero";
import enemy from "./enemy";
import { GameObj } from "kaboom";

const player_jump_force = 1000;
const player_speed = 200;

// Load Assets
loadAssets(k);

// Scene
k.scene("Demo Scene", () => {
  // Set up the level and add sprites
  k.addLevel(levelMap, levelConfig);

  // Add the player
  const player: GameObj<HeroEntity> = k.add(hero);

  // Add an enemy;
  k.add(enemy);

  // Handle player collisions with enemies
  player.onCollide("enemy", (thisEnemy, collision) => {
    if (thisEnemy.isAlive === false) return;
    if (collision?.isBottom()) {
      thisEnemy.squash();
    } else {
      // Damage Hero
      player.takeHit();
    }
  });

  // Handle Player inputs
  k.onKeyDown("left", () => {
    player.flipX(true);
    player.move(player_speed * -1, 0);
    player.isWalking = true;
  });
  k.onKeyRelease("left", () => (player.isWalking = false));

  k.onKeyDown("right", () => {
    player.flipX(false);
    player.move(player_speed, 0);
    player.isWalking = true;
  });
  k.onKeyRelease("right", () => (player.isWalking = false));

  k.onKeyPress("space", () => {
    if (player.isGrounded()) {
      player.jump(player_jump_force);
      player.isJumping = true;
    }
  });
});

// Load the scene
k.go("Demo Scene");
