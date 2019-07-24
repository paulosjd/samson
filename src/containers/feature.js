import React from 'react';
import { ListGroup, ListGroupItem, Spinner } from 'reactstrap';
import DataPointTable from '../components/dp_table'

const Feature = ({dataPoints, body, selectedParameter, setFeatItemIndex}) => {
    const labels = ['\ud83d\udcc8  Chart', '\t\ud83d\udcc4  Notes', '\ud83d\udcd6  Literature bookmarks'];
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
                <ListGroupItem className='hover-background feat-item'>
                    <span role="img" aria-label="plus">&#x2795; Add data points</span>
                </ListGroupItem>
            </ListGroup>

            <DataPointTable
                dataPoints={dataPoints.filter(obj => obj.parameter === selectedParameter.name)}
                selectedParameter={selectedParameter}
            />
        </React.Fragment>
        )
};

export default Feature