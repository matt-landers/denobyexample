// deno-lint-ignore-file no-explicit-any
import { Middleware } from "../deps/oak.ts";
import { walk } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

type Water = {
  routes: { [key: string] :{
    module: string;
    parts: Array<string>;
  }}
}

let _water: Water;

const Hydrator: Middleware = async ({ state }, next) => {
  
  state.water = _water ?? await getRoutes(`./examples`, "/");
  console.log(state.water);
  return next();
};

const getRoutes = async (dir: string, baseuri: string) => {
  const water: Water = { routes: {}};
  for await (const fileInfo of walk(dir)) {
    console.log(fileInfo);
    if (fileInfo.isDirectory) {
      continue;
    }
    const slug = fileInfo.name.split(".").slice(0, -1).join(".");
    switch (fileInfo.name.toLowerCase()) {
      case "index.tsx":
        water.routes[baseuri] = {
          module: join(dir, fileInfo.name),
          parts: [...baseuri.split("/"), slug],
        };
        break;
      default:
        water.routes[join(baseuri, slug)] = {
          module: join(dir, fileInfo.name),
          parts: [...baseuri.split("/"), slug],
        };
        break;
    }
  }
  return water;
};

export default Hydrator;
