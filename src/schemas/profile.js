import * as Yup from "yup";

export const ProfileInfo = Yup.object().shape({
    birthYear: Yup.number('Please enter a valid number'),
    gender: Yup.string()
        .oneOf(['Male', 'Female'], ''),
    height: Yup.number('Please enter a valid number'),
});
