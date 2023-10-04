import { Router } from "express";
import { ControlerUsers } from "../controllers/users/indexl";
import { userMiddlewares } from "../middlewares/users/index";
import { authLogin } from "../middlewares/auth/auth";
import { verifyToken } from "../middlewares/auth/verifyToken";



const Rotauser  = Router()


Rotauser.get('/allUsers/:cpfValidate',userMiddlewares.validTypeUser,ControlerUsers.getAllUsers)
Rotauser.get('/user/:userCpf',ControlerUsers.getByCpfUser)
Rotauser.post('/createUser',userMiddlewares.validateDataUser,ControlerUsers.createUser)
Rotauser.delete('/deleteUser/:cpfValidate',userMiddlewares.validTypeUser,ControlerUsers.deleteUser)
Rotauser.post('/byRifas',verifyToken,userMiddlewares.validateByRifas,ControlerUsers.byRifas)
Rotauser.post('/Login',authLogin,ControlerUsers.Login)

Rotauser.get('/BeHuman/avaliar/:cnpj', async (req, res) => {
  const { cnpj } = req.params;

  // Faça as operações necessárias para avaliar a ONG com base no CNPJ
  // ...
  res.send('true');
});

// Controlador para não avaliar a ONG
Rotauser.get('/BeHuman/naoAvaliar/:cnpj', async (req, res) => {
  const { cnpj } = req.params;

  // Faça as operações necessárias para não avaliar a ONG com base no CNPJ
  // ...
  res.send('false');
});




export default Rotauser

