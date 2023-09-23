import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import rotaUser from "./routes/users";
import routeOng from "./routes/ongs";

const app = express();
dotenv.config();
const porta = process.env.PORT || 5001;

app.use(express.json())

app.use(
  cors({
    origin: "*",
  })
);



app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome Be Human");
});

app.use(rotaUser,routeOng)


app.listen(porta, () => {
  console.log(`server rodando na porta ${porta}`);
});
