const reverseSortString = (str) => {
    const charArray = str.split('');
    const sortedArray = charArray.sort((a, b) => b.localeCompare(a));
    const reversedString = sortedArray.join('');
    return reversedString;
}

module.exports.getCode = () => {
    const min = 1000;
    const max = 9999;
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return reverseSortString(num.toString());
};