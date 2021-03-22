import replace from 'lodash/replace';

export default function encodeFirebaseKey(value: string): string {
  let encodedValue = value;
  encodedValue = replace(encodedValue, /\./g, '%2E');
  encodedValue = replace(encodedValue, /\$/g, '%24');
  encodedValue = replace(encodedValue, /\[/g, '%5B');
  encodedValue = replace(encodedValue, /]/g, '%5D');
  encodedValue = replace(encodedValue, /#/g, '%23');
  encodedValue = replace(encodedValue, /\//g, '%2F');
  return encodedValue;
}
