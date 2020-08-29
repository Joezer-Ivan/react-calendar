export const exportToCSV = (fileName, rows) => {
    // TODO :: rewrite
    const getRowStr = (row) => {
        let finalVal = '';
        for (let j = 0; j < row.length; j++) {
            //handle edge cases and escape special characters...
            let innerValue = row[j] === null ? '' : row[j].toString()
            let result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0){
                result = '"' + result + '"';
            }
            if (j > 0){
                finalVal += ',';
            }
            if (result === ''){
                result = '-';
            }
            finalVal += result;
        }
        return finalVal + '\n';
    };

    let csvFile = '';
    for (let row of rows) {
        csvFile += getRowStr(row);
    }
    const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}