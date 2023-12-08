const crypto = require('crypto');

function formatPemKey(pemKey) {
    return pemKey
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----", "")
        .replace(/\s/g, "");
}

async function importPublicKey(pemKey) {
    try {
        const formattedKey = formatPemKey(pemKey);

        const binaryKey = atob(formattedKey);
        const keyBytes = new Uint8Array(binaryKey.length);

        for (let i = 0; i < binaryKey.length; i++) {
            keyBytes[i] = binaryKey.charCodeAt(i);
        }

        const cryptoKey = await crypto.subtle.importKey(
            "spki",
            keyBytes,
            { name: "RSA-OAEP", hash: { name: "SHA-256" } },
            false,
            ["encrypt"]
        );
        return cryptoKey;
    } catch (error) {
        console.error("Public key import error:", error);
    }
}

async function encryptWithPublicKey(message, publicKey) {
    try {

        const encoder = new TextEncoder();

        const dataBuffer = encoder.encode(message);

        const cryptoKey = await importPublicKey(publicKey);

        const encryptedBuffer = await crypto.subtle.encrypt(
            { name: "RSA-OAEP" },
            cryptoKey,
            dataBuffer
        );

        const encryptedData = btoa(
            String.fromCharCode.apply(null, new Uint8Array(encryptedBuffer))
        );

        return encryptedData

        // console.log(encryptedBuffer, "encryptedBuffer")
    } catch (error) {
        console.log(error)
    }
}


const publicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAmcjY9Y59h3mRtMN2n/vh
DfO7/0aadPPSvXSc+pJUq23Kc96AQUTApv+wfoQmAByyWmX3SQ2gWK5goxaRYlCK
XSjgGUfPbt2oAZ8AnKDOjG4qti+gJl647rVHcfgQQ3ehErK6hLasHvahtlOkfkCh
aS6XHzpjdUoQ28EiyiTe8C3MtGPojoQSorxpls9/ogrPdf7mFKO5uFKxCijjv0kY
Duj/UFkvQj3QITAwOSIqgxNt197KHM+MeDOdfzbVkjoshWVgQKxYGrh6V9GSegdC
iNPHJ86WZc6hNp1WvCP/zSjyYhrvGQaoOAVo2Yu0b8bbpKfWZ+P2J09Yz1U6JlLW
/QIDAQAB
-----END PUBLIC KEY-----
`


const message = "namanya siapa dia"

encryptWithPublicKey(message, publicKey)
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })