// deno-lint-ignore-file no-explicit-any
import { React } from "../deps/react.ts";
import { ReactDOMServer } from "../deps/react-dom.ts";
import { Middleware } from "../deps/oak.ts";

const Renderer: Middleware = async (ctx, next) => {
  const path = ctx.request.url.pathname;
  let module;
  if (path === "" || path === "/") {
    module = await import("../pages/index.tsx");
  } else {
    module = await import(`../pages${path}.tsx`);
  }

  ctx.response.body =
    module && render({ Page: module.default, state: ctx.state.water });

  if (!ctx.response.body) {
    next();
  }
};

const render = ({ Page, title, state }: any) =>
  ReactDOMServer.renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .container {
            maxWidth: 980px;
          }`,
          }}
        />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>{title ?? "Deno by Example 🦕"}</title>
        <script>const serverState=JSON.parse({JSON.stringify(state)})</script>
      </head>
      <body>
        <Page />
      </body>
    </html>
  );

export default Renderer;
