
function validatePumpSelection(result) {

    const warnings = [];

    if (result.finalNss > DEFAULT_CALCULATION_SETTINGS.maxNss) {
        warnings.push('Nss exceeds API610 recommendation');
    }

    return {
        status: warnings.length ? 'WARN' : 'PASS',
        warnings
    };
}
