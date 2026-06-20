
function normalizeHeader(header) {
    if (typeof header !== 'string') return '';

    return header
        .trim()
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, '');
}

function showNotification(message) {
    console.log(message);
}
