export default function getPageParams(state) {
  return {
    path: state.location.path,
    context: state.siteComponents.length ? 'page' : 'site',
  };
}
