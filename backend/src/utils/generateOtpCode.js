import { otp } from 'otplib'

export function generateOtpCode () {
    otp.options = { digits: 6, step: 30 };
    const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'; // Shared secret
    const token = otp.generate(secret);
    console.log(token); // e.g., 928173

}