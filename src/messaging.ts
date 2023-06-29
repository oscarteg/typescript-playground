// Here follows the payload specification:
// | Offset    | Description                                                                                                        |
// |-----------|--------------------------------------------------------------------------------------------------------------------|
// | 0 (INT32) | latitude. 32 bit, signed, LSb = 0.000'000'1°. First calculate the signed integer value, then divide by 10.000.000  |
// | 4 (INT32) | longitude. 32 bit, signed, LSb = 0.000'000'1°. First calculate the signed integer value, then divide by 10.000.000 |
// | 8.0       | inTrip. 0: false, 1: true                                                                                          |
// | 8.1       | fixFailed. 0: false, 1: true                                                                                       |
// | 8.2 - 8.7 | heading. LSb = 5.625°                                                                                              |
// | 9 (BYTE)  | speed. LSb = 1 km/h                                                                                                |
// | 10 (BYTE) | batteryVoltage. LSb = 25 mV                                                                                        |
//
// All data in the payloads is little endian.

type Payload = {
  latitude: number;
  longitude: number;
  inTrip: boolean;
  fixFailed: boolean;
  heading: number;
  speed: number;
  batteryVoltage: number;
};

function decode(s: string): Payload {
  const buffer = Buffer.from(s, "hex");
  console.log(buffer);

  // 32 bit signed int
  const latitude = buffer.readInt32LE(0) / 10000000;

  // 32 bit signed int
  const longitude = buffer.readInt32LE(4) / 10000000;

  // 1 byte, offset 8, mask with 0b00000001 to get the first bit, cast to boolean
  const inTrip = Boolean(buffer.readUInt8(8) & 0b00000001);
  // 1 byte, offset 8, mask with 0b00000010 to get the second bit, cast to boolean
  const fixFailed = Boolean(buffer.readUInt8(8) & 0b00000010);
  // 1 byte, offset 8, shift 2 bits to the right to get the rest of the bits, cast to number
  const heading = buffer.readUInt8(8) >> 2;

  const speed = buffer.readUInt8(9);

  const batteryVoltage = buffer.readUInt8(10) / 40;

  return {
    latitude,
    longitude,
    inTrip,
    fixFailed,
    heading,
    speed,
    batteryVoltage,
  };
}

// {
//   latitude: 52.3190164,
//   longitude: 4.7733853,
//   inTrip: false,
//   fixFailed: true,
//   heading: 0,
//   speed: 0,
//   batteryVoltage: 5.225
// }

console.log(decode("943f2f1f5d5cd8020200d1"));
console.log(decode(`32ea6e2022def602312fc2`));
// ```javascript
// {
//   latitude: 54.4139826,
//   longitude: 4.9733154,
//   inTrip: true,
//   fixFailed: false,
//   heading: 67.5,
//   speed: 47,
//   batteryVoltage: 4.85
// }

export {};
