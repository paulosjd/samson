import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltipContent = (props) => {

    if (!props.active || props.dataPoints.length < 1) {
        return null
    }
    if (props.payload) {
        props.setActiveObjId(props.payload[0].payload.id)
    }
    const newPayload = [
        {formatter: () => props.qualifyingText ? (
            <h6 className={'ttip-extra'}>{props.qualifyingText}</h6>
            ) : null},
        ...props.payload,
    ];

    // Render the default with overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
};

export default CustomTooltipContent;