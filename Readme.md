# Code Hackuscation
Nowadays, there's JavaScript code that you want to hide and modify so that it's unreadable. But if you obfuscate your code in the traditional way, you can easily deobfuscate it and still be able to read the original code. That's why this project is designed not only to obfuscate the code, but also to put a salt on it, so that even if you tried to deobfuscate it, you wouldn't get the original code, because you need the salt to get to the original.

This project is about building a foundation for the mechanism. For security reasons, the salt key is generated directly for you as a very long string. It uses an algorithm that is unknown to websites that can crack it.

The salt is stored in a .txt file, so if you copy it and forget it or can't remember it, it has a safety feature. At the same time, inside the .txt file, there will be a function to automatically decode it's value so that it displays the real javascript code.

> But make sure that the salt isn't in your project, but in an .env file and you get it from there.