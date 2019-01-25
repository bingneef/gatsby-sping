const Promise = require('bluebird');
const flatten = require('flat');
const deepmerge = require('deepmerge');

const locales = require('../../src/constants/locales');
const en = require('../../src/i18n/en.json');
const nl = require('../../src/i18n/nl.json');

let messages = {
  en: flatten(en),
  nl: flatten(nl),
}

if (process.env.NODE_ENV === 'production') {
  for (let key of Object.keys(messages)) {
    if (key == 'en') {
      continue;
    }
    
    messages[key] = deepmerge(messages['en'], messages[key])
  }
}

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions
  
  return new Promise(resolve => {
    deletePage(page)
    
    Object.keys(locales).map(lang => {
      const translations = messages[lang];
      const localizedPath = locales[lang].default
        ? page.path
        : locales[lang].path + page.path

      return createPage({
        ...page,
        path: localizedPath,
        context: {
          locale: lang,
          translations,
          ...page.context
        }
      })
    })

    resolve()
  })
}