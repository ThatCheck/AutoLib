import reactCookie from 'react-cookie';
import { locale as defaultLocale, locales } from 'config';

const maxAge = 24 * 60 * 60 * 1000 * 7;

const getDefaultLocale = () => {
  const localeFromCookie = reactCookie.load('locale');
  return locales.indexOf(localeFromCookie) !== -1 ? localeFromCookie : defaultLocale;
};

const IntlUtils = {
  intlDataHash: {
    en: {
      file: 'en',
      locale: 'en'
    },
    fr: {
      file: 'fr',
      locale: 'fr'
    },
  },
  getCurrentLocale: function _currentLocale(localeFromParams) {

    let currentLocale = getDefaultLocale();

    if (locales.indexOf(localeFromParams) !== -1) {
      reactCookie.save('locale', localeFromParams, {
        path: '/',
        maxAge: maxAge
      });
      currentLocale = localeFromParams;
    }
    return currentLocale;
  }
};
export default IntlUtils;
