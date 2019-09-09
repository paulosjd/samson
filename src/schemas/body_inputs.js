import * as Yup from "yup";
import { validNumberNullable } from './constants'

export const MenuItemAddSchema = Yup.object().shape({
    param_choice: Yup.string().required('Required'),
    unit_choice: Yup.string().required('Required'),
});

export const QualifyTextAddSchema = Yup.object().shape({
    qualify_text: Yup.string().max(50, 'Maximum length is 50 characters')
});

export const TargetValueSchema = Yup.object().shape({
    target_value: validNumberNullable
});
