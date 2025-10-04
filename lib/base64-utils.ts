/**
 * Utility functions for Base64 encoding and decoding
 */

/**
 * Encodes a string to Base64
 * @param text - The text to encode
 * @returns The Base64 encoded string
 */
export const encodeToBase64 = (text: string): string => {
  if (!text) {
    return "";
  }
  
  try {
    return btoa(text);
  } catch (error) {
    throw new Error("Failed to encode text to Base64");
  }
};

/**
 * Decodes a Base64 string to text
 * @param base64String - The Base64 string to decode
 * @returns The decoded text
 */
export const decodeFromBase64 = (base64String: string): string => {
  if (!base64String) {
    return "";
  }
  
  try {
    return atob(base64String);
  } catch (error) {
    throw new Error("Failed to decode Base64 string. Please check if the input is valid Base64.");
  }
};

/**
 * Encodes a string to URL-safe Base64
 * @param text - The text to encode
 * @returns The URL-safe Base64 encoded string
 */
export const encodeToUrlSafeBase64 = (text: string): string => {
  if (!text) {
    return "";
  }
  
  try {
    const base64 = btoa(text);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    throw new Error("Failed to encode text to URL-safe Base64");
  }
};

/**
 * Decodes a URL-safe Base64 string to text
 * @param urlSafeBase64 - The URL-safe Base64 string to decode
 * @returns The decoded text
 */
export const decodeFromUrlSafeBase64 = (urlSafeBase64: string): string => {
  if (!urlSafeBase64) {
    return "";
  }
  
  try {
    // Add padding if needed
    let base64 = urlSafeBase64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return atob(base64);
  } catch (error) {
    throw new Error("Failed to decode URL-safe Base64 string. Please check if the input is valid.");
  }
};

/**
 * Validates if a string is valid Base64
 * @param str - The string to validate
 * @returns True if the string is valid Base64, false otherwise
 */
export const isValidBase64 = (str: string): boolean => {
  if (!str) {
    return false;
  }
  
  try {
    // Check if the string matches Base64 pattern
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(str)) {
      return false;
    }
    
    // Try to decode it
    atob(str);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validates if a string is valid URL-safe Base64
 * @param str - The string to validate
 * @returns True if the string is valid URL-safe Base64, false otherwise
 */
export const isValidUrlSafeBase64 = (str: string): boolean => {
  if (!str) {
    return false;
  }
  
  try {
    // Check if the string matches URL-safe Base64 pattern
    const urlSafeBase64Regex = /^[A-Za-z0-9_-]*$/;
    if (!urlSafeBase64Regex.test(str)) {
      return false;
    }
    
    // Try to decode it
    decodeFromUrlSafeBase64(str);
    return true;
  } catch (error) {
    return false;
  }
};
