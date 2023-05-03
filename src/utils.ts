// exemplu concatenare,nu face nimic asupra codului

export function concatenare(str1: string, str2: string): string;
export function concatenare(str1: number, str2: number, cb: (v1: number, v2: number) => string): string;
export function concatenare(str1: string | number, str2: string | number, cb?: (v1: number, v2: number) => string) {
  if (cb && typeof str1 === "number" && typeof str2 === "number") {
    // ele sunt numere, fac operatii cu numere
    return cb(str1, str2);
  } else {
    return str1.toString() + str2.toString();
  }
}

concatenare("str1", "str2");
// concatenare(3, "str2");
concatenare(3, 3, (v1, v2) => {
  return v1.toString() + v2.toString() + "-withNumbers";
});
