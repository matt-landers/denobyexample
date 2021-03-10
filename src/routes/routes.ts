import { Router } from "https://deno.land/x/oak/mod.ts";
import { walkSync } from "https://deno.land/std/fs/mod.ts";

const router = new Router();

const layoutTemplate = Deno.readTextFileSync("./routes/templates/layout.html"),
  exampleTemplate = Deno.readTextFileSync("./routes/templates/example.html"),
  homeTemplate = Deno.readTextFileSync("./routes/templates/home.html");

const title = "Deno by Example 🦕";
const exampleCache: { [key: string]: string } = {};

router.get("/", (ctx) => {
  let body = "";

  for (const fi of walkSync("./examples")) {
    let fle = fi.name;
    if (fle.indexOf(".md") < 1) continue;
    fle = fle.split(/[\\ \/]/g)[1].split(".")[0];
    body += `<a href="/${fle}" class="list-group-item list-group-item-action">${fle.replace(
      "-",
      " "
    )}</a>`;
  }
  const homeHtml = processTemplate(homeTemplate, { body });
  ctx.response.body = processTemplate(layoutTemplate, {
    title,
    body: homeHtml,
  });
});

router.get("/:example", async (ctx) => {
  const path: string = ctx.params.example as string;
  if (!exampleCache[path]) {
    const exampleMd = Deno.readTextFileSync(`./examples/${path}.md`);
    const result = await fetch("https://api.github.com/markdown/raw", {
      method: "POST",
      headers: {
        "Content-Type": "text/x-markdown",
      },
      body: exampleMd,
    });
    exampleCache[path] = processTemplate(exampleTemplate, {
      body: await result.text(),
    });
  }
  const exampleHtml = (ctx.response.body = processTemplate(layoutTemplate, {
    title,
    body: exampleCache[path],
  }));
});

const processTemplate = (template: string, data: { [key: string]: string }) => {
  let output = template;
  Object.keys(data).forEach((key) => {
    output = output.replace(`{{.${key}}}`, data[key]);
  });
  return output;
};

export default router;
