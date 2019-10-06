import * as Yup from "yup";
import { isValidDate, isNumeric, isValidBookmarkUrl } from "../utils/validation";

export const validDate = Yup.string().required('Required').test("date", "Expected format: YYYY-MM-DD",
    value => { return value && isValidDate(value) });

export const validNumber = Yup.string().required('Required').test("number", "Must be a valid number",
    value => { return value && isNumeric(value) });

export const validNumberNullable = Yup.string().nullable().test("number", "Must be a valid number",
    value => { if (value === '') return true; return value && isNumeric(value) }).default('');

export const validBookmarkTitle = Yup.string().required('Required').max(50, 'Max length is 50 characters');

export const validBookmarkUrl = Yup.string().required('Required').max(100, 'Max length is 100 characters').test(
    "string", "Must be a valid URL", value => isValidBookmarkUrl(value));

export const validDateIfTouched = Yup.string().test("date", "Expected format: YYYY-MM-DD",
    value => { if (!value) { return true } return value && isValidDate(value) });

export const validNumberIfTouched = Yup.string().test("number", "Must be a valid number",
    value => { if (!value) { return true } return value && isNumeric(value) });

export const validColorChoice = Yup.string().test("string", "Must be a valid color choice",
    value => { return value === '' || (value.startsWith('#') && value.length === 7)});