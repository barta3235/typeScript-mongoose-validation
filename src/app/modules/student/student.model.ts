import { Schema, model, connect } from 'mongoose';

import {Guardian, LocalGuardian, Student, UserName} from '../student/student.interface'


// SCHEMA CREATE
const userNameSchema= new Schema<UserName>({
    firstName: {type:String,required:[true,'First name mention is mandatory'],maxlength:[20,'Length must be less than 20'],trim:true,
        validate: {
            validator:function(value:string){
                const firstNameValueStr= value.charAt(0).toUpperCase() + value.slice(1)
                if(value !== firstNameValueStr){
                     return false
                }
                return true
            },
            message:'{VALUE} is not in capitalized format'
        }
    },
    middleName: {type:String,trim:true},
    lastName: {type:String},
})

const guardianSchema= new Schema<Guardian>({
    father: {type:String},
    fatherOccupation: {type:String},
    fatherContactNo: {type:String}, 
    mother: {type:String},
    motherContactNo: {type:String},
})

const localGuardianSchema= new Schema<LocalGuardian>({
    name: {type:String},
    occupation: {type:String},
    contactNo: {type:String},
    address: {type:String},
})
 
const StudentSchema= new Schema<Student>({
     id:{type:String,required:true,unique:true},
     name:{
        type:userNameSchema,
        required:true
     },
     //enum
     gender:{
        type:String,
        enum:{
            values:['male','female'],
            message:'Gender can either be male or female {VALUE} Not supported',
        },
        required:true,
     },
     dateOfBirth:{type:String},
     email:{type:String,required:true},
     contactNo:{type:String,required:true},
     emergencyContact:{type:String},
     //  enum
     bloodGroup:{
        type:String,
        enum:{
            values:['A+' , 'A-' , 'B+' , 'B-' , 'AB+' , 'AB-' , 'O+' , 'O-','other'],
            message:"Give valid blood group"
        },
        required:true,
     },
     presentAddress:{type:String},
     guardian:guardianSchema,
     localGuardian:localGuardianSchema,
     profileImage:{type:String},
     isActive:{
        type:String,
        enum:{
            values:['active','inActive'],
            message:"Can either be active nor not active"
        }, 
        default:'active'
     }
})


// MODEL CREATE

export const StudentModel= model<Student>('Student',StudentSchema)