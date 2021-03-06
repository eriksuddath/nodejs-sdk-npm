'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var LANG_CODES = {
  'en-us': 94,
  'en-gb': 92,
  'en-ca': 76,
  'en-au': 72,
  'en-ir': 80,
  'es-mx': 222,
  'es-es': 234,
  'es-co': 208,
  'es-ar': 202,
  'es-pe': 230,
  'es-ve': 238,
  'es-cl': 206,
  'es-ec': 214,
  'fr-fr': 110,
  'de-de': 124,
  'af-za': 1,
  'sq-al': 2,
  'ar-dz': 3,
  'ar-bh': 4,
  'ar-eg': 5,
  'ar-iq': 6,
  'ar-jo': 8,
  'ar-kw': 10,
  'ar-lb': 12,
  'ar-ly': 14,
  'ar-ma': 16,
  'ar-oa': 18,
  'ar-qa': 20,
  'ar-sa': 22,
  'ar-sy': 24,
  'ar-tn': 26,
  'ar-ae': 28,
  'ar-ye': 30,
  'hy-am': 32,
  'cy-az-az': 34,
  'lt-az-az': 36,
  'eu-es': 38,
  'be-by': 40,
  'bn-bn': 268,
  'bs-bs': 272,
  'bg-bg': 42,
  'ca-es': 44,
  'zh-chs': 56,
  'zh-cht': 58,
  'zh-cn': 46,
  'zh-hk': 48,
  'zh-mo': 50,
  'zh-sg': 52,
  'zh-tw': 54,
  'hr-hr': 60,
  'cs-cz': 62,
  'da-dk': 64,
  'div-mv': 66,
  'nl-be': 68,
  'nl-nl': 70,
  'en-bz': 74,
  'en-cb': 78,
  'en-jm': 82,
  'en-nz': 84,
  'en-ph': 86,
  'en-za': 88,
  'en-tt': 90,
  'en-zw': 96,
  'et-ee': 98,
  'fo-fo': 100,
  'fa-ir': 102,
  'fi-fi': 104,
  'fr-be': 106,
  'fr-ca': 108,
  'fr-lu': 112,
  'fr-mc': 114,
  'fr-ch': 116,
  'gl-es': 118,
  'ka-ge': 120,
  'de-at': 122,
  'de-li': 126,
  'de-lu': 128,
  'de-ch': 130,
  'el-gr': 132,
  'gu-in': 134,
  'he-il': 136,
  'hi-in': 138,
  'hu-hu': 140,
  'is-is': 142,
  'bn-in': 269,
  'ml-in': 270,
  'id-id': 144,
  'it-it': 146,
  'it-ch': 148,
  'ja-jp': 150,
  'kn-in': 152,
  'kk-kz': 154,
  'kok-in': 156,
  'ko-kr': 158,
  'ky-kz': 160,
  'lv-lv': 162,
  'lt-lt': 164,
  'mk-mk': 166,
  'ms-bn': 168,
  'ms-my': 170,
  'mr-in': 172,
  'mn-mn': 174,
  'mmr-my': 271,
  'nb-no': 176,
  'nn-no': 178,
  'pl-pl': 180,
  'pt-br': 182,
  'pt-pt': 184,
  'pa-in': 186,
  'ro-ro': 188,
  'ru-ru': 190,
  'sa-in': 192,
  'cy-sr-sp': 194,
  'lt-sr-sp': 196,
  'sk-sk': 198,
  'sl-si': 200,
  'es-bo': 204,
  'es-cr': 210,
  'es-do': 212,
  'es-sv': 216,
  'es-gt': 218,
  'es-hn': 220,
  'es-ni': 224,
  'es-pa': 226,
  'es-py': 228,
  'es-pr': 232,
  'es-uy': 236,
  'sw-ke': 240,
  'sv-fi': 242,
  'sv-se': 244,
  'syr-sy': 246,
  'tl-ph': 267,
  'ta-in': 248,
  'tt-ru': 250,
  'te-in': 252,
  'th-th': 254,
  'tr-tr': 256,
  'uk-ua': 258,
  'ur-pk': 260,
  'cy-uz-uz': 262,
  'lt-uz-uz': 264,
  'vi-vn': 266
};

exports.LANG_CODES = LANG_CODES;