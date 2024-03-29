import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req:Request, res:Response ) => { 
    
        const { projecId } = req.params
        try {
            const project = await Project.findById(projecId)
            if (!project) {
                const error =  new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message}) 
             }
             try {
                const task = new Task(req.body) 
                task.project = req.project.id
                req.project.tasks.push(task.id)
                await Promise.allSettled([task.save(),req.project.save()])
                res.send('Tarea creada correctamente')
             } catch (error) {
                console.log(error)
             }
            
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Hubo un error'})
        }
        
    }
    static getProjectTasks = async (req:Request, res:Response ) => { 
            console.log('req.project.id',req.params.projecId )
        try {
            const tasks = await Task.find({project: req.params.projecId }).populate('project')
            res.json(tasks)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: 'Hubo un error'})
        }
        
    }

    static getTasksId = async (req:Request, res:Response ) => { 
        
    try {
        const { taskId } = req.params
        const tasks = await Task.findById(taskId)
        console.log('tasks',tasks,'-',req.project.id)
        if (!tasks) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error: error.message})
        }
        if (tasks.project.toString() !== req.project.id) {
            const error = new Error('Accion no valida')
            return res.status(400).json({error: error.message})
        }
        res.json(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Hubo un error'})
    }
    
}

static updateTask = async (req:Request, res:Response ) => { 
        
    try {
        console.log('entra')
        const { taskId } = req.params
       

        const tasks = await Task.findByIdAndUpdate(taskId,req.body)
        //const tasks = await Task.findById(taskId)

        if (!tasks) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error: error.message})
        }
        if (tasks.project.toString() !== req.project.id) {
            const error = new Error('Accion no valida')
            return res.status(400).json({error: error.message})
        }
        //tasks.name = req.body.name
       // tasks.description = req.body.descripcion
        res.send('Tarea actualizada correctamente')
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Hubo un error'})
    }
    
}
static deleteTask = async (req:Request, res:Response ) => { 
        
    try {
        console.log('entra')
        const { taskId } = req.params
       

        const tasks = await Task.findById(taskId)
        console.log('tasks.tasks',tasks)
        console.log('tasks.tasks',req.project)
        if (!tasks) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error: error.message})
        }
        req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)

        await Promise.allSettled([tasks.deleteOne(),req.project.save()]) 

        res.send('Tarea eliminada correctamente')
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Hubo un error'})
    }
    
}
static updateStatus = async (req:Request, res:Response ) => { 
        
    try {
  
        const { taskId } = req.params
        //const { status } = req.body
       // console.log('status',status)
        console.log('taskId',taskId)

        const task = await Task.findById(taskId)
       // console.log('task',taskk.status)
        if (!task) {
            const error = new Error('Tarea no encontrada')
            return res.status(404).json({error: error.message})
        }
        const { status } = req.body
        task.status  = status
        await task.save()
       // req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId)

        //await Promise.allSettled([tasks.deleteOne(),req.project.save()]) 

        res.send('status actualizado correctamente')
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Hubo un error'})
    }
    
}


}