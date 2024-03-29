import type { Request,Response,NextFunction } from "express";
import Project, {IProject} from "../models/Project";

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export async function projectExist (req:Request, res: Response, next:NextFunction){
    try {
       // console.log('eq.params',req.params)
        const {projecId} = req.params
        const id = projecId
        console.log('projecId',projecId)
        let project = undefined
        await Promise.allSettled([  project =  Project.findById(id)])
        //const project = await Project.findById(id)
       //const project = await Project.findOne({_id:projecId})
        console.log('project',project)
        if (!project) {
            const error = new Error('Proyecto no encontrado')
            return res.status(404).json({error: error.message})
        }
        req.project =project
        next()
    } catch (error) {
        console.log('entro al error de validate project exist')
        res.status(500).json({error: 'Hubo un error validate exist'})
    }
}


