import { KaboomCtx } from "kaboom";

export default (k: KaboomCtx) => {
  // Sprites and Animations
  k.loadSprite("hero", "sprites/hero.png", {
    sliceX: 5,
    anims: {
      idle: { from: 0, to: 0 },
      walk: { from: 1, to: 2, loop: true },
      jump: { from: 3, to: 3 },
      hit: { from: 4, to: 4 },
    },
  });

  k.loadSprite("enemy", "sprites/enemy.png", {
    sliceX: 4,
    anims: {
      idle: { from: 0, to: 0 },
      move: { from: 0, to: 2, loop: true, pingpong: true },
      hit: { from: 3, to: 3 },
    },
  });

  k.loadSpriteAtlas("sprites/ground-tiles.png", {
    grass: {
      x: 0,
      y: 0,
      width: 128,
      height: 128,
    },
    platformLeft: {
      x: 128,
      y: 0,
      width: 128,
      height: 128,
    },
    platformCenter: {
      x: 256,
      y: 0,
      width: 128,
      height: 128,
    },
    platformRight: {
      x: 384,
      y: 0,
      width: 128,
      height: 128,
    },
    wall: {
      x: 512,
      y: 0,
      width: 128,
      height: 128,
    },
  });
};
