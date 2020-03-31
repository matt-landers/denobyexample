import { Middleware } from "https://deno.land/x/oak/mod.ts";
import { green, cyan, bold } from "https://deno.land/std@v0.38.0/fmt/colors.ts";

const Logger: Middleware = async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(
    `${green(ctx.request.method)} ${cyan(ctx.request.url)} - ${bold(
      String(rt)
    )}`
  );
};

export default Logger;
