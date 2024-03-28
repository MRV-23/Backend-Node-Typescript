import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/projectController";
import { handleInputErrors } from "../middleware/validator";
import { TaskController } from "../controllers/TaskController";
import { projectExist } from "../middleware/project";
import { taskExist } from "../middleware/task";


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

/* ROUTES FOR TASK */

router.param('projecId', projectExist)

router.post('/:projecId/tasks',
   // ValidateProjectExist,
    body('name').notEmpty().withMessage('El nombre de la tarea es obligaorio'),
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligaorio'),
    handleInputErrors,
    TaskController.createTask,
)

router.get('/:projecId/tasks', 
   // ValidateProjectExist,
    TaskController.getProjectTasks,
)

router.param('taskId',taskExist)

router.get('/:projecId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTasksId,
)

router.put('/:projecId/tasks/:taskId', 
   // ValidateProjectExist,
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre de la tarea es obligaorio'),
    body('description').notEmpty().withMessage('La descripcion de la tarea es obligaorio'),
    handleInputErrors,
    TaskController.updateTask,
)

router.delete('/:projecId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.deleteTask,
)

router.post('/:projecId/tasks/:taskId/status', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    body('status').notEmpty().withMessage('El estado es obligatoio'),
    handleInputErrors,
    TaskController.updateStatus,
)
 

 export default router 