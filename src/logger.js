export default {
    init({ debug }) {
        const debugMode = debug || process.env.NODE_ENV === 'development';

        return {
            log(...thingToLog) {
                if (debugMode) {
                    console.log(...thingToLog);
                }
            },
            warn(...thingToLog) {
                if (debugMode) {
                    console.warn(...thingToLog);
                }
            },
            table(...thingToLog) {
                if (debugMode) {
                    console.table(...thingToLog);
                }
            },
            error(...thingToLog) {
                if (debugMode) {
                    console.error(...thingToLog);
                }
            }
        };
    }
};
