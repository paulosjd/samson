import * as Yup from "yup";

export const ProfileInfo = Yup.object().shape({
    birthYear: Yup.number('Please enter a valid number'),
    gender: Yup.string()
        .oneOf(['Male', 'Female'], ''),
    height: Yup.number('Please enter a valid number'),
});

export const EmailField = Yup.object().shape({
    email: Yup.string().email('Must be a valid email').required('Email is required'),
});

export const ProfileSearchSchema = Yup.object().shape({
    input_text: Yup.string().min(3, 'Min. length is 3 characters')
});
