import React from "react";

export default ({date, label, value, value2, unit_symbol, }) => {
    let logo = '/logos/python_logo.png';
    let summaryVal = value + unit_symbol;
    if (value2) {
        summaryVal = value + '/' + value2  + unit_symbol;
    } else if (label === 'Blood cholesterol' && value2) {
        summaryVal = 'LDL: '.concat(value, ' HDL: ', value2, ' ', unit_symbol);
    }
    return (
        <div>
            <h5 className='category_label'><strong>{label}</strong></h5>
            {date && (<h6 className='category_label '>{date + ' '}
                <span role="img" aria-label="dash-symbol">&#x2796;</span>{' ' + summaryVal}</h6>)}
        </div>
    )
}