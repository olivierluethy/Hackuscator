# Hackuscation
Nowadays, there's JavaScript code that you want to hide and modify so that it's unreadable. But if you obfuscate your code in the traditional way, you can easily deobfuscate it and still be able to read the original code. That's why this project is designed not only to obfuscate the code, but also to put a salt on it, so that even if you tried to deobfuscate it, you wouldn't get the original code, because you need the salt to get to the original.

This project is about building a foundation for the mechanism. For security reasons, the salt key is generated directly for you as a very long string. It uses an algorithm that is unknown to websites that can crack it.

The salt is stored in a .txt file, so if you copy it and forget it or can't remember it, it has a safety feature. At the same time, inside the .txt file, there will be a function to automatically decode it's value so that it displays the real javascript code.

> But make sure that the salt isn't in your project, but in an .env file and you get it from there.

## Why this project?
Das Problem ist, dass der Browser manchmal zu viele Daten über die Webseite ausgibt bzw. im Bereich von JavaScript. Im Hintergrund kann dieser nämlich eingelesen werden und so könnte man nach Sicherheitslücken suchen und diese auch eventuell auslesen.
Das soll das Problem lösen, indem zwar das JavaScript im Hintergrund wie erwartet läuft, aber man den Code nicht einlesen kann. Dafür bräuchte man den Salt-Wert.

Diese Lösung kann allerdings nicht nur dafür verwendet werden um den Code zu verschleiern, sondern auch um zukünftig Kunden Projekte die vorerst unbezahlt sind zu geben und den Schlüssel in einem .env File zu speichern sodass wenn der Kunde nicht für den Code bezahlt, aber dennoch Anpassungen selbst vortführen möchte, muss er dich bezahlen um den Salt-Wert zu bekommen um am Ende den Base64-Code extrahieren zu können in lesbaren JavaScript code.