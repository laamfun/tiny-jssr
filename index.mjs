import { createServer } from "http";
import render from "./render.mjs";

createServer((Q, S) => S.end(render())).listen(8080, () =>
  console.log("Start on http://localhost:8080")
);
