import { AreaComp, GameObj, PosComp, SpriteComp } from "kaboom";
import k from "./game";

type PatrolComp = PosComp & AreaComp & GameObj;
function patrol(dir = 1, speed = 100) {
  return {
    id: "patrol",
    require: ["pos", "area"],
    add(this: PatrolComp) {
      this.flipX(dir > 0);
      this.onCollide("wall", () => {
        dir = dir * -1;
        this.flipX(dir > 0);
      });
    },
    update(this: PatrolComp) {
      this.move(speed * dir, 0);
    },
  };
}

export type SquashableComp = PatrolComp & SpriteComp;
function squashable() {
  return {
    id: "squashable",
    require: ["pos", "sprite", "patrol"],
    isAlive: true,
    squash(this: SquashableComp) {
      this.isAlive = false;
      this.unuse("patrol");
      this.play("hit");
      k.addKaboom(this.pos);
      this.use(k.lifespan(0.5, { fade: 0.1 }));
    },
  };
}

export default [
  k.sprite("enemy", {
    anim: "move",
  }),
  k.pos(1000, 40),
  k.area(),
  k.body(),
  patrol(),
  squashable(),
  "enemy",
];
