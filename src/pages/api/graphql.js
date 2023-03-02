import { createProxyMiddleware } from "http-proxy-middleware";

export default async function handler(req, res) {
  const proxyMiddleware = createProxyMiddleware({
    target: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
    changeOrigin: true,
    secure: true,
    onProxyReq: (proxyReq, req) => {
      console.log(new Date().toISOString());
      console.log(req.headers);
      console.log(req.cookies);
      console.log(req.body);

      // set as json content type
      proxyReq.setHeader("content-type", "application/json");
      proxyReq.setHeader("accept", "application/json");

      // convert body to json
      const body = JSON.stringify(req.body);

      proxyReq.write(body);
    },
    // headers: {
    //   authorization: "apikey YOUR_API_KEY",
    // },
  });

  proxyMiddleware(req, res);
}

export const config = {
  api: {
    externalResolver: true,
  },
};
