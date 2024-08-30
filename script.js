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

// 12-stelliger Salt-Wert wird automatisch generiert
const salt = Math.random().toString(36).substr(2, 12);

// Funktion, um den Dateinamen zu generieren, wenn eine Datei bereits existiert
function generateUniqueFilename(baseName, extension) {
  let counter = 0;
  let filename = `${baseName}${extension}`;
  
  // Solange eine Datei mit dem aktuellen Namen existiert, erhöhe den Zähler
  while (fs.existsSync(filename)) {
    counter += 1;
    filename = `${baseName}${counter}${extension}`;
  }
  
  return filename;
}

// Generiere einen eindeutigen Dateinamen
const uniqueFilename = generateUniqueFilename('salt', '.txt');

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
fetch('/getSalt')  // Der Endpunkt, der den Salt-Wert zurückgibt
    .then(response => response.text())
    .then(salt => {
        var obfuscatedCode = '${base64Code}';

        function xorEncryptDecrypt(data, salt) {
            return data.split('').map((char, index) => {
                return String.fromCharCode(char.charCodeAt(0) ^ salt.charCodeAt(index % salt.length));
            }).join('');
        }

        function executeDecryptedCode(encodedCode, salt) {
            var decodedString = atob(encodedCode);
            console.log("Decoded Base64 String:", decodedString); // Debugging
            var decryptedCode = xorEncryptDecrypt(decodedString, salt);
            console.log("Decrypted Code:", decryptedCode); // Debugging
            eval(decryptedCode);
        }

        executeDecryptedCode(obfuscatedCode, salt);
    });
`,
  };
}

function decrypt(base64Data, salt) {
  // Base64-Decoder
  try {
    const obfuscatedCode = Buffer.from(base64Data, "base64").toString();
    console.log("Obfuscated Code (after Base64 Decoding):", obfuscatedCode); // Debugging
    return xorEncryptDecrypt(obfuscatedCode, salt);
  } catch (error) {
    console.error("Error during decryption:", error);
    return null;
  }
}

// Funktion zum Auswählen von Obfuskation oder Deobfuskation
rl.question("Möchtest du obfuscate (1) oder deobfuscate (2)?: ", (choice) => {
  if (choice === "1") {
    console.log("Füge deinen JavaScript-Code ein und drücke ENTER, wenn du fertig bist. (Drücke zweimal ENTER, um den Code zu beenden.)");

    // Mehrzeilige Eingabe für Code-Snippet
    let inputCode = '';
    rl.on('line', (line) => {
      if (line === '') {
        rl.removeAllListeners('line');  // Verhindert weiteres Erfassen von Zeilen
        const { base64Code, completeCode } = obfuscateCode(inputCode.trim());
        fs.writeFile(
          uniqueFilename,
          `// Obfuscated-Code: "${base64Code}"
// Salt-Wert: "${salt}"
// Diesen Code können Sie ins Frontend hinzufügen:
// -------------------------------------------
${completeCode}`,
          (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log(`Salt-Datei erstellt: ${uniqueFilename}`);
            }
            rl.close();
          }
        );
      } else {
        inputCode += line + '\n';
      }
    });

  } else if (choice === "2") {
    rl.question("Gib den obfuskierten Base64-Code ein: ", (inputCode) => {
      rl.question("Gib den Salt-Wert ein: ", (salt) => {
        try {
          const deobfuscatedCode = decrypt(inputCode, salt);
          if (deobfuscatedCode) {
            console.log("\nDeobfuscated code:\n");
            console.log(deobfuscatedCode);
          } else {
            console.error("Fehler beim Deobfuscieren des Codes.");
          }
        } catch (error) {
          console.error("Fehler beim Deobfuscieren:", error.message);
        }
        rl.close();
      });
    });
  } else {
    console.log("Ungültige Auswahl.");
    rl.close();
  }
});
