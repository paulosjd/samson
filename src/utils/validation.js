
export function isValidDate(dateString) {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    const d = new Date(dateString);
    const dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n) && n >= 0
}

export function isValidBookmarkUrl(value) {
    return value && value.startsWith('http') && value.includes('.')
}