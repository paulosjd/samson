import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltipContent = props => {

    // if (!props.active) {
    if (!props.active || props.dataPoints.length < 1) {
        return null
    }

    const dpIndex = props.dataPoints.findIndex(x => x.date === props.label);
    const text = dpIndex > -1 ? props.dataPoints[dpIndex].qualifier : '';

    const newPayload = [
        {formatter: () => text ? (<h6 className={'ttip-extra'}>{text}</h6>) : null},
        ...props.payload,
    ];

    // Render the default with overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
};

export default CustomTooltipContent;