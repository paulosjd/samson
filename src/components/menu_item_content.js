import React from "react";

export default ({date, label, value, value2, unit_symbol, }) => {
    let logo = '/logos/python_logo.png';
    let val2Line = null;
    let summaryVal = value + unit_symbol;
    if (label === 'Blood pressure' && value2) {
        summaryVal = value + '/' + value2  + unit_symbol;
    } else if (value2) {
        val2Line = <h5 className='category_label'>{value2  + unit_symbol}</h5>
    }
    return (
        <div>
            <h5 className='category_label'><strong>{label}</strong></h5>
            <h5 className='category_label'>{date}</h5>
            <h5 className='category_label'>{summaryVal}</h5>
            {val2Line}
        </div>
    )
}