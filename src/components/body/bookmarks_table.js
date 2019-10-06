import React from 'react';
import { Table} from "reactstrap";
import BookmarksEdit from "../form/bookmark_edit";
import BookmarksTableAdd from '../form/bookmark_add'

const BookmarksTable = ({ selectedParameter, bookmarks, addData, editData, setAddDataFlag, setEditDataFlag,
                            postAddedBookmarks, postEditedBookmarks }) => {

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

    const tableBody = bookmarks.map(obj => {
        const maxLinkLen = 54;
        return (
            <tr key={obj.id}>
                <td>
                    <p>{obj.title}</p>
                    <a href={obj.url}>
                        {obj.url.length <= maxLinkLen ? obj.url : obj.url.substring(0, maxLinkLen).concat('...')}
                    </a>
                </td>
            </tr>
        )
    });

    return (
        <div>
            <Table className='bookmarks-table' bordered>
                <thead>
                <tr className='short-row'>
                    <th colSpan={1}>
                        <span className='dp-param-label'
                        >{selectedParameter.name ? selectedParameter.name + ' bookmarks' : ''}</span>
                        <span className='data-points-header-action' role="img" aria-label="plus"
                                  onClick={() => setAddDataFlag(true)}>&#x2795; Add</span>
                        { bookmarks.length > 0 &&
                        <span className='data-points-header-action' role="img" aria-label="pencil"
                              onClick={() => setEditDataFlag(true)}
                        >&#x270F;&#xFE0F; Edit</span> }
                    </th>
                </tr>
                </thead>
                <tbody>
                {tableBody}
                </tbody>
            </Table>
        </div>
    )
};

export default BookmarksTable