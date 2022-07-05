function swap16(val: number) {
  return ((val & 0xFF) << 8) | ((val >> 8) & 0xFF);
}

function swap32(val: number) {
  return ((val & 0xFF) << 24) |
    ((val & 0xFF00) << 8) |
    ((val >> 8) & 0xFF00) |
    ((val >> 24) & 0xFF);
}

function hex2bin(hex: string) {
  return parseInt(hex, 16).toString(2).padStart(8, "0");
}

const hex_string = "21 23 00 6A D0 0F 69 4C E1 20".replace(/\s/gm, "");

const bin = hex2bin(hex_string);

// console.log(new Uint8Array(bin));

console.log(swap16(bin));

let xhr = new XMLHttpRequest();
xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);

//Send the proper header information along with the request
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function() { // Call a function when the state changes.
  if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
    // Request finished. Do processing here.
  }
};
xhr.send("foo=bar&lorem=ipsum");
// xhr.send(new Int8Array());
// xhr.send(document);
