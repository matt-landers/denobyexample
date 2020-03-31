# Deno: Simple Web Server

Code it:

```typescript
import { serve } from "https://deno.land/std@v0.36.0/http/server.ts";

const env = Deno.env();
const port = env.PORT ?? 3000;
const s = serve({ port });

console.log(`Listening on: http://localhost:${port}`);

for await (const req of s) {
  req.respond({ body: "<h1>Hello World</h1>" });
}
```

Deno it:

```
deno --allow-net --allow-env server.ts
```
