String.prototype.isUpperCase = function() {
    return this.valueOf().toUpperCase() === this.valueOf();
};

export const toTitleCase = (phrase) => {
    if (phrase.isUpperCase()) {
        return phrase
    }
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};