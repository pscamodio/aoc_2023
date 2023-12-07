import { FreshContext } from "$fresh/server.ts";
import {run} from "../../../../challenges/index.ts"

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
    const {day, phase} = _ctx.params;
    const body = await _req.json();
    const result = run(day, phase, body);
    return new Response(JSON.stringify(result));
  };

