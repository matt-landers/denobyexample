import { serve } from "https://deno.land/std/http/server.ts";

const env = Deno.env();

const port: number = parseInt(env?.PORT ?? "3000");

const s = serve({ port });
console.log(`http://localhost:/${port}`);

for await (const req of s) {
  req.respond({ body: "OK", status:200 });
}
