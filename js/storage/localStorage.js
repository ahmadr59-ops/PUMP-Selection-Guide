
function saveHistory(item) {

    const history = JSON.parse(
        localStorage.getItem(PUMP_HISTORY_KEY) || '[]'
    );

    history.unshift(item);

    localStorage.setItem(
        PUMP_HISTORY_KEY,
        JSON.stringify(history)
    );
}

function loadHistory() {

    return JSON.parse(
        localStorage.getItem(PUMP_HISTORY_KEY) || '[]'
    );
}
