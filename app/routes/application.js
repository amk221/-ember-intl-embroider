import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service intl;

  async beforeModel() {
    const locale = 'en-gb';

    // Path to fingerprinted asset map is dealt with at build time by broccoli-asset-rev
    const map = await load('/assets/assetMap.json');

    // Dynamic path to translation file, broccoli-asset-rev can't deal with this,
    // hence the need to look up the real (fingerprinted) path in the asset map.
    const path = `translations/${locale}.json`;
    const fingerprintedPath = map.assets[path];

    const translations = await load(fingerprintedPath);

    await wait(500);

    this.intl.addTranslations(locale, translations);

    this.intl.setLocale([locale]);
  }
}

function load(url) {
  return fetch(url).then((response) => response.json());
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
