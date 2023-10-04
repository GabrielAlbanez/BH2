import { Router } from "express";
import { ControlerOngs } from "../controllers/ongs/index"
import { ongsMiddleware } from "../middlewares/ongs/index";

 const routeOng = Router()

 routeOng.get('/allOngs/:userCPf', ongsMiddleware.validTypeUser,ControlerOngs.getAllOngs)
 routeOng.get('/Ongs/:userCPf',ongsMiddleware.validTypeUser,ControlerOngs.getByNameOng)
 routeOng.post('/createOngs',ongsMiddleware.validaDataOngs,ongsMiddleware.validateDataOnsForAdmin,ControlerOngs.createOng)
 routeOng.delete('/deleteOngs/:userCPf',ongsMiddleware.validTypeUser,ControlerOngs.deleteOng)
 routeOng.get('/avaliar-ong/:cnpj',ControlerOngs.AvaliarOng);
 routeOng.get('/avaliar-ong/:cnpj',ControlerOngs.DesaAvaliarOng);



 export default routeOng


