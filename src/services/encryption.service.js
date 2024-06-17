import CryptoJS from 'crypto-js';

const secretKey = 'pushIdKamkorAppV1-secret1-key1';

export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export function decryptData(data) {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}