// import { Request, Response, Router } from "express";
// import WebPush from "web-push";

// const notificationRoute = Router();

// // console.log(WebPush.generateVAPIDKeys());

// const publicKey =
//   "BKY88UrwhZfDTXrIil-RX34ZRIV8no9_W_t5C10PVW8KZkESkHU5tMWckWCfQhB6J7gtDpYMvTc9vBu6nMW771I";
// const privateKey = "23j5qTmnNfQILOr8GF7tDblHq4hysSQg26iHYHFjbdA";

// // WebPush.setVapidDetails("mailto:test@example.com", publicKey, privateKey);

// notificationRoute.get("/push/public_key", (res: Response) => {
//   return {
//     publicKey,
//   };
// });

// notificationRoute.post("/push/register", (req: Request, res: Response) => {
//   console.log(req.body);

//   return res.status(201).send();
// });

// notificationRoute.post(
//   "/send_notification",
//   async (req: Request, res: Response) => {
//     console.log(req.body);

//     return res.status(201).send();
//   }
// );

// export default notificationRoute;
