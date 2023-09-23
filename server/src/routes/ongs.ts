import { Router } from "express";
import { ControlerOngs } from "../controllers/ongs/index"
import { ongsMiddleware } from "../middlewares/ongs/index";

 const routeOng = Router()

 routeOng.get('/allOngs/:userCPf', ongsMiddleware.validTypeUser,ControlerOngs.getAllOngs)
 routeOng.get('/Ongs/:userCPf',ongsMiddleware.validTypeUser,ControlerOngs.getByNameOng)
 routeOng.post('/createOngs/:userCPf',ongsMiddleware.validTypeUser,ongsMiddleware.validaDataOngs,ControlerOngs.createOng)
 routeOng.delete('/deleteOngs/:userCPf',ongsMiddleware.validTypeUser,ControlerOngs.deleteOng)




 export default routeOng


