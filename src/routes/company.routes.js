import { Router } from "express";
import {createMisionVision,  getCompany} from "../controllers/company.controller.js"
import { CompanySchema } from "../schemas/company.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/mission",validateSchema(CompanySchema) , createMisionVision)
router.get("/company", getCompany)


export default router