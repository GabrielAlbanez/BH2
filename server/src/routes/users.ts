import { Router } from "express";
import { ControlerUsers } from "../controllers/users/indexl";
import { userMiddlewares } from "../middlewares/users/index";


const Rotauser  = Router()


Rotauser.get('/allUsers',ControlerUsers.getAllUsers)
Rotauser.get('/user/:userCpf',ControlerUsers.getByCpfUser)
Rotauser.post('/createUser',userMiddlewares.validateDataUser,ControlerUsers.createUser)
Rotauser.delete('/deleteUser',ControlerUsers.deleteUser)




export default Rotauser