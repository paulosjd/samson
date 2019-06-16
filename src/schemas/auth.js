import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

export const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
    username: Yup.string().required('Username is required')
        .matches(/[a-zA-Z0-9]/, 'Username can only contain numbers and letters'),
    password: Yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    password_confirm: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password confirm is required')
});

export const ForgotFieldSchema = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required')
});

export const ResetConfirmSchema = Yup.object().shape({
    new_password: Yup.string().required('Password is required')
        .min(8, 'Password must be at least 8 characters'),
    new_password2: Yup.string()
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
        .required('Password confirm is required')
});