export default {
    init({ debug }) {
        return {
            log(...thingToLog) {
                if (debug) {
                    console.log(...thingToLog);
                }
            },
            warn(...thingToLog) {
                if (debug) {
                    console.warn(...thingToLog);
                }
            },
            table(...thingToLog) {
                if (debug) {
                    console.table(...thingToLog);
                }
            },
            error(...thingToLog) {
                if (debug) {
                    console.error(...thingToLog);
                }
            }
        };
    }
};
