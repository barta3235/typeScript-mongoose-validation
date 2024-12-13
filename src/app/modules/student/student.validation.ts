import Joi, { defaults } from "joi";

const LocalGuardianJoiValidateSchema= Joi.object({
    name: Joi.string().required(),
    occupation:Joi.string().required(),
    contactNo:Joi.string(),
    address: Joi.string()
})

const StudentJoiValidationSchema = Joi.object({
    id: Joi.string(),
    name:{
        firstName: Joi.string().max(20).required(),
        middleName: Joi.string().max(20),
        lastName: Joi.string().max(20)
    },
    gender: Joi.string().required().valid('male','female','other'), 
    localGuardian:LocalGuardianJoiValidateSchema.required()     
})

export default StudentJoiValidationSchema