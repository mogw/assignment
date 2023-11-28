import * as crypto from 'crypto';

require('dotenv').config();

function stringTo16ByteIV(str) {
    // Create a buffer from the string
    let buffer = Buffer.from(str);

    // Ensure the buffer is 16 bytes. 
    // If it's shorter, pad it. If it's longer, truncate it.
    if (buffer.length < 16) {
        buffer = Buffer.concat([buffer, Buffer.alloc(16 - buffer.length)]);
    } else if (buffer.length > 16) {
        buffer = buffer.subarray(0, 16);
    }

    return buffer;
}

// Encryption function
function encrypt(text, password) {
    // Create an initialization vector
    const iv = stringTo16ByteIV(process.env.SECRET_KEY)

    // Create a Cipher
    const cipher = crypto.createCipheriv('aes-256-cbc', crypto.scryptSync(password, 'salt', 32), iv);

    // Encrypt the text
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted;
}

// Decryption function
function decrypt(encrypted, password) {
    // Extract the IV from the encrypted object
    // const iv = Buffer.from(encryptedObj.iv, 'hex');
    const iv = stringTo16ByteIV(process.env.SECRET_KEY)

    // Create a Decipher
    const decipher = crypto.createDecipheriv('aes-256-cbc', crypto.scryptSync(password, 'salt', 32), iv);

    // Decrypt the text
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

function hashEncryptKey(encryptedKey, salt) {
    return crypto.pbkdf2Sync(encryptedKey, salt, 1000, 64, 'sha512').toString('hex');;
}

export {
    stringTo16ByteIV,
    encrypt,
    decrypt,
    hashEncryptKey
}