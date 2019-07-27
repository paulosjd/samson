import * as Yup from "yup";
import { isValidDate, isNumeric } from "../utils/validation";

export const validDate = Yup.string().required('Required').test("date", "Expected format: YYYY-MM-DD",
    value => { return value && isValidDate(value) });

export const validNumber = Yup.string().required('Required').test("number", "Must be a valid number",
    value => { return value && isNumeric(value) });



