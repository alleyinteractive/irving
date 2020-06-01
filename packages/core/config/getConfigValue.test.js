import { getConfigValue } from './getConfigValue';

describe('getConfigValue', () => {
  it(
    'should merge config arrays together',
    () => {
      const configs = [
        ['test'],
        ['test-two'],
      ];

      expect(getConfigValue(configs, [])).toEqual([
        'test',
        'test-two',
      ])
    }
  );

  it(
    'should deeply merge config objects together',
    () => {
      const configs = [
        {
          configField: ['test', 'test-two'],
          secondField: 'this is a value',
        },
        { configField: ['test-three', 'test-four'] },
      ];

      expect(getConfigValue(configs, {})).toEqual({
        configField: [
          'test',
          'test-two',
          'test-three',
          'test-four',
        ],
        secondField: 'this is a value',
      })
    }
  );

  it(
    'should call functions provided as the config and assume user returns a new config.',
    () => {
      const configs = [
        (config) => { return {...config, foo: 'bar' }},
        (config) => { return {...config, bing: 'bong' }},
      ];

      expect(getConfigValue(configs, { foo: 'foo' })).toEqual({
        foo: 'bar',
        bing: 'bong',
      })
    }
  );
});
