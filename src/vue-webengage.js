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
        const webengageService = loader.load(options?.key);

        Vue.mixin({
            mounted() {
                if (goodToGo(this)) {
                    const context = this;
                    const logger = loggerModule.init({ debug: context.$options.webengage.debug });

                    const useSchemas = options?.schemas;
                    const namespace = options?.namespace || defaultOptions.namespace;

                    this[`$${namespace}`] = {
                        track(eventName, eventPayload) {
                            try {
                                const $webengage = evaluate(context.$options.webengage, options?.schemas, context);
                                const eventData = evaluate($webengage[eventName], eventPayload, context);

                                if (useSchemas && eventData.isErrors()) {
                                    logger.warn(`Warning in ${eventName}`);
                                    logger.warn(eventData.getErrors());
                                    return;
                                }
                                logger.log('%cWebengage event ->', 'background:#eaeaea;color:green;', eventName);
                                logger.table(eventData?.toObject() || eventData);

                                webengageService.track(eventName, eventData?.toObject() || eventData);
                            } catch (error) {
                                logger.error(error);
                            }
                        }
                    };
                }
            }
        });
    }
};
