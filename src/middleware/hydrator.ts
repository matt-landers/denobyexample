import { Middleware } from "https://deno.land/x/oak/mod.ts";
import { walk } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

let water: any;

const Hydrator: Middleware = async ({ request, response, state }, next) => {
  if (water) {
    state.water = water;
  } else {
    state.water = initialize();
  }
  return next();
};

const initialize = async () => {};

const getRoutes = async (dir: string, baseuri: string) => {
  for await (const fileInfo of walk(dir)) {
    if (fileInfo.isDirectory) {
      getRoutes(join(dir, fileInfo.name), baseuri);
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
};

export default Hydrator;
