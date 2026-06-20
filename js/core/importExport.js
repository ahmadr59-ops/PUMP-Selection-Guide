
function exportHistoryToExcel(history) {

    const ws = XLSX.utils.json_to_sheet(history);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Pump History');

    XLSX.writeFile(wb, 'pump_history.xlsx');
}
