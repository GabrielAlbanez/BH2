import { Router } from "express";
import { ControlerUsers } from "../controllers/users/indexl";


const Rotauser  = Router()


Rotauser.get('/allUsers',ControlerUsers.getAllUsers)
Rotauser.get('/user/:userCpf',ControlerUsers.getByCpfUser)
Rotauser.post('/createUser',ControlerUsers.createUser)
Rotauser.delete('/deleteUser',ControlerUsers.deleteUser)




export default Rotauser