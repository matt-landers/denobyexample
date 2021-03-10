import { HttpError, Status, Middleware } from "https://deno.land/x/oak/mod.ts";
import { bold, red } from "https://deno.land/x/std/fmt/colors.ts";

const ErrorHandler: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    if (e instanceof HttpError) {
      ctx.response.status = e.status as any;
      if (e.expose) {
        ctx.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${e.message}</h1>
              </body>
            </html>`;
      } else {
        ctx.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>${e.status} - ${Status[e.status]}</h1>
              </body>
            </html>`;
      }
    } else if (e instanceof Error) {
      ctx.response.status = 500;
      ctx.response.body = `<!DOCTYPE html>
            <html>
              <body>
                <h1>500 - Internal Server Error</h1>
              </body>
            </html>`;
      console.log("Unhandled Error:", red(bold(e.message)));
      console.log(e.stack);
    }
  }
};

export default ErrorHandler;
