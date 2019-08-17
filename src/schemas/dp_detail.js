import * as Yup from "yup";

export const MenuItemAddSchema = Yup.object().shape({
    param_choice: Yup.string().required('Required'),
    unit_choice: Yup.string().required('Required'),
});

export const QualifyTextAddSchema = Yup.object().shape({
    qualify_text: Yup.string().required('Required').max(50, 'Maximum length is 50 characters')
});