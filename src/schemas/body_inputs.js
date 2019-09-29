import * as Yup from "yup";
import { validNumberNullable } from './constants'

export const MenuItemAddSchema = Yup.object().shape({
    param_choice: Yup.string().required('Required'),
    unit_choice: Yup.string().required('Required'),
});

export const CustomMenuItemAddSchema = Yup.object().shape({
    param_name: Yup.string().required('Required').max(20, 'Max length is 20 characters'),
    unit_symbol: Yup.string().required('Required').max(6, 'Max length is 6 characters'),
});

export const QualifyTextAddSchema = Yup.object().shape({
    qualify_text: Yup.string().max(50, 'Maximum length is 50 characters')
});

export const TargetValueSchema = Yup.object().shape({
    target_value: validNumberNullable
});
