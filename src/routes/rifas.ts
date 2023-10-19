import { Router } from "express";
import { rifasMiddleware } from "../middlewares/rifas/index";
import { ControlerRifas } from "../controllers/rifas/index";

const rifasRoute = Router()

rifasRoute.get('/getAllRifas/:NameOrCpf',rifasMiddleware.validateOngUserAndUserAdmin,ControlerRifas.getAllRifas)
rifasRoute.post('/rifa/:NameOrCpf',rifasMiddleware.validateOngUserAndUserAdmin,ControlerRifas.getByRifasOng)
rifasRoute.post('/createRifas/:NameOrCpf',rifasMiddleware.validateOngUserAndUserAdmin,rifasMiddleware.validateDataRifa,ControlerRifas.createRifas)
rifasRoute.delete('/deleteRifas/:NameOrCpf',rifasMiddleware.validateOngUserAndUserAdmin,ControlerRifas.deleteRifa)


export default rifasRoute