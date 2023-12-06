import { FreshContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: FreshContext): Response => {
    const {day, phase} = _ctx.params;
    return new Response(JSON.stringify({day, phase}));
  };