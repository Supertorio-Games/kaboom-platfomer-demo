import k from "./game";
import { AreaCompOpt } from "kaboom";

export const levelMap = [
  "W         W",
  "W         W",
  "W         W",
  "W         W",
  "W   [P]   W",
  "W         W",
  "===========",
];

const platformAreaConfig: AreaCompOpt = {
  width: 128,
  height: 32,
  offset: k.vec2(0, -96),
};

export const levelConfig = {
  width: 128,
  height: 128,
  pos: k.vec2(0, 0),
  "=": () => [
    k.sprite("grass"),
    k.area(),
    k.solid(),
    k.origin("bot"),
    "grass",
    "ground",
  ],
  "[": () => [
    k.sprite("platformLeft"),
    k.area(platformAreaConfig),
    k.solid(),
    k.origin("bot"),
    "platform",
    "ground",
  ],
  P: () => [
    k.sprite("platformCenter"),
    k.area(platformAreaConfig),
    k.solid(),
    k.origin("bot"),
    "platform",
    "ground",
  ],
  "]": () => [
    k.sprite("platformRight"),
    k.area(platformAreaConfig),
    k.solid(),
    k.origin("bot"),
    "platform",
    "ground",
  ],
  W: () => [k.sprite("wall"), k.area(), k.solid(), k.origin("bot"), "wall"],
};
