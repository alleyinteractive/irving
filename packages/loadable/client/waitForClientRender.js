import { loadableReady } from '@loadable/component';

export default function waitForLoadable() {
  return new Promise((resolve) => (
    loadableReady(() => {
      resolve();
    })
  ));
}
