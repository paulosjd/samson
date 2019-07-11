import * as Yup from "yup";

export const CsvUpload = Yup.object().shape({
    file: Yup.mixed().required('Required')
        .test("fileSize", "Max file size is 10 kb", value => {
            return value && value.size <= 10000;
        })
        .test("fileName", "Must be a csv file", value => {
            return value && value.name && value.name.endsWith('.csv');
        }),
    param_choice: Yup.string().required('Required'),
    date_fmt: Yup.string().required('Required')
});

export const CsvDownload = Yup.object().shape({
    date_fmt: Yup.string().required('Required')
}); 
