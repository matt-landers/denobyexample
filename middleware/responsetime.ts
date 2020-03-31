import { Middleware } from "https://deno.land/x/oak/mod.ts";

const ResponseTime: Middleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
};

export default ResponseTime;
