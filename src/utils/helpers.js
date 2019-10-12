export const average = (array) => array.reduce((a, b) => a + b) / array.length;

export const toTitleCase = (phrase) => {
    if (phrase.toUpperCase() === phrase) {
        return phrase
    }
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const timeSince = (date) => {

    const seconds = Math.floor((new Date() - date) / 1000);
    if (!seconds || seconds < 0)
        return '';

    let interval = Math.floor(seconds / 31536000);
    if (interval > 1)
        return interval + " years";

    interval = Math.floor(seconds / 2592000);
    if (interval > 1)
        return interval + " months";

    interval = Math.floor(seconds / 86400);
    if (interval > 1)
        return interval + " days";

    interval = Math.floor(seconds / 3600);
    if (interval > 1)
        return interval + " hours";

    interval = Math.floor(seconds / 60);
    if (interval > 1)
        return interval + " minutes";

    return Math.floor(seconds) + " seconds";
};

export const getColorData = (unitInfo, param_name) => {
    let valColor = ''
    let rangeVal1 = 0.1;
    let rangeVal2 = 0.2;
    const paramInd = unitInfo.findIndex(x => x.param_name === param_name);
    if (paramInd > -1) {
        valColor = unitInfo[paramInd].color_hex;
        rangeVal1 = unitInfo[paramInd].color_range_val_1 / 100 || 0.1;
        rangeVal2 = unitInfo[paramInd].color_range_val_2 / 100 || 0.2
    }
    return {valColor, rangeVal1, rangeVal2}
};
