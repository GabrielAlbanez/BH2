import { Router } from "express";
import { rifasMiddleware } from "../middlewares/rifas/index";
import { ControlerRifas } from "../controllers/rifas/index";
import upload from "../Config/multerRifa";

const rifasRoute = Router()

rifasRoute.get('/getAllRifas',ControlerRifas.getAllRifas)
rifasRoute.post('/rifa',rifasMiddleware.validateOngUserAndUserAdmin,ControlerRifas.getByRifasOng)
rifasRoute.post('/createRifas',upload.single('imgRifa'),rifasMiddleware.validateDataRifa,ControlerRifas.createRifas)
rifasRoute.delete('/deleteRifas/:NameOrCpf',rifasMiddleware.validateOngUserAndUserAdmin,ControlerRifas.deleteRifa)
rifasRoute.get('/getByidRifa/:id',rifasMiddleware.validateIdRifa,ControlerRifas.getRifaByid)

export default rifasRoute