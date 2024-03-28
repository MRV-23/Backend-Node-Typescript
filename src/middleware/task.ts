import type { Request,Response,NextFunction } from "express";
import Task, {ITask} from "../models/Task";

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExist (req:Request, res: Response, next:NextFunction){
    try {
      
        const {taskId} = req.params
       console.log('entro',taskId)
        const task = await Task.findById(taskId)
       //const project = await Project.findOne({_id:projecId})
        console.log('task',task)
        if (!task) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.task = task
        next()
    } catch (error) {
        console.log('entro al error de validate project exist')
        res.status(500).json({error: 'Hubo un error validate task exist'})
    }
}


