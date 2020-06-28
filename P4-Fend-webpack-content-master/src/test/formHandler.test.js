import { handleSubmit } from '../client/js/formHandler'


describe('This is test and function "handleSubmit()" should exist' , () => {
    test('return true', async () => {
        expect(handleSubmit).toBeDefined();
    });
});
describe('This is test and "handleSubmit()" should be a function' , () => {
    test('It function', async () => {
        expect(typeof handleSubmit).toBe("function");
    });
});