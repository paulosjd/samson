import React from "react";

export default ({date, label, value, value2, unit_symbol, valColor, paramIdeals, colorRangeVal1, colorRangeVal2 }) => {
    let summaryVal = value + unit_symbol;
    if (value2) {
        summaryVal = value + '/' + value2  + unit_symbol;
    } else if (label === 'Blood cholesterol' && value2) {
        summaryVal = 'LDL: '.concat(value, ' HDL: ', value2, ' ', unit_symbol);
    }
    let savedTarget;
    let savedTarget2;
    if (paramIdeals) {
        savedTarget = paramIdeals.saved;
        savedTarget2 = paramIdeals.saved2;
    }

    const getColorIndex = (val, targetVal) => {
        let diff1 = targetVal * colorRangeVal1;
        let diff2 = targetVal * colorRangeVal2;
        const [min1, max1, min2, max2] = [
            targetVal - diff1,
            targetVal + diff1,
            targetVal - diff2,
            targetVal + diff2
        ];
        if (val > min1 && val < max1) {
            return 0
        } else if (val > min2 && val < max2) {
            return 1
        } else return 2
    };

    if (!valColor && value && savedTarget) {
        const paletteChoices = ['#99c140', '#ffbf00', '#ff7f00'];
        const colorIndex = getColorIndex(value, savedTarget);
        valColor = paletteChoices[colorIndex];
        if (value2 && savedTarget2) {
            const colorIndex2 = getColorIndex(value2, savedTarget2);
            if (colorIndex2 > colorIndex) {
                valColor = paletteChoices[colorIndex2];
            }
        }
    }

    return (
        <div>
            <h5 className='category_label line1'>{label}</h5>
            {date && (<h6 className='category_label'>{date + ' '}
                <span role="img" aria-label="dash-symbol">&#x2796;</span>
                <span className='menu-item-content'
                      style={{backgroundColor: valColor}}>{' ' + summaryVal}</span></h6>)}
        </div>
    )
}