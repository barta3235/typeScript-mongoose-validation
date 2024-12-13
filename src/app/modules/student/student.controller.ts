import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import Joi from 'joi'
import StudentJoiValidationSchema from "./student.validation";

const createStudent= async(req:Request,res:Response)=>{
     try{
    
        // creating a schema using joi
            //-->  look at student.validate.ts
     
    //send response
    // we can brin data using param, query and body
    // const student= req.body.student;
    const {error}= StudentJoiValidationSchema.validate(req.body.student)

     // will call the service function to send this data
     const result= await StudentServices.createStudentIntoDB(req.body.student)


    if(error){
        res.status(500).json({
            success:false,
            message:"Student is created successfuly",
            data:"Something went wrong",
            error:error,
         })
    }


     //send response
     res.status(200).json({
        success:true,
        message:"Student is created successfuly",
        data:result,
     })
     }catch(err){
        console.log(err)
     }
}


const getAllStudents= async(req:Request,res:Response)=>{
    try{
        const result= await StudentServices.getAllStudentsFromDB()
        res.status(200).json({
            success:true,
            message:"Students are retrieved successfully",
            data:result
        })
    }catch(err){
         console.log(err)
    }
}


const getSingleStudent= async(req:Request,res:Response)=>{
    try{
        const studentId=req.params.studentIdNumber
        const result = await StudentServices.getSingleStudentFromDB(studentId)
        res.status(200).json({
            success:true,
            message:"Single student is retrieved successfully",
            data:result
        })             
    }catch(err){            
       console.log(err);
    }                  
}                      
                       
                       
export const StudentController={
    createStudent,      
    getAllStudents,    
    getSingleStudent,  
}                      
                       