import { createDummyComponent } from './_utils';

describe('webengage-2', function() {
    context('registering plugin', function() {
        it('should register with no errors', function() {
            expect.hasAssertions();

            expect(
                createDummyComponent({
                    usePlugin: false
                }).$webengage
            ).toBeUndefined();

            expect(
                createDummyComponent().$webengage
            ).toBeUndefined();
        });
    });

    context('using plugin', function() {
        it('should have $webengage property', function() {
            expect.hasAssertions();

            const component = createDummyComponent({
                usePlugin: true,
                additionalData: {
                    webengage: {
                        'webengage event name': {}
                    }
                }
            });
            expect(component.vm.$webengage).toBeObject();
        });

        it('should have correct webengage methods', function() {
            expect.hasAssertions();

            const component = createDummyComponent({
                usePlugin: true,
                additionalData: {
                    webengage: {
                        'webengage event name': {}
                    }
                }
            });

            expect(component.vm.$webengage).toMatchObject({
                track: expect.any(Function)
            });
        });
    });

    context('plugin methods', function() {
        context('track', function() {
            it('should call webengage track', function() {
                expect.hasAssertions();

                const component = createDummyComponent({
                    usePlugin: true,
                    additionalData: {
                        webengage: {
                            'webengage event name': {}
                        }
                    }
                });

                const spy = jest.spyOn(component.vm.$webengage, 'track');

                component.vm.$webengage.track('EventName', {
                    someEventData: 'TEST'
                });

                expect(spy).toHaveBeenCalledWith('EventName', {
                    someEventData: 'TEST'
                });
            });
        });
    });
});
