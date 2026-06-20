
function suggestPumpType(data) {

    const totalHead = calculateTotalHead(
        data.dischargePressure,
        data.suctionPressure,
        data.density
    );

    if (totalHead > 1000) {
        return 'BB5';
    }

    if (data.npshAvailable < 2.5) {
        return 'VS6';
    }

    return 'OH2';
}
