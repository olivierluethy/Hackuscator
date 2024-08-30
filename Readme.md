# Hackuscation
Nowadays, there's JavaScript code that you want to hide and modify so that it's unreadable. But if you obfuscate your code in the traditional way, you can easily deobfuscate it and still be able to read the original code. That's why this project is designed not only to obfuscate the code, but also to put a salt on it, so that even if you tried to deobfuscate it, you wouldn't get the original code, because you need the salt to get to the original.

This project is about building a foundation for the mechanism. For security reasons, the salt key is generated directly for you as a very long string. It uses an algorithm that is unknown to websites that can crack it.

The salt is stored in a .txt file, so if you copy it and forget it or can't remember it, it has a safety feature. At the same time, inside the .txt file, there will be a function to automatically decode it's value so that it displays the real javascript code.

> But make sure that the salt isn't in your project, but in an .env file and you get it from there.

## Why this project?
Das Problem ist, dass der Browser manchmal zu viele Daten über die Webseite bzw. im Bereich von JavaScript ausgibt. Dieser kann nämlich im Hintergrund ausgelesen werden und so könnte nach Sicherheitslücken gesucht und diese eventuell ausgelesen werden.
Dieses Problem soll dadurch gelöst werden, dass das JavaScript zwar wie erwartet im Hintergrund ausgeführt wird, der Code aber nicht ausgelesen werden kann. Dazu bräuchte man den Salt-Wert.

Diese Lösung kann aber nicht nur dazu verwendet werden, um den Code zu verschleiern, sondern auch um in Zukunft Kunden Projekte zu geben, die vorerst unbezahlt sind und den Schlüssel in einer .env Datei zu speichern, so dass wenn der Kunde nicht für den Code bezahlt, aber trotzdem selbst Anpassungen vornehmen möchte, er dich bezahlen muss, um den Salt-Wert zu bekommen, um am Ende den Base64-Code in lesbaren JavaScript Code extrahieren zu können.

## Die Vision
Die Vision wäre, ein Werkzeug zu haben, um in Zukunft dem Kunden etwas zur Verfügung stellen zu können und ihn dann, wenn er etwas anderes haben möchte, dazu zu verpflichten, dafür zu bezahlen.
In Zukunft wird es auch so sein, dass Codes zwar laufen, aber wenn man will auch geheim gehalten werden können, indem man nicht den ganzen Code zur Verfügung stellt. Sprich ein bisschen Code der aber nicht verändert werden kann und wenn man will braucht man den Saltwert.

Das soll einfach gewährleistet werden indem man eine ganze Datei auf eine Webseite hochladen kann und dann wird ein Base64 Code und ein Salt generiert mit dem man die ganze Datei wiederherstellen kann.
Auch wenn man nur einen kleinen Teil des Codes verschlüsseln will, funktioniert es trotzdem.

## Protokolltabelle

| Datum       | Ereignis / Aufgabe    | Verantwortlicher | Status      | Anmerkungen                |
|-------------|------------------------|------------------|-------------|----------------------------|
| 2024-08-29  | Kick-off        | Olivier Lüthy    | Abgeschlossen | Einfaches Programm, bei dem die einfache Eingabe verschlüsselt und dann mit Obfuscated base64 und Salt zurückgegeben wird und dies auch mit Salt etc. umkehrbar ist. Später wird ein einfaches Txt file generiert mit allen Keys und entsprechenden Verwendungsinformationen.Eingabe wird verschlüsselt aber nur für kleine Codes. Zum neuen Zeitpunkt konnte es am Ende doch noch generiert werden. Txt file wird vorerst einfach überschrieben. |
| 2024-08-30  | Start Grundkonzept und kleinem Mini Script für Ablauf    | Olivier Lüthy      | Abgeschlossen | Konzeption des Projekts, um zu sehen, ob es überhaupt machbar ist; Erstellung eines Konzeptionsdiagramms; Vollständige Eingabeparametrisierung funktioniert nicht richtig, da nach großen Dateien direkt mehrere Textdateien auf einmal generiert werden. |
| 2024-08-30  | Architekturentwurf     | Peter Müller      | In Bearbeitung | Entwurf in Überprüfung     |

## How to run
Zuerst dachte ich daran, dies über ein einfaches JavaScript-Skript in der Konsole mit Node.js zu machen. Das ist aber sehr umständlich und überhaupt nicht benutzerfreundlich, geschweige denn praktisch. Man versteht nicht sofort, was man wie eingeben muss und kann daher für andere sehr umständlich sein.

Der Fehler, dass require nicht definiert ist, tritt häufig auf, wenn man versucht, Node.js-Code in einer Umgebung wie dem Browser auszuführen, die require nicht unterstützt. require ist eine Funktion, die in Node.js verwendet wird, um Module zu laden, aber in Standard-Browserumgebungen nicht verfügbar ist.

Daher ist es ohne Frameworks nicht möglich. Aus diesem Grund entwickle ich es so, dass es sauber mit Frameworks funktioniert, da diese require für die Node.js-Umgebung unterstützen.

> Daher ist die Lösung derzeit nur für Frameworks geeignet.