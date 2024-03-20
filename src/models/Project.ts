import mongoose, { Document, Schema, PopulatedDoc, Types } from "mongoose";
import { ITask } from './Task'


export interface IProject extends Document  {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[]
}

const ProjectSchema: Schema = new Schema ({
    projectName:{  
    type:String,
    require: true,
    description: true
    },
    clientName:{  
    type:String,
    require: true,
    description: true
    },
    description:{  
    type:String,
    require: true,
    description: true
    },
    tasks: [
        {
         type: Types.ObjectId,
         ref: 'Task'
        }
     ]
},{timestamps:true})

const Project = mongoose.model<IProject>('Project',ProjectSchema)
export default Project