const crypto = require('crypto');


function formatPemKey(pemKey) {
    return pemKey
        .replace("-----BEGIN PRIVATE KEY-----", "")
        .replace("-----END PRIVATE KEY-----", "")
        .replace(/\s/g, "");
}

async function decryptWithPrivateKey(encryptedData, privateKey_) {
    try {
        const formatKey = formatPemKey(privateKey_);

        const binaryKey = atob(formatKey);

        const keyBytes = new Uint8Array(binaryKey.length);

        for (let i = 0; i < binaryKey.length; i++) {
            keyBytes[i] = binaryKey.charCodeAt(i);
        }

        const encryptedBuffer = new Uint8Array(
            atob(encryptedData)
                .split("")
                .map((char) => char.charCodeAt(0))
        );

        const cryptoKey = await crypto.subtle.importKey(
            "pkcs8",
            keyBytes,
            { name: "RSA-OAEP", hash: { name: "SHA-256" } },
            false,
            ["decrypt"]
        );

        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: "RSA-OAEP" },
            cryptoKey,
            encryptedBuffer
        );

        const decryptedData = new TextDecoder().decode(decryptedBuffer);

        return decryptedData

        // console.log(encryptedBuffer, "encryptedBuffer")
    } catch (error) {
        console.log(error)
    }
}


const privateKey = `
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNw3zLwybUFatU
KHZrCVKlvu7absUiMBYj2Zdb723HRHzBUD3+yswjPKwcpNSHnssxe1ibgefKfgdl
v6UW+3EC+KvJtMpmCTWAH3wt4LAG4p+LDjy8qdb8ZpgSnpjgMoo86Pfgbjk7qpZb
f43G/F06W+IfvTsP0TqlyhENyo7qU9HGOlcVqicggnyRtL57OLZWCxFjBQ4ySFab
X4MXj0/6rf7t+RNFTWP5DMHtW3FJuO5nU0S0vHRVpUKhW7U1MZjzAE16+uXTaE4T
LANSvPf5bUCHuVyr0NX3mUKKEekrIuoLbkrUULCpYpjSdFzxb5u0hk5F3SGeP74b
EkhNQfq9AgMBAAECggEAAgH/1D8twFEL0HDqouW+5DYmP4RoMQq2FJh5dSCzegfN
jddaG4PgFRHw/gCPwFkI041IEpBkciHjsZb6pexDMIu7pWa5uOArIPptrEbugMqy
UtmLNy4TFnhr0HayuDFWDv0Y+hwpO89Q00i92ey5finKXZProR5iC58apn9NALVX
LXX2y3nvZMK2l73rVOvNTVjuj+EmcWNk0ak4a7lxVzwOsMsYu8yil2ui4AHkYGgF
MbKAW+y1lT9AoJTPeRMrWToiQIk4TTD39G7CdI74/A7xj962x6rbAGHsaSw9pjl6
uBAjp57ZzUiZsF2Kj8uOG8HDZ6Xz8riZNsJxT2e7MwKBgQD8Hor39Aat4LUBgxp4
3okTSSEBiHpHlEKB9hzw/77ahPx1wXnIDZzmYi+1hR+V8KTk2xGAF8tURoYz286Z
8GjFmVZTKu3pRJTWVZEoYSXFLBzxDHIhN8yJwWkS9G+ojMaAWqzIo44nIY/+sA1o
ZBJre2ZkdZhhTYKNU8VTXeHmxwKBgQDQ7kiWzHrk2uGOFwEfcjMM35XVFU2ZXdaC
wneUUR0Xty920bYgOb5YVoWpePCk/HJ4jC261cJJG8wLCQdhXow1d+UIQXNU3Mdm
Xdgl4AF218AmUu+0Mek1f6z3TVEPZN1WDuLY9E96dwx1Ub9A4JUSEyVz9PQ/8gvg
xdY8c6l+WwKBgFX54HAwEnsHLxLF76gaU2p1PME2FmUEhS2mjTYOMLp6MVHC2dHD
+qaCAz0Gmb/bIZA9uJkTBC7IIgnbQngyiLgh01NnR1yOG6d/5JF9l5DGu1PkZ6M2
URUFFNz26ID1CNhKk7OUOuzTQDSdOuVHgxSOL1vA0mcUNJoXYCpO0LOPAoGAbV+Q
WIELBKsg0MVyLQgXeXHCeh4A1XyuQx2Sg+5CkJuxGT6HXS9dWdlRd3p8X6JYOosH
lXs5jhQjKNO9LVfVhlgRadT5jz9Uk14lPQ6bNZ+UU3uvSGGod/0yivPKr4hZ5ic8
0d5zjOStfO0iddAbua6UOLPO+Xq4hR6MHHFgFWkCgYEAii1tvkCiP9e6q9+wAw4U
c5sA246YbYrKOrhsLxUsY+Q7N51fqNnt5vKKbVZhy+NytaXuRYGJdjpxdA0ISPLa
dU/hGlZwB2aPxcBKKDpJqOaUpkHDnUWyZoPXy6mshbaCRK3ATitAdDC40CK8bCrF
RVYoFdr1NZyQghoIdvT4oJ0=
-----END PRIVATE KEY-----
`
const encryptedData = `SJrcI3ykqF+1KLcVTToZUf8m3z5xwH2n6Dnx0ytRqtkmr0aFtQ208JIJ0w3ByXlVBXhOQTGG7IzUVh882W8nyh7+2JFYCgYsIDnRriz/aIu9OYTJO2C6VtjEXnI2jW+tu2E3kt61CrLZlqrtInEmiLYRFHun0dj+UQseI8IVWYcBjki6maq+G//0tpXzgyEa0p4ijCIFBZXH21lFjstblD/8HG3lbbhEsGIsQ3IvxBT47mUuuSO2/LWYf/J9XqkJtSwX17XxUOxf7gidpv8tFnIajgFH6A3EapTSMdLFP9msvgHQseLwi6TOXzcJLYGLX2+ovjKR4Nb04TCYwURB9A==`

decryptWithPrivateKey(encryptedData, privateKey)
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })