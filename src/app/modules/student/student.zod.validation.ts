import { z } from 'zod';

// Guardian schema
const GuardianSchema = z.object({
  father: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number").optional(),
  mother: z.string().min(1, "Mother's name is required"),
  motherContactNo: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number").optional(),
});

// UserName schema
const UserNameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// LocalGuardian schema
const LocalGuardianSchema = z.object({
  name: z.string().min(1, "Name is required"),
  occupation: z.string().min(1, "Occupation is required"),
  contactNo: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  address: z.string().min(1, "Address is required"),
});

// Blood group enum
const BloodGroupEnum = z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

// Gender enum
const GenderEnum = z.enum(['male', 'female']);

// Activity status enum
const IsActiveEnum = z.enum(['active', 'inactive']);

// Student schema
const StudentZodSchema = z.object({
  id: z.string().uuid("Invalid ID format"),
  name: UserNameSchema,
  gender: GenderEnum,
  email: z.string().email("Invalid email address"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format").optional(),
  contactNo: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  emergencyContact: z.string().regex(/^\+?[0-9]{10,15}$/, "Invalid phone number"),
  bloodGroup: BloodGroupEnum.optional(),
  presentAddress: z.string().min(1, "Present address is required"),
  guardian: GuardianSchema,
  localGuardian: LocalGuardianSchema,
  profileImage: z.string().url("Invalid URL format").optional(),
  isActive: IsActiveEnum,
});


export default StudentZodSchema;