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

  next();
};

const initialize = async () => {};

const getRoutes = async (dir: string, baseuri: string) => {
  for await (const fi of walk(dir)) {
    if (fi.info.isDirectory()) {
      getRoutes(join(dir, fi.filename), baseuri);
      continue;
    }
    const slug = fi.filename.split(".").slice(0, -1).join(".");
    switch (fi.filename.toLowerCase()) {
      case "index.tsx":
        water.routes[baseuri] = {
          module: join(dir, fi.filename),
          parts: [...baseuri.split("/"), slug],
        };
        break;
      default:
        water.routes[join(baseuri, slug)] = {
          module: join(dir, fi.filename),
          parts: [...baseuri.split("/"), slug],
        };
        break;
    }
  }
};

export default Hydrator;
