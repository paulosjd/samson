import * as Yup from "yup";

export const ProfileInfo = Yup.object().shape({
    birthYear: Yup.number('Please enter a valid number')
        .min(1920, 'Unlikely')
        .max(new Date().getFullYear() - 14, 'Must be above 13'),
    gender: Yup.string()
        .oneOf(['Male', 'Female'], ''),
});
