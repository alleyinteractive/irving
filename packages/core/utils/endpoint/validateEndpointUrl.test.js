import validateEndpointUrl from './validateEndpointUrl';

describe('validateEndpointUrl', () => {
    it('Should return false', () => {
        const endpoint = validateEndpointUrl();
        expect(endpoint).toBe(false);
    });
});
