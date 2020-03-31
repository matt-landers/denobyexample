# Import Maps

[Import Maps](https://github.com/WICG/import-maps) are a proposed web standard that are supported by Deno.

An import map allows you to let Deno know where to look for modules in your import statements.

```json
{
  "imports": {
    "react": "https://dev.jspm.io/react"
  }
}
```

```typescript
import React form "react";
```

```
deno --allow-net --importmap=importmap.json server.ts
```
