import express from "express"
import { createTenant, getTenant } from "../controllers/tenantControllers";

const router = express.Router()

router.get("/:cognitoId" , getTenant);      // get the tenant if it exists
router.post("/",createTenant)               // create a tenant is it doesnot exists

export default router;