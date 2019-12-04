import loggerModule from './logger';
import loader from './loader';

const defaultOptions = {
    namespace: 'webengage'
};

const goodToGo = (context) => {
    return context.$options.webengage;
};

const evaluate = (value, payload, context) => {
    if (typeof value === 'function') {
        return value.call(context, payload);
    }
    return value;
};

export default {
    install(Vue, options) {
        if (!options?.key) {
            throw new Error('You have to define webengage key. got undefined');
        }
        const webengageService = loader.load(options.key);

        Vue.mixin({
            mounted() {
                if (goodToGo(this)) {
                    const context = this;
                    webengageService.debug(!!options?.debug);
                    const logger = loggerModule.init({ debug: options.debug || context.$options.webengage.debug });

                    const namespace = options?.namespace || defaultOptions.namespace;

                    this[`$${namespace}`] = {
                        service: webengageService,

                        track(eventName, eventPayload) {
                            try {
                                const $webengage = evaluate(context.$options.webengage, options?.schemas, context);
                                const eventData = evaluate($webengage[eventName], eventPayload, context);

                                logger.log('%cWebengage event ->', 'background:#eaeaea;color:green;', eventName);
                                logger.table(eventData);

                                webengageService.track(eventName, eventData);
                            } catch (error) {
                                logger.dir(error);
                                logger.error(`Error in ${eventName}`, error);
                            }
                        }
                    };
                }
            }
        });
    }
};
