import { Router } from 'express';
import {
  getEnterprise,
  createEmpresa,
  updateEnterprise,
  deleteEnterprise,
  findEmpresaByUserID
} from '../controllers/Enterprise.controllers';
const router = Router();

// Que facil era express 😄
router
  .route('/')
  .get(getEnterprise)
  .post(createEmpresa);

router
  .route('/:id')
  .get(findEmpresaByUserID)
  .put(updateEnterprise)
  .delete(deleteEnterprise);

export default router;
