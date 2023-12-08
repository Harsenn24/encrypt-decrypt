const crypto = require('crypto');
const fs = require('fs');
const privateKey = fs.readFileSync("./private.pem")
const publicKey = fs.readFileSync("./public.pem")

// console.log(privateKey)


// Generate a pair of public and private keys (usually done once)
// const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
//     modulusLength: 2048,
//     publicKeyEncoding: {
//         type: 'spki',
//         format: 'pem',
//     },
//     privateKeyEncoding: {
//         type: 'pkcs8',
//         format: 'pem',
//     },
// });

// // Save the keys to files (optional, can be done once and reused)
// fs.writeFileSync('public.pem', publicKey);
// fs.writeFileSync('private.pem', privateKey);

function encryptWithPublicKey(data, publicKey) {
    const bufferData = Buffer.from(data, 'utf8');
    const encryptedData = crypto.publicEncrypt(publicKey, bufferData);
    return encryptedData.toString('base64');
}

function decryptWithPrivateKey(encryptedData, privateKey) {
    const bufferEncryptedData = Buffer.from(encryptedData, 'base64');
    const decryptedData = crypto.privateDecrypt(privateKey, bufferEncryptedData);
    return decryptedData.toString('utf8');
}


const originalData = `hello`;
console.log('Original Data:', originalData);

// const encryptedData = encryptWithPublicKey(originalData, publicKey);
// console.log('Encrypted Data:', encryptedData);

const encryptedData = `Jis6fOR2mKob22FwCwSmvDI0OjP6g0mECF3z/V5T2EeflBccxyYHGcNg1+/YujfpVOWY4CtIkZXPwLK8LtREONNFpUhP2MvboBpKPfmjYY9VM/e+jaYXcvzLKEMG/dqpXZMmsXpnscXXkLzlUKgtZJfuwI1DTXfgcJDViBB9AxIkjN31o4/NYmaRYgzklT9cyJkVgROsIJSZfwPhuIVVGWsUPLoEIX5il5n0WTUuG0nqr+hu9FHnFdD2Df0lFYqc37iDePuDNm0L7uIom+qb0N3MBbjes67ngcdcoZJ80quDf9wE6pYpUP6CdWRzdd71KJGhZaNotCDPpkfQLQbdLg==`;

const decryptedData = decryptWithPrivateKey(encryptedData, privateKey);
console.log('Decrypted Data:', decryptedData);




