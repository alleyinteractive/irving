import validateEndpointUrl from './validateEndpointUrl';

describe('validateEndpointUrl', () => {
    const hostname = 'multisite-one.irving.test';
    it('Should return false', () => {
        const endpoint = validateEndpointUrl();
        expect(endpoint).toBe(false);
    });
});
