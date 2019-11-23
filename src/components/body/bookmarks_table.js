import React from 'react';
import { Table } from "reactstrap";
import BookmarksEdit from "../form/bookmark_edit";
import BookmarksTableAdd from '../form/bookmark_add'

const BookmarksTable = ({ selectedParameter, bookmarks, addData, editData, setAddDataFlag, setEditDataFlag,
                            postAddedBookmarks, postEditedBookmarks, isShareView }) => {

    bookmarks = bookmarks.sort((a,b) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
    
    if (addData) return (
        <BookmarksTableAdd
            selectedParameter={selectedParameter}
            postAddedBookmarks={postAddedBookmarks}
        />
    );

    if (editData) return (
        <BookmarksEdit
            bookmarks={bookmarks}
            selectedParameter={selectedParameter}
            postEditedBookmarks={postEditedBookmarks}
        />
    );

    const headRow = (
        <tr className='short-row'>
            <th colSpan={1}>
                        <span className={!isShareView ? 'dp-param-label' : ''}>
                            {selectedParameter.name ? selectedParameter.name + ' bookmarks' : ''}
                        </span>
                { !isShareView && (
                    <React.Fragment>
                                <span className='data-points-header-action' role="img" aria-label="plus"
                                      onClick={() => setAddDataFlag(true)}>&#x2795; Add
                                </span>
                        { bookmarks.length > 0 &&
                        <span className='data-points-header-action' role="img" aria-label="pencil"
                              onClick={() => setEditDataFlag(true)}>&#x270F;&#xFE0F; Edit
                                </span> }
                    </React.Fragment>
                )}
            </th>
        </tr>
    )

    return (
        <div>
            <Table className='bookmarks-table' bordered>
                <thead>
                { selectedParameter ? headRow : null }
                </thead>
                <tbody>
                { bookmarks.map(obj => {
                    const maxLinkLen = 54;
                    return (
                        <tr key={obj.id}>
                            <td>
                                <p>{obj.title}</p>
                                <a href={obj.url}>
                                    {obj.url.length <= maxLinkLen ?
                                        obj.url : obj.url.substring(0, maxLinkLen).concat('...')}
                                </a>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    )
};

export default BookmarksTable