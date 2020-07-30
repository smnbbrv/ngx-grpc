const STRING_DASHERIZE_REGEXP = (/[ _]/g);
const STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
const STRING_CAMELIZE_REGEXP = (/(-|_|\.|\s)+(.)?/g);
const STRING_UNDERSCORE_REGEXP_1 = (/([a-z\d])([A-Z]+)/g);
const STRING_UNDERSCORE_REGEXP_2 = (/-|\s+/g);

export function decamelize(str: string) {
  return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.substr(1);
}

export function dasherize(str: string) {
  return decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
}

export function camelize(str: string) {
  if (str.toUpperCase() === str) {
    str = str.toLowerCase();
  }

  return str
    .replace(STRING_CAMELIZE_REGEXP, (match, separator, chr) => {
      return chr ? chr.toUpperCase() : '';
    }).replace(/^([A-Z])/, (match) => match.toLowerCase());
}

export function classify(str: string) {
  return str.split('.').map(part => capitalize(camelize(part))).join('.');
}

export function underscore(str: string) {
  return str
    .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
    .replace(STRING_UNDERSCORE_REGEXP_2, '_')
    .toLowerCase();
}

export function pascalize(str: string) {
  return str
    .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
    .replace(STRING_UNDERSCORE_REGEXP_2, '_')
    .toUpperCase();
}

export function preserveCaseSafe(name: string) {
  return ['default', 'var', 'let', 'const', 'function', 'class'].includes(name) ? 'pb_' + name : name;
}

export function camelizeSafe(name: string) {
  const escaped = ['default', 'var', 'let', 'const', 'function', 'class'].includes(name) ? 'pb_' + name : name;

  return camelize(escaped);
}
