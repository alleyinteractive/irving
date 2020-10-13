import React from 'react';
import getTemplateVars from './getTemplateVars';

describe('getTemplateVars', () => {
  let initialVars;

  beforeEach(() => {
    initialVars = {
      Wrapper: () => (<div>I am the app content</div>),
      head: {
        script: '<script>this is my title</script>',
      },
    };
  });

  it('should render Wrapper to a string and add result to appHtml key', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.appHtml).toContain('I am the app content');
  });

  it('should keep initial values in the template vars object', () => {
    const vars = getTemplateVars('getErrorTemplateVars', initialVars);
    expect(vars.appHtml).toContain('I am the app content');
  });

  it('should get variables from irving.config.js', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.testVal).toBe('this is a fun field for the app');
  });

  it('should concatenate arrays in head object together then join into a single string', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.head.link).toBe(
      '<link rel=\"stylesheet\" href=\"css/test.css\" /><link rel=\"stylesheet\" href=\"css/lorem.css\" />'
    );
  });

  it('should concat strings to arrays, then join array into a single string', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.head.start).toBe(
      '<script>const anotherTest = 200;</script><script>const test = 100;</script>'
    );
  });

  it('should call functions found in `head` object and merge results into a single string', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.head.meta).toBe(
      '<meta name=\"keywords\" content=\"this, is, a, test\" /><meta name=\"description\" content=\"lorem ipsum dolor sit amet\" />'
    );
  });

  it('should call `head` if it is configured as a function', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.head.end).toContain('Nascetur sodales nostra');
  });

  it('nest wrapper components within one another to combine them', () => {
    const vars = getTemplateVars('getAppTemplateVars', initialVars);
    expect(vars.appHtml).toContain('data-testid="wrapper-two"');
    expect(vars.appHtml).toContain('data-testid="wrapper-one"');
  });
});
