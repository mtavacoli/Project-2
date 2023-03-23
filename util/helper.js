module.exports = {
    formatDate: (date) => {
        const year = date.getFullYear();
        const month = date.toLocalString('default', { month: 'long' });
        const day = date.getData();
        return `${month} ${day}, ${year}`;
    }
}