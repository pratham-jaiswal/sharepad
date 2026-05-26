const encoder = new TextEncoder();
const decoder = new TextDecoder();

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function deriveKey(password, saltBytes, iterations = 600000) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptMarkdownWithPassword(
  password,
  markdown,
  existingSaltBase64 = null,
) {
  const saltBytes = existingSaltBase64
    ? base64ToBytes(existingSaltBase64)
    : crypto.getRandomValues(new Uint8Array(16));

  const ivBytes = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, saltBytes, 600000);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    encoder.encode(markdown),
  );

  return {
    version: 1,
    kdf: {
      hash: "SHA-256",
      iterations: 600000,
    },
    salt: bytesToBase64(saltBytes),
    iv: bytesToBase64(ivBytes),
    ciphertext: bytesToBase64(new Uint8Array(encrypted)),
  };
}

export async function decryptMarkdownWithPassword(password, encryptedPayload) {
  if (!encryptedPayload?.ciphertext) return "";

  const saltBytes = base64ToBytes(encryptedPayload.salt);
  const ivBytes = base64ToBytes(encryptedPayload.iv);
  const ciphertextBytes = base64ToBytes(encryptedPayload.ciphertext);
  const iterations = encryptedPayload?.kdf?.iterations || 600000;
  const key = await deriveKey(password, saltBytes, iterations);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    ciphertextBytes,
  );

  return decoder.decode(decrypted);
}
