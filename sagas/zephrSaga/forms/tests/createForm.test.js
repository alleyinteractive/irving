import createForm from '../createForm';
import loginFormMock from './loginMock.json';
import registrationFormMock from './registrationMock.json';

describe('zephr saga => createForm HOC', () => {
  it('should render a login form of the shape', () => {
    const form = createForm(loginFormMock);
    expect(form).toMatchSnapshot();
  });

  it('should render a registration form of the shape', () => {
    const form = createForm(registrationFormMock);
    expect(form).toMatchSnapshot();
  });
});
