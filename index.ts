import { Application, send } from "https://deno.land/x/oak/mod.ts";
import router from "./routes/routes.ts";
import ErrorHandler from "./middleware/errorhandler.ts";
import Logger from "./middleware/logger.ts";
import ResponseTime from "./middleware/responsetime.ts";

const app = new Application();
app.use(ErrorHandler);
app.use(Logger);
app.use(ResponseTime);
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async ctx => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public`
  });
});

const port: number = parseInt(Deno.env.get("PORT") ?? "3000");

app.listen({ port });
