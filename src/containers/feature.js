import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import DataPointTable from '../components/dp_table'

const Feature = ({dataPoints, body, selectedParameter, setFeatItemIndex, setEditDataFlag, postEditedDataPoints,
                     setAddDataFlag, postAddedDataPoints, clearEditDataFailure }) => {
    const labels = ['\ud83d\udcc8  Chart', '\t\ud83d\udcc4  Notes and info', '\ud83d\udcd6  Literature bookmarks'];
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
                <DataPointTable
                    dataPoints={dataPoints.filter(obj => obj.parameter === selectedParameter.name)}
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
            </ListGroup>
        </React.Fragment>
        )
};

export default Feature