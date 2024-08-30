// Generiert mit Hilfe von ChatGPT: https://chatgpt.com/c/14394606-031d-4344-93bf-082b137d49cd

// TODO: Funktion erweitern sodass der generierte Zeichenstring sehr lang wird
// TODO: Eine Webseite daraus machen wo man mittels dem Salt den gesamten JavaScript zurückkonvertieren kann
// TODO: Eine Desktop applikation schreiben wo der Salt generiert wird und auch zeitgleich gespeichert wird sodass man diesen nicht so schnell vergisst
// TODO: Bei der Verschlüsselung am besten einen Algorithmus verwenden der nicht entdeckt werden kann
// TODO: Praxisprojekt machen in welchem ein Projekt zwar veröffentlich wird mittels obfuscation aber wiederum funktioniert weil der Salt versteckt beigefügt wird
// TODO: Auch noch so abändern sodass es vom JavaScript editor akzeptierbar und lesbar ist
// TODO: Dieses Tool kann auch für Kunden sein die es testen wollen, dass Tool lokal bei sich laufen lassen aber nicht einlesen können da es schiffriert ist
// TODO: Ab einem gewissen Punkt macht es nur Sinn bei Sachen die im Browser in der Konsole angezeigt werden. PHP Code lässt sich ja schliesslich nicht einlesen da er im Server verankert ist.
// TODO: Cool wäre wenn man einen Projekt ordner im Tool anwählen kann und dieser dann automatisch den Code schiffriert, oder zurückschiffriert je nach dem um den Prozess massiv zu beschläunigen sodass es nicht zu mühsam für Kunden wird.

const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 12 stelliger Salt-Wert wird automatisch generiert
const salt = Math.random().toString(36).substr(2, 12);

function xorEncryptDecrypt(data, salt) {
  return data
    .split("")
    .map((char, index) => {
      return String.fromCharCode(
        char.charCodeAt(0) ^ salt.charCodeAt(index % salt.length)
      );
    })
    .join("");
}

function obfuscateCode(inputCode) {
  const obfuscatedCode = xorEncryptDecrypt(inputCode, salt);
  // Base64-Encoder
  const base64Code = Buffer.from(obfuscatedCode).toString("base64");
  return {
    base64Code,
    completeCode: `
// Der Salt-Wert (muss geheim gehalten werden)
var salt = '${salt}';

// Verschlüsselter Base64-Code (verschlüsselter und codierter JavaScript-Code)
var obfuscatedCode = '${base64Code}';

// XOR-Decryption Funktion mit Base64-Decoding
function xorEncryptDecrypt(data, salt) {
    return data.split('').map((char, index) => {
        return String.fromCharCode(char.charCodeAt(0) ^ salt.charCodeAt(index % salt.length));
    }).join('');
}

function executeDecryptedCode(encodedCode, salt) {
    // Base64-Decode
    var decodedString = atob(encodedCode);
    // XOR-Decryption
    var decryptedCode = xorEncryptDecrypt(decodedString, salt);
    // Dynamische Ausführung des entschlüsselten JavaScript-Codes
    eval(decryptedCode);
}

// Ausführen des entschlüsselten Codes
executeDecryptedCode(obfuscatedCode, salt);
`,
  };
}

function decrypt(base64Data, salt) {
  // Base64-Decoder
  const obfuscatedCode = Buffer.from(base64Data, "base64").toString();
  return xorEncryptDecrypt(obfuscatedCode, salt);
}

// Funktion zum Auswählen von Obfuskation oder Deobfuskation
rl.question("Möchtest du obfuscate (1) oder deobfuscate (2)?: ", (choice) => {
  if (choice === "1") {
    rl.question("Gib deinen JavaScript-Code ein: ", (inputCode) => {
      const { base64Code, completeCode } = obfuscateCode(inputCode);
      fs.writeFile(
        "salt.txt",
  `// Obfuscated-Code: "${base64Code}"
// Salt-Wert: "${salt}"
// Diesen Code können Sie ins Frontend hinzufügen:
// -------------------------------------------
${completeCode}`,
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log("Salt-Datei erstellt!");
          }
        }
      );
      rl.close();
    });
  } else if (choice === "2") {
    rl.question("Gib den obfuskierten Base64-Code ein: ", (inputCode) => {
      rl.question("Gib den Salt-Wert ein: ", (salt) => {
        const deobfuscatedCode = decrypt(inputCode, salt);
        console.log("\nDeobfuscated code:\n");
        console.log(deobfuscatedCode);
        rl.close();
      });
    });
  } else {
    console.log("Ungültige Auswahl.");
    rl.close();
  }
});
