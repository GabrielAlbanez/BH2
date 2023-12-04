import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaUser from "./routes/users";
import routeOng from "./routes/ongs";
import rifasRoute from "./routes/rifas";
import voluntarioRouter from "./routes/voluntarios";
import trabalhosRotas from "./routes/trabalhos";
import rotaSorteio from "./routes/sorteio";
import session from "express-session";
import http from "http";
import { configureSocketIO } from "./SocketIo/socket";
// import notificationRoute from "./routes/notificationRoutes";
const app = express();
const server = http.createServer(app);
export const ioo = configureSocketIO(server);
import WebPush from "web-push";
import z from "zod";
import * as path from "path";

dotenv.config();
const porta = process.env.PORT || 5001;
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

app.use(
  session({
    secret: "8080",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 },
    //tem que ativar isso com true no front end para enviar os cokies http
  })
);



app.use("/uploadsDoacaoImgs", express.static("uploadsDoacaoImgs"));


app.use("/uploadImgOng", express.static("uploads"));

app.use("/uploadsImgRifas", express.static("uploadsImgRifas"));






const publicKey =
  "BKY88UrwhZfDTXrIil-RX34ZRIV8no9_W_t5C10PVW8KZkESkHU5tMWckWCfQhB6J7gtDpYMvTc9vBu6nMW771I";
const privateKey = "23j5qTmnNfQILOr8GF7tDblHq4hysSQg26iHYHFjbdA";

WebPush.setVapidDetails("mailto:test@example.com", publicKey, privateKey);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send(publicKey);
});

app.post("/push_register", (req: Request, res: Response) => {
  console.log(req.body);

  return res.status(201).send("oi");
});

app.post("/send_notification", async (req: Request, res: Response) => {

  const { subscription,text }  = req.body;


  WebPush.sendNotification( subscription, text)

});




app.use(
  rotaUser,
  routeOng,
  rifasRoute,
  voluntarioRouter,
  trabalhosRotas,
  rotaSorteio
);

server.listen(porta, () => {
  console.log(`server rodando na porta ${porta}`);
});
