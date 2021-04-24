import {validateURL} from '../formValidationFunctions';

test('URL Validation', () => {
    expect(
        validateURL('https://www.independent.co.uk/topic/murder')
    ).toBe(true);
    expect(
        validateURL('invalidEmail')
    ).toBe(false);
});