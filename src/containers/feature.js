import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import BookmarksTable from '../components/body/bookmarks_table'
import DataPointTable from '../components/body/dp_table'
import ParamInfo from "../components/body/param_info";

const Feature = ({dataPoints, body, ideals, selectedParameter, setFeatItemIndex, setEditDataFlag, postEditedDataPoints,
                     setAddDataFlag, setEditTargetFlag, setEditTarget2Flag, handleProfileClick,
                     postAddedDataPoints, clearEditDataFailure, postTargetValue, unitInfo, bookmarks,
                     postEditedBookmarks, postAddedBookmarks}) => {

    const labels = ['\ud83d\udcc8  Records', '\t\ud83d\udcc4  Stats and info', '\ud83d\udcd6  Bookmarks'];
    const paramDps = dataPoints.filter(obj => obj.parameter === selectedParameter.name);
    const latestDp = paramDps.length > 0 ? paramDps[0] : {};

    const dpTable = (
        <DataPointTable
            dataPoints={paramDps}
            selectedParameter={selectedParameter}
            setEditDataFlag={setEditDataFlag}
            setAddDataFlag={setAddDataFlag}
            editData={body.editData}
            addData={body.addData}
            loadError={body.loadError}
            postEditedDataPoints={postEditedDataPoints}
            postAddedDataPoints={postAddedDataPoints}
            clearEditDataFailure={clearEditDataFailure}
        />
    );

    let paramIdeals = {};
    if (ideals) {
        const paramIdealInd = ideals.findIndex(x => x.param_name === selectedParameter.name);
        paramIdeals = ideals[paramIdealInd]
    }

    const paramInfo = (
        <ParamInfo
            selectedParameter={selectedParameter}
            postTargetValue={postTargetValue}
            latestDp={latestDp}
            editTarget={body.editTarget}
            editTarget2={body.editTarget2}
            ideals={paramIdeals}
            unitInfo={unitInfo}
            setEditTargetFlag={setEditTargetFlag}
            setEditTarget2Flag={setEditTarget2Flag}
            handleProfileClick={handleProfileClick}
        />
    );

    const bookmarks_table = (
        <BookmarksTable
            selectedParameter={selectedParameter}
            bookmarks={bookmarks.filter(obj => obj.param_id === selectedParameter.id)}
            editData={body.editData}
            addData={body.addData}
            setEditDataFlag={setEditDataFlag}
            setAddDataFlag={setAddDataFlag}
            postEditedBookmarks={postEditedBookmarks}
            postAddedBookmarks={postAddedBookmarks}
        />
    );

    let mainItem;
    switch(body.selectedFeatIndex) {
        case 1:
            mainItem = paramInfo;
            break;
        case 2:
            mainItem = bookmarks_table;
            break;
        default:
            mainItem = dpTable
    }

    return (
        <React.Fragment>
            <ListGroup className='feat-item-group'>
                {labels.map((val, ind) => {
                    return (
                    <ListGroupItem key={ind}
                        className={'hover-background feat-item '.concat(
                            ind === body.selectedFeatIndex ? 'selected-menu-item' : '')}
                        onClick={() => {
                            setFeatItemIndex(ind);
                            setEditDataFlag(false);
                            setAddDataFlag(false)
                        }}
                    >
                        <span role="img" aria-label="icon">{val}</span>
                    </ListGroupItem>
                    )
                })}
            </ListGroup>
            <ListGroup className='feat-item-group'>
                {mainItem}
            </ListGroup>
        </React.Fragment>
        )
};

export default Feature