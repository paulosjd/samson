import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { validBookmarkTitle, validBookmarkUrl } from '../../schemas/constants'

const BookmarksEdit = ({bookmarks, selectedParameter, postAddedBookmarks}) => {

    const initial = {delItems: []};
    const schemaShape = {};
    bookmarks.forEach(item => {
        // selectedParameter.upload_fields.split(', ').forEach(fieldName => {
        //     const key = `${item.id}_${fieldName}`;
        //     initial[key] = item[fieldName];
        //     schemaShape[key] = fieldName === 'date' ? validDate : validNumber
        // })
    });
    const valSchema = Yup.object().shape(schemaShape);
    const dateErrorMsg = <tr className='short-row date-error'><td>{'asdsdf'}</td></tr>;

    return (
        <Formik
            initialValues={initial}
            onSubmit={val => {console.log(val);console.log({ ...val, parameter: selectedParameter.name }) }}
            validationSchema={valSchema}
            render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='data-points-table' bordered>
                            {/*<thead>*/}
                            {/*<tr className='short-row'>*/}
                                {/*<th colSpan={value2 ? 3 : 2}>*/}
                                {/*<span className='dp-param-label'*/}
                                {/*>{selectedParameter.name ? selectedParameter.name + ' records' : ''}</span>*/}
                                    {/*<button type='submit' className='data-points-header-action'*/}
                                    {/*><span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save</button>*/}
                                {/*</th>*/}
                            {/*</tr>*/}
                            {/*{ value2 ? <tr className='short-row val2-header'><th> </th>*/}
                                {/*<th>{val2headers[1]}</th><th>{val2headers[2]}</th></tr> : null  }*/}
                            {/*</thead>*/}
                            {/*<tbody>*/}

                            {/*</tbody>*/}
                        </Table>
                    </form>
                )
            }}
        />
    )
};

export default BookmarksEdit

//
// {loadError && dateErrorMsg}
// {dataPoints.map((obj, ind) => {
//     const dateKey = `${obj.id}_date`;
//     const valKey = `${obj.id}_value`;
//     const val2Key = `${obj.id}_value2`;
//     const dateError = errors[dateKey] && touched[dateKey];
//     const valueError = errors[valKey] && touched[valKey];
//     const value2Error = errors[val2Key] && touched[val2Key];
//     const objIsPendingDel = values.delItems.includes(obj.id);
//     const handleDelIconClick = () => {
//         const delList = [...values.delItems];
//         if (!objIsPendingDel) delList.push(obj.id);
//         setFieldValue('delItems', delList);
//         setFieldValue(valKey, dataPoints[ind].value);
//         setFieldValue(dateKey, dataPoints[ind].date);
//     };
//     return (
//         <tr key={obj.id} className={objIsPendingDel ? 'pend-del' : ''}>
//             <td className={dateError ? 'td-err' : ''}>
//                 {!objIsPendingDel ? <span role="img" aria-label="trash" className='del-icon'
//                                           onClick={handleDelIconClick}>&#x274C;</span> : ''}
//                 <input
//                     type='text' name={dateKey}
//                     value={values[dateKey]}
//                     onBlur={handleBlur}
//                     disabled={objIsPendingDel}
//                     onChange={ e => setFieldValue(dateKey, e.target.value) }
//                     className={objIsPendingDel ? 'pend-del' : ''}
//                 />
//                 {dateError && <div className='dp-edit-err'>{errors[dateKey]}</div>}
//             </td>
//             <td className={ valueError ? 'td-err' : ''}>
//                 <input
//                     type='text' className={objIsPendingDel ? 'pend-del dp-edit' : 'dp-edit'}
//                     value={values[valKey]}
//                     onBlur={handleBlur}
//                     maxLength="6"
//                     disabled={objIsPendingDel}
//                     onChange={e => setFieldValue(valKey, e.target.value)}
//                 />
//                 {valueError && <div className='dp-edit-err'>{errors[valKey]}</div>}
//             </td>
//             { value2 && (
//                 <td className={value2Error ? 'td-err' : ''}>
//                     <input
//                         type='text' className={objIsPendingDel ? 'pend-del dp-edit' : 'dp-edit'}
//                         value={values[val2Key]}
//                         onBlur={handleBlur}
//                         maxLength="6"
//                         disabled={objIsPendingDel}
//                         onChange={e => setFieldValue(val2Key, e.target.value)}
//                     />
//                     {value2Error && <div className='dp-edit-err'>{errors[val2Key]}</div>}
//                 </td>
//             )}
//         </tr>
//     )
// })}