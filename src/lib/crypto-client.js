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
    { name: "PBKDF2", salt: saltBytes, iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export async function createKeyMaterialFromPassword(
  password,
  existingSaltBase64 = null,
  iterations = 600000,
) {
  const saltBytes = existingSaltBase64
    ? base64ToBytes(existingSaltBase64)
    : crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(password, saltBytes, iterations);
  return {
    version: 1,
    kdf: { hash: "SHA-256", iterations },
    salt: bytesToBase64(saltBytes),
    key,
  };
}

export async function encryptMarkdownWithKeyMaterial(keyMaterial, markdown) {
  const ivBytes = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBytes },
    keyMaterial.key,
    encoder.encode(markdown),
  );

  return {
    version: 1,
    kdf: keyMaterial.kdf,
    salt: keyMaterial.salt,
    iv: bytesToBase64(ivBytes),
    ciphertext: bytesToBase64(new Uint8Array(encrypted)),
  };
}

export async function decryptMarkdownWithKeyMaterial(
  keyMaterial,
  encryptedPayload,
) {
  if (!encryptedPayload?.ciphertext) return "";
  const ivBytes = base64ToBytes(encryptedPayload.iv);
  const ciphertextBytes = base64ToBytes(encryptedPayload.ciphertext);

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    keyMaterial.key,
    ciphertextBytes,
  );

  return decoder.decode(decrypted);
}
