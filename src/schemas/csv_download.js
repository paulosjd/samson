import * as Yup from "yup";

export const CsvDownload = Yup.object().shape({
    param_choices: Yup.string().required('Required'),
    date_fmt: Yup.string().required('Required')
});