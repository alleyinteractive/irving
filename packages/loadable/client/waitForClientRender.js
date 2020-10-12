import { loadableReady } from '@loadable/component';

export default function waitForLoadable(render) {
  loadableReady(() => {
    render();
  });
}
