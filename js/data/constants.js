
const PUMP_HISTORY_KEY = 'pumpHistory_v3';
const PUMP_REFERENCE_LIBRARY_KEY = 'pumpReferenceLibrary_v3';

const DEFAULT_CALCULATION_SETTINGS = {
    criticalNPSH: 2.5,
    minNsStandard: 10,
    maxNss: 210,
    maxTipSpeedNonCorrosive: 46
};

const INTERNAL_KEY_MAP = {
    projectName: ['PROJECT'],
    pumpName: ['PUMP TAG'],
    fluidName: ['FLUID'],
    ratedFlowRate: ['RATED FLOW'],
    totalHead: ['TotalHead'],
    suggestion: ['PumpSuggestion']
};
