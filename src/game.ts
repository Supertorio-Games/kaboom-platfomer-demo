import kaboom from "kaboom";

// Setup Game Context
export default kaboom({
  width: 1280,
  height: 768,
  scale: 0.5,
  background: [53, 152, 219, 1],
  root: document.getElementById("#kaboom") || undefined,
  global: false,
});
