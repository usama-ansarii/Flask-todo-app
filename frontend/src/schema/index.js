import * as Yup from "yup";

export const signupSchema = Yup.object({
  fullname: Yup.string().min(2).max(25).required("Please enter your full name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});


export const todoSchema = Yup.object({
  task: Yup.string()
    .min(3, "Task must be at least 3 characters")
    .required("Task title is required"),
    
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .required("Task description is required"),
});