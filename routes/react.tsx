import { Router } from "https://deno.land/x/oak/mod.ts";
//import Home from "../pages/home.tsx";

const router = new Router();

router.all(async ({ state, request }, next) => {
  const path = request.path;
  console.log(request);
  if (path === "" || path === "/") {
    const module = await import("../pages/index.tsx");
    state.Page = module.default;
  }
  next();
});

export default router;
