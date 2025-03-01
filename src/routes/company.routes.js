import { Router } from "express";
import {createMisionVision} from "../controllers/company.controller.js"
import { createMissionVisionSchema } from "../schemas/company.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/mission",validateSchema(createMissionVisionSchema) , createMisionVision)


export default router