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

const app = express();
dotenv.config();
const porta = process.env.PORT || 5001;

app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
);


app.use(
  session({
    secret: '8080',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge: 3600000 },
     //tem que ativar isso com true no front end para enviar os cokies http
  })
);




app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome Be Human");
});

app.use(rotaUser,routeOng,rifasRoute,voluntarioRouter,trabalhosRotas,rotaSorteio)


app.listen(porta, () => {
  console.log(`server rodando na porta ${porta}`);
});
