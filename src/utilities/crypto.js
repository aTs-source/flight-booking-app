// utils/crypto.js
import CryptoJS from "crypto-js";
import SecretKey from "@/constants/secret-key";

export const decryptData = async (encryptedData) => {
  try {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, SecretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};

export const encryptData = async (data) => {
  try {
    const encryptedData = CryptoJS.AES.encrypt(data, SecretKey).toString();
    return encryptedData;
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};
