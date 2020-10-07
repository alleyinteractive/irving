export const propsToDataAttributes = (props = {}) => Object.keys(props).reduce(
  (agg, key) => {
    const newAgg = agg;
    newAgg[`data-${key}`] = props[key];
    return newAgg;
  },
  {}
);

export default propsToDataAttributes;
