// import React from 'react';
// import { Table } from "reactstrap";
// import {Field, Formik} from "formik";
// import * as Yup from "yup";
// import {validColorChoice} from "../../schemas/constants";
//
// const ParamColorForm = ({ unitInfo, paletteChoices }) => {
//     const initial = {};
//     const schemaShape = {};
//     const formSchema = Yup.object().shape(schemaShape);
//     unitInfo.forEach(item => {
//         initial[item.param_name] = item.color_hex;
//         schemaShape[item.param_name] = validColorChoice
//     });
//     const dateErrorMsg = <tr className='short-row date-error'><td>{'sdf'}</td></tr>;
//
//     return (
//         <Formik
//             initialValues={initial}
//             onSubmit={val => console.log(val)}
//             // onSubmit={val => postEditedDataPoints({ ...val, parameter: selectedParameter.name })}
//             validationSchema={formSchema}
//             render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur}) => {
//                 return (
//                     <form onSubmit={handleSubmit}>
//                         <Table className='data-points-table' bordered>
//                             <thead>
//                             {unitInfo.map(obj => {
//                                 let key = obj.param_name;
//                                 return (
//                                     <React.Fragment>
//                                         <label htmlFor={key}>{key}</label>
//                                         <Field component="select" name={key} selected={props.values[key]}
//                                                className="profile-edit-field">
//                                             <option value="0"> </option>
//                                             {paletteChoices.map((color_hex, index) => {
//                                                 return <option key={key} value={color_hex}>{color_hex}</option>
//                                             })}
//                                         </Field>
//                                         <React.Fragment/>
//                                         )}})
//
//                                         })}
//                             </thead>
//                             <tbody>
//                             {dataPoints.map((obj, ind) => {
//                                 return (
//                                     <tr key={obj.id} className={objIsPendingDel ? 'pend-del' : ''}>
//                                         <td>
//                                             <select
//                                                 type='text' name={dateKey}
//                                                 value={values[dateKey]}
//                                                 onBlur={handleBlur}
//                                                 disabled={objIsPendingDel}
//                                                 onChange={ e => setFieldValue(dateKey, e.target.value) }
//                                                 className={objIsPendingDel ? 'pend-del' : ''}
//                                             />
//                                             {/*{dateError && <div className='dp-edit-err'>{errors[dateKey]}</div>}*/}
//                                         </td>
//                                         <td className={ valueError ? 'td-err' : ''}>
//                                             <input
//                                                 type='text' className={objIsPendingDel ? 'pend-del dp-edit' : 'dp-edit'}
//                                                 value={values[valKey]}
//                                                 onBlur={handleBlur}
//                                                 maxLength="6"
//                                                 disabled={objIsPendingDel}
//                                                 onChange={e => setFieldValue(valKey, e.target.value)}
//                                             />
//                                             {valueError && <div className='dp-edit-err'>{errors[valKey]}</div>}
//                                         </td>
//
//                                     </tr>
//                                 )
//                             })}
//                             </tbody>
//                         </Table>
//                     </form>
//                     )
//                 }
//             }
//         />
//     )
// };
//
// export default ParamColorForm