import React from 'react';
import { Table } from "reactstrap";
import { Formik } from "formik";
import { validBookmarkTitle, validBookmarkUrl } from "../../schemas/constants";
import * as Yup from "yup";

const BookmarksAdd = ({selectedParameter, postAddedBookmarks}) => {

    const valSchema = Yup.object().shape({
        title: validBookmarkTitle,
        url: validBookmarkUrl,
    });

    return (
        <Formik
            initialValues={{title: '', url: ''}}
            onSubmit={val => postAddedBookmarks({ ...val, parameter: selectedParameter.id })}
            validationSchema={valSchema}
            render={({values, handleSubmit, setFieldValue, errors, touched, handleBlur}) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <Table className='bookmarks-table' bordered>
                            <tbody>
                            <tr><td>
                                <div>
                                    <label>Title</label>
                                    <input
                                        type='text' name='title'
                                        value={values.title}
                                        onBlur={handleBlur}
                                        maxLength={50}
                                        className='bm-title'
                                        onChange={ e => setFieldValue('title', e.target.value)}
                                    />
                                    {errors.title && touched.title && <div className='dp-edit-err'>{errors.title}</div>}
                                </div>
                                <div>
                                    <label>URL</label>
                                    <input
                                        type='text' name='url'
                                        value={values.url}
                                        onBlur={handleBlur}
                                        maxLength={100}
                                        className='bm-url'
                                        onChange={e => setFieldValue('url', e.target.value)}
                                    />
                                    {errors.url && touched.url && <div className='dp-edit-err'>{errors.url}</div>}                                </div>
                            </td></tr>
                            <tr className='short-row'>
                                <td>
                                    <button
                                        type='submit'
                                        className='data-points-header-action'
                                        style={{marginBottom: 8}}
                                    ><span role="img" aria-label="save"
                                    >&#x2714;&#xFE0F;</span>Save bookmark</button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </form>
                )
            }}
        />
    )
};

export default BookmarksAdd