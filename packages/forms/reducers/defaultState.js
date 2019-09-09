const getDefaultState = () => ({
  form: {
    submitting: false,
    submitted: false,
    failed: false,
    validation: {},
    redirect: '',
  },
});

export default getDefaultState;
