import { AreaComp, BodyComp, PosComp, SpriteComp } from "kaboom";
import k from "./game";

enum AnimationState {
  IDLE,
  WALKING,
  JUMPING,
  HIT,
}

type HeroAnimationComp = {
  state: AnimationState;
  isWalking: boolean;
  isJumping: boolean;
  isHit: boolean;
  takeHit: () => void;
};

export type HeroEntity = PosComp &
  AreaComp &
  SpriteComp &
  BodyComp &
  HeroAnimationComp;

function heroAnimator() {
  return {
    id: "heroAnimator",
    require: ["sprite"],
    state: AnimationState.IDLE,
    isWalking: false,
    isJumping: false,
    isHit: false,
    add(this: HeroEntity) {
      this.onFall(() => {
        this.isJumping = true;
      });
    },
    update(this: HeroEntity) {
      if (this.isJumping && this.isGrounded()) {
        this.isJumping = false;
      }

      if (this.isHit) {
        return;
      }

      // Update Animations as needed
      if (this.isJumping) {
        if (this.state !== AnimationState.JUMPING) {
          this.play("jump");
          this.state = AnimationState.JUMPING;
        }
      } else if (this.isWalking) {
        if (this.state !== AnimationState.WALKING) {
          this.play("walk");
          this.state = AnimationState.WALKING;
        }
      } else {
        if (this.state !== AnimationState.IDLE) {
          this.play("idle");
          this.state = AnimationState.IDLE;
        }
      }
    },
    takeHit(this: HeroEntity) {
      this.state = AnimationState.HIT;
      this.isHit = true;
      this.play("hit");

      k.wait(0.5, () => {
        this.isHit = false;
      });
    },
  };
}

export default [
  k.sprite("hero"),
  k.pos(80, 40),
  k.area(),
  k.body(),
  heroAnimator(),
  "hero",
];
