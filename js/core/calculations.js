
function calculateTotalHead(dischargePressure, suctionPressure, density) {

    const diffPressure = dischargePressure - suctionPressure;

    if (density <= 0) return 0;

    const specificGravity = density / 1000;

    return (diffPressure * 10.197) / specificGravity;
}

function calculateNs(speed, flow, head) {

    if (!head || head <= 0) return 0;

    return (speed * Math.sqrt(flow)) / Math.pow(head, 0.75);
}

function calculateNss(speed, flow, npshr) {

    if (!npshr || npshr <= 0) return 0;

    return (speed * Math.sqrt(flow)) / Math.pow(npshr, 0.75);
}
