import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import DataPointTable from '../components/body/dp_table'
import ParamInfo from "../components/body/param_info";


const Feature = ({dataPoints, body, ideals, selectedParameter, setFeatItemIndex, setEditDataFlag, postEditedDataPoints,
                     setAddDataFlag, setEditTargetFlag, setEditTarget2Flag,
                     postAddedDataPoints, clearEditDataFailure, postTargetValue }) => {
    const labels = ['\ud83d\udcc8  Records', '\t\ud83d\udcc4  Stats and info', '\ud83d\udcd6  Literature bookmarks'];
    const paramDps = dataPoints.filter(obj => obj.parameter === selectedParameter.name);
    const latestDp = paramDps.length > 0 ? paramDps[0] : {};
    const paramIdeals = ideals && ideals[body.selectedItemIndex] ? ideals[body.selectedItemIndex] : {};
    let mainItem;
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

    const paramInfo = (
        <ParamInfo
            selectedParameter={selectedParameter}
            postTargetValue={postTargetValue}
            latestDp={latestDp}
            editTarget={body.editTarget}
            editTarget2={body.editTarget2}
            ideals={paramIdeals}
            setEditTargetFlag={setEditTargetFlag}
            setEditTarget2Flag={setEditTarget2Flag}
        />
    );

    switch(body.selectedFeatIndex) {
        case 1:
            mainItem = paramInfo;
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
                        onClick={() => setFeatItemIndex(ind)}
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