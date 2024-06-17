import { encryptData, decryptData } from './encryption.service';

export function setItem(key, value) {
  const encryptedValue = encryptData(value);
  localStorage.setItem(key, encryptedValue);
}

export function getItem(key) {
  const encryptedValue = localStorage.getItem(key);
  if (!encryptedValue) {
    return null;
  }
  return decryptData(encryptedValue);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}