import * as Yup from "yup";

export const CsvUpload = Yup.object().shape({
    file: Yup.mixed().required('Required')
        .test("fileSize", "Max file size is 10 kb", value => {
            return value && value.size <= 10000;
        })
        .test("fileName", "Must be a CSV file", value => {
            return value && value.name && value.name.endsWith('.csv');
        })
});