import { mount, createLocalVue } from '@vue/test-utils';
import webengage from '../vue-webengage';

const defaultOptions = {
    usePlugin: true
};

export const createDummyComponent = ({ usePlugin, additionalData, additionalOptions } = defaultOptions) => {
    const localVue = createLocalVue();

    if (usePlugin) {
        localVue.use(webengage, {
            key: 'RANDOM KEY',
            namespace: 'webengage'
        });
    }

    return mount({
        name: 'DummyComponent',
        data() {
            return {};
        },
        render(h) {
            return h('div');
        },
        ...additionalData
    }, {
        localVue,
        ...additionalOptions
    });
};
