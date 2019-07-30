import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import DataPointTable from '../components/dp_table'
import DataPointTableAdd from '../components/form/dp_table_add'


const Feature = ({dataPoints, body, selectedParameter, setFeatItemIndex, setEditDataFlag, postEditedDataPoints,
                     setAddDataFlag, postAddedDataPoints}) => {

    const labels = ['\ud83d\udcc8  Chart', '\t\ud83d\udcc4  Notes', '\ud83d\udcd6  Literature bookmarks'];
    let featTable;
    if (body.addData) {
        featTable = (
            <DataPointTableAdd
                dataPoints={dataPoints.filter(obj => obj.parameter === selectedParameter.name)}
                selectedParameter={selectedParameter}
                postAddedDataPoints={postAddedDataPoints}
                postEditedDataPoints={postEditedDataPoints}
            />
        )
    } else {
        featTable = (
            <DataPointTable
                dataPoints={dataPoints.filter(obj => obj.parameter === selectedParameter.name)}
                selectedParameter={selectedParameter}
                setEditDataFlag={setEditDataFlag}
                editData={body.editData}
                postEditedDataPoints={postEditedDataPoints}
            />
        )
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
                { !body.addData ?
                    <ListGroupItem className='hover-background feat-item short-row'
                               onClick={() => setAddDataFlag(true)}>
                    <span role="img" aria-label="plus" style={{float: 'right'}}
                    >&#x2795; Add data points</span>
                    </ListGroupItem> : null }
                {featTable}
            </ListGroup>
        </React.Fragment>
        )
};

export default Feature