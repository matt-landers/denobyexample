import React from "react";
// @deno-types="https://deno.land/x/types/react-dom/v16.13.1/server.d.ts"
import ReactDomServer from "react-dom/server";
import { Middleware } from "https://deno.land/x/oak/mod.ts";

const Renderer: Middleware = async (ctx, next) => {
  const path = ctx.request.url.pathname;
  let module: any;
  if (path === "" || path === "/") {
    //@ts-ignore
    module = await import("../pages/index.tsx");
  } else {
    module = await import(`../pages/${path}.tsx`);
  }

  ctx.response.body =
    module && render({ Page: module.default, state: ctx.state.water });

  if (!ctx.response.body) {
    next();
  }
};

const render = ({ Page, title, state }: any) =>
  ReactDomServer.renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
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
        <script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );

export default Renderer;
