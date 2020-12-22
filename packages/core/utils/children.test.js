import {
  findChild,
  findChildByName,
  filterChildren,
  filterChildrenByName,
  groupChildren,
} from './children';

const testElement = {
  props: {},
  children: [
    {
      props: {
        componentName: 'foo',
        testProp: 'bar',
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'baz',
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'bar',
      },
    },
  ],
};

it('should find and return a single react element in `children` given a prop and value', () => {
  expect(findChild('testProp', 'bar', testElement.children)).toEqual({
    props: {
      componentName: 'foo',
      testProp: 'bar',
    },
  });
});

it('should find a single react element by api component name', () => {
  expect(findChildByName('foo', testElement.children)).toEqual({
    props: {
      componentName: 'foo',
      testProp: 'bar',
    },
  });
});

it('should filter an array of react elements by a give prop and value', () => {
  expect(filterChildren('testProp', 'bar', testElement.children)).toEqual([
    {
      props: {
        componentName: 'foo',
        testProp: 'bar',
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'bar',
      },
    },
  ]);
});

it('should filter an array of react elements by api component name', () => {
  expect(filterChildrenByName('lorem', testElement.children)).toEqual([
    {
      props: {
        componentName: 'lorem',
        testProp: 'baz',
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'bar',
      },
    },
  ]);
});

const testGroupChildrenElement = {
  props: {},
  children: [
    {
      props: {
        componentName: 'foo',
        testProp: 'bar',
        group: 'first'
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'baz',
        group: 'first'
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'bar',
        group: 'second'
      },
    },
    {
      props: {
        componentName: 'lorem',
        testProp: 'hello world'
      },
    },
  ],
};

it('should return an object of children mapped to an object by the value of the group key', () => {
  expect(groupChildren(testGroupChildrenElement.children)).toEqual({
    first: [
      {
        props: {
          componentName: 'foo',
          testProp: 'bar',
          group: 'first'
        },
      },
      {
        props: {
          componentName: 'lorem',
          testProp: 'baz',
          group: 'first'
        },
      },
    ],
    second: [
      {
        props: {
          componentName: 'lorem',
          testProp: 'bar',
          group: 'second'
        },
      },
    ],
    rest: [
      {
        props: {
          componentName: 'lorem',
          testProp: 'hello world'
        },
      },
    ],
  });
});
