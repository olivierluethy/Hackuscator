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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Fester Salt-Wert
const salt = "Lustig";

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
  return `var salt = '${salt}';\nvar obfuscatedCode = '${base64Code}';\nconsole.log(Buffer.from(obfuscatedCode, 'base64').toString().split('').map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ salt.charCodeAt(index % salt.length))).join(''));`;
}

function decrypt(base64Data) {
  // Base64-Decoder
  const obfuscatedCode = Buffer.from(base64Data, "base64").toString();
  return xorEncryptDecrypt(obfuscatedCode, salt);
}

// Funktion zum Auswählen von Obfuskation oder Deobfuskation
rl.question("Möchtest du obfuscate (1) oder deobfuscate (2)?: ", (choice) => {
  if (choice === "1") {
    rl.question("Gib deinen JavaScript-Code ein: ", (inputCode) => {
      const obfuscatedCode = obfuscateCode(inputCode);
      console.log("\nObfuscated code:\n");
      console.log(obfuscatedCode);
      rl.close();
    });
  } else if (choice === "2") {
    rl.question("Gib den obfuskierten Base64-Code ein: ", (inputCode) => {
      const deobfuscatedCode = decrypt(inputCode);
      console.log("\nDeobfuscated code:\n");
      console.log(deobfuscatedCode);
      rl.close();
    });
  } else {
    console.log("Ungültige Auswahl.");
    rl.close();
  }
});
