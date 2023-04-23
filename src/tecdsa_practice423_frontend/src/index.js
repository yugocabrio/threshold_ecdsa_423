import { tecdsa_practice423_backend } from "../../declarations/tecdsa_practice423_backend";

document.getElementById("getPublicKey").addEventListener("click", async (e) => {
  const publicKeyResult = await tecdsa_practice423_backend.public_key();
  if (publicKeyResult.Ok) {
    const publicKey = publicKeyResult.Ok.public_key_hex;
    document.getElementById("publicKey").innerText = `Public Key: ${publicKey}`;
  } else {
    console.error("Error getting public key:", publicKeyResult.Err);
  }
});

const signAndVerifyButton = document.getElementById("signAndVerify");
signAndVerifyButton.addEventListener("click", async (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const button = e.target;

  const message = document.getElementById("message").value.toString();

  button.setAttribute("disabled", true);

  // Reset result
  document.getElementById("signature").innerText = "Signature: ";
  document.getElementById("verification").innerText = "Result: ";

  // Sign the message
  const signatureResult = await tecdsa_practice423_backend.sign(message);
  if (signatureResult.Ok) {
    const signature = signatureResult.Ok.signature_hex;
    document.getElementById("signature").innerText = `Signature: ${signature}`;
  } else {
    console.error("Error signing message:", signatureResult.Err);
    button.removeAttribute("disabled");
    return false;
  }

  // Verify the signature
  const publicKey = document.getElementById("publicKey").innerText.split(" ")[2];
  const signature = document.getElementById("signature").innerText.split(" ")[1];
  const verificationResult = await tecdsa_practice423_backend.verify(
    signature,
    message,
    publicKey
  );
  if (verificationResult.Ok) {
    const isValid = verificationResult.Ok.is_signature_valid;
    document.getElementById("verification").innerText += `Signature is ${
      isValid ? "valid" : "invalid"
    }`;
  } else {
    console.error("Error verifying signature:", verificationResult.Err);
  }

  button.removeAttribute("disabled");
});
