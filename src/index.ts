import { Application, send } from "./deps/oak.ts";
import ErrorHandler from "./middleware/errorhandler.ts";
import Logger from "./middleware/logger.ts";
import ResponseTime from "./middleware/responsetime.ts";
import Renderer from "./middleware/renderer.tsx";
import Hydrator from "./middleware/hydrator.ts";

const env = Deno.env.toObject();
const app = new Application();
app.use(ErrorHandler);
app.use(Logger);
app.use(Hydrator);
app.use(ResponseTime);
app.use(Renderer);
// app.use(router.routes());
// app.use(router.allowedMethods());

app.use(async (ctx) => {
  await send(ctx, ctx.request.url.pathname, {
    root: `${Deno.cwd()}/public`,
  });
});

const port: number = parseInt(env?.PORT ?? "3020");

app.listen({ port });
