import { Router } from "express";
import { ControlerUsers } from "../controllers/users/indexl";
import { userMiddlewares } from "../middlewares/users/index";



const Rotauser  = Router()


Rotauser.get('/allUsers/:cpfValidate',userMiddlewares.validTypeUser,ControlerUsers.getAllUsers)
Rotauser.get('/user/:userCpf',ControlerUsers.getByCpfUser)
Rotauser.post('/createUser',userMiddlewares.validateDataUser,ControlerUsers.createUser)
Rotauser.delete('/deleteUser/:cpfValidate',userMiddlewares.validTypeUser,ControlerUsers.deleteUser)
Rotauser.post('/byRifas',userMiddlewares.validateByRifas,ControlerUsers.byRifas)




export default Rotauser