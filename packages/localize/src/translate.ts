/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {LocalizeFn} from './localize';
import {MessageId, ParsedTranslation, parseTranslation, TargetMessage, translate as _translate} from './utils';

/**
 * We augment the `$localize` object to also store the translations.
 *
 * Note that because the TRANSLATIONS are attached to a global object, they will be shared between
 * all applications that are running in a single page of the browser.
 */
declare const $localize: LocalizeFn&{TRANSLATIONS: Record<MessageId, ParsedTranslation>};

/**
 * Load translations for `$localize`.
 *
 * The given `translations` are processed and added to a lookup based on their `MessageId`.
 * A new translation will overwrite a previous translation if it has the same `MessageId`.
 *
 * * If a message is generated by the Angular compiler from an `i18n` marker in a template, the
 *   `MessageId` is passed through to the `$localize` call as a custom `MessageId`. The `MessageId`
 *   will match what is extracted into translation files.
 *
 * * If the translation is from a call to `$localize` in application code, and no custom `MessageId`
 *   is provided, then the `MessageId` can be generated by passing the tagged string message-parts
 *   to the `parseMessage()` function (not currently public API).
 *
 * @publicApi
 *
 */
export function loadTranslations(translations: Record<MessageId, TargetMessage>) {
  // Ensure the translate function exists
  if (!$localize.translate) {
    $localize.translate = translate;
  }
  if (!$localize.TRANSLATIONS) {
    $localize.TRANSLATIONS = {};
  }
  Object.keys(translations).forEach(key => {
    $localize.TRANSLATIONS[key] = parseTranslation(translations[key]);
  });
}

/**
 * Remove all translations for `$localize`.
 *
 * @publicApi
 */
export function clearTranslations() {
  $localize.translate = undefined;
  $localize.TRANSLATIONS = {};
}

/**
 * Translate the text of the given message, using the loaded translations.
 *
 * This function may reorder (or remove) substitutions as indicated in the matching translation.
 */
export function translate(messageParts: TemplateStringsArray, substitutions: readonly any[]):
    [TemplateStringsArray, readonly any[]] {
  try {
    return _translate($localize.TRANSLATIONS, messageParts, substitutions);
  } catch (e) {
    console.warn(e.message);
    return [messageParts, substitutions];
  }
}