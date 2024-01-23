export default function StringBuilder(templateString: string, obj: []) {
  let s = templateString;

  for (const prop in obj) {
    s = s.replace(new RegExp("{" + prop + "}"), obj[prop]);
  }

  return s;
}
