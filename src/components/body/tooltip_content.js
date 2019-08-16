import React from 'react';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

const CustomTooltipContent = props => {
    if (!props.active) {
        return null
    }
    const newPayload = [
        {formatter: () => (<h6 className={'foobar'}>Foobar!!</h6>)},
        ...props.payload,
    ];
    // Render the default with overridden payload
    return <DefaultTooltipContent {...props} payload={newPayload} />;
};

export default CustomTooltipContent;