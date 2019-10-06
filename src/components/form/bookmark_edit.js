import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { validBookmarkTitle, validBookmarkUrl } from '../../schemas/constants'

const BookmarksEdit = ({bookmarks, selectedParameter, postEditedBookmarks}) => {

    const initial = {delItems: []};
    const schemaShape = {};
    bookmarks.forEach(item => {
        initial[`title_${item.id}`] = item.title;
        initial[`url_${item.id}`] = item.url;
        schemaShape[`title_${item.id}`] = validBookmarkTitle;
        schemaShape[`url_${item.id}`] = validBookmarkUrl
    });
    const valSchema = Yup.object().shape(schemaShape);

    return (
        <Formik
            initialValues={initial}
            onSubmit={val => postEditedBookmarks({ ...val, param_id: selectedParameter.id})}
            validationSchema={valSchema}
            render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur}) => {

                const tableBody = bookmarks.map(obj => {
                    const objIsPendingDel = values.delItems.includes(obj.id);
                    const handleDelIconClick = () => {
                        const delList = [...values.delItems];
                        if (!objIsPendingDel) delList.push(obj.id);
                        setFieldValue('delItems', delList);
                    };

                    return (
                        <tr key={obj.id} className={objIsPendingDel ? 'pend-del' : ''}>
                            <td className='bm-del'>{!objIsPendingDel ?
                                <span role="img" aria-label="trash" className='del-icon'
                                      onClick={handleDelIconClick}
                                >&#x274C;</span> : ''}
                            </td>
                            <td>
                                <div>
                                    <label>Title</label>
                                    <input
                                        type='text' name={`title_${obj.id}`}
                                        value={values[`title_${obj.id}`]}
                                        onBlur={handleBlur}
                                        maxLength={50}
                                        disabled={objIsPendingDel}
                                        onChange={ e => setFieldValue(`title_${obj.id}`, e.target.value) }
                                        className={'bm-title '.concat(objIsPendingDel ? 'pend-del' : '')}
                                    />
                                    {errors[`title_${obj.id}`] && touched[`title_${obj.id}`] &&
                                    <div className='dp-edit-err'>{errors[`title_${obj.id}`]}</div>}
                                </div>
                                <div>
                                    <label>URL</label>
                                    <input
                                        type='text' name={`url_${obj.id}`}
                                        value={values[`url_${obj.id}`]}
                                        maxLength={100}
                                        onBlur={handleBlur}
                                        disabled={objIsPendingDel}
                                        onChange={ e => setFieldValue(`url_${obj.id}`, e.target.value) }
                                        className={'bm-url '.concat(objIsPendingDel ? 'pend-del' : '')}
                                    />
                                    {errors[`url_${obj.id}`] && touched[`url_${obj.id}`] &&
                                    <div className='dp-edit-err'>{errors[`url_${obj.id}`]}</div>}
                                </div>
                            </td>
                        </tr>
                    )}
                );


                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='bookmarks-table' bordered>
                            <thead>
                                <tr className='short-row'>
                                    <th colSpan={2}>
                                        <span className='dp-param-label'>
                                            {selectedParameter.name ? selectedParameter.name + ' bookmarks' : ''}
                                        </span>
                                        <button type='submit' className='data-points-header-action'>
                                        <span role="img" aria-label="save" >&#x2714;&#xFE0F;</span> Save</button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {tableBody}
                            </tbody>
                        </Table>
                    </form>
                )
            }}
        />
    )
};

export default BookmarksEdit