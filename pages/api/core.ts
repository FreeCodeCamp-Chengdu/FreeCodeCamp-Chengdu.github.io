import { HTTPError } from 'koajax';
import { NextApiRequest, NextApiResponse } from 'next';
import { ProxyAgent, setGlobalDispatcher } from 'undici';

const { HTTP_PROXY } = process.env;

if (HTTP_PROXY) setGlobalDispatcher(new ProxyAgent(HTTP_PROXY));

export type NextAPI = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<any>;

export function safeAPI(handler: NextAPI): NextAPI {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      if (!(error instanceof HTTPError)) {
        console.error(error);

        res.status(400);
        return res.send({ message: (error as Error).message });
      }
      const { message, response } = error;
      let { body } = response;

      res.status(response.status);
      res.statusMessage = message;

      if (body instanceof ArrayBuffer)
        try {
          body = new TextDecoder().decode(new Uint8Array(body));
          console.error(body);

          body = JSON.parse(body);
          console.error(body);
        } catch {
          //
        }
      res.send(body);
    }
  };
}
