
document.addEventListener('DOMContentLoaded', () => {

    document
        .getElementById('suggestPumpBtn')
        .addEventListener('click', handleSuggestion);

    renderHistoryList();
    renderReferenceLibrary();
});

function handleSuggestion() {

    const formData = getFormData();

    const selectedPump = suggestPumpType(formData);

    const result = {
        finalSuggestedType: selectedPump,
        finalNs: calculateNs(
            formData.pumpSpeed,
            formData.ratedFlowRate,
            250
        ),
        finalNss: calculateNss(
            formData.pumpSpeed,
            formData.ratedFlowRate,
            3
        )
    };

    const validation = validatePumpSelection(result);

    document.getElementById('resultTab').innerHTML = `
        <div class="result-card">
            <h2 class="text-2xl font-bold text-blue-700">
                Suggested Pump: ${result.finalSuggestedType}
            </h2>

            <div class="mt-4 space-y-2">
                <div>Ns: ${result.finalNs.toFixed(0)}</div>
                <div>Nss: ${result.finalNss.toFixed(0)}</div>
                <div>Status: ${validation.status}</div>
            </div>
        </div>
    `;

    saveHistory(result);

    drawPumpChart(result);

    showNotification('Pump selection completed');
}
