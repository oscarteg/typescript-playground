import {
  decode as hd,
  encode as he,
} from "https://deno.land/std/encoding/hex.ts";

function swap16(val: number) {
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
}

function _swap32(val: number) {
  return (
    ((val & 0xff) << 24) |
    ((val & 0xff00) << 8) |
    ((val >> 8) & 0xff00) |
    ((val >> 24) & 0xff)
  );
}

function byteToHexString(uInt8Array: Uint8Array) {
  let str = "";
  for (let index = 0; index < uInt8Array.length; index++) {
    let hex = (uInt8Array[index] & 0xff).toString(16);
    hex = hex.length === 1 ? "0" + hex : hex;
    str += hex;
  }

  return str.toUpperCase();
}

function hexStringToByte(str: string) {
  if (!str) {
    return new Uint8Array();
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}

function hex2bin(hex: string) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}

const hex_string = "21 23 00 6A D0 0F 69 4C E1 20".replace(/\s/gm, "");

const hex2 = 0xaabb;

const bin = hexStringToByte(hex_string);

console.log(hex2 & 0xff);
console.log(bin);
