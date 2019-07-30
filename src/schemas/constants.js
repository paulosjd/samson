import * as Yup from "yup";
import { isValidDate, isNumeric } from "../utils/validation";

export const validDate = Yup.string().required('Required').test("date", "Expected format: YYYY-MM-DD",
    value => { return value && isValidDate(value) });

export const validNumber = Yup.string().required('Required').test("number", "Must be a valid number",
    value => { return value && isNumeric(value) });




export const validDateIfTouched = Yup.string().test("date", "Expected format: YYYY-MM-DD",
    value => { if (!value) { return true } return value && isValidDate(value) });

export const validNumberIfTouched = Yup.string().test("number", "Must be a valid number",
    value => { if (!value) { return true } return value && isNumeric(value) });
