import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validator";

const router = Router()

router.post('/',
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligaorio'),
    body('clientName').notEmpty().withMessage('El nombre del clirnte es obligaorio'),
    body('description').notEmpty().withMessage('La descripcion es obligaorio'),
handleInputErrors,
ProjectController.createProject)

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
ProjectController.getProjectById)

router.get('/', ProjectController.getAllProject)

router.put('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName').notEmpty().withMessage('El nombre del proyecto es obligaorio'),
    body('clientName').notEmpty().withMessage('El nombre del clirnte es obligaorio'),
    body('description').notEmpty().withMessage('La descripcion es obligaorio'),
    handleInputErrors,
ProjectController.updateProject)

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
ProjectController.deleteProject)

 export default router 