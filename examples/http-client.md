# HTTP Client (fetch)

A core premise of Deno is that all web constructs should be valid Deno code, so you can use [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) on the server without any imports 🤯

Code it:

```typescript
const res = await fetch("https://deno.land");
await Deno.copy(Deno.stdout, res.body);
```

Deno it:

```
deno --allow-net client.ts
```
