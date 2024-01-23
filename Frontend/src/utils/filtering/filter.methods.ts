function sort_by_key(array: any[], key: string | number) {
  return array.sort(function (
    a: { [x: string]: any },
    b: { [x: string]: any }
  ) {
    const x = a[key];
    const y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
