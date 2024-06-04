<?php
?>
<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shurtcut icon" href="https://study.muctr.ru/theme/image.php/boost/theme/1715604892/favicon">
    <title>ChatBotNova</title>
    <link rel="stylesheet" href="./css/style.css">
</head>

<body>
    <div class="chatBot">
        <header>
            <h2>ChatBotNova</h2>
            <span alt="Close" id="cross" onclick="cancel()">X</span>
        </header>
        <ul class="chatbox">
            <li class="chat-incoming chat">
                <p>Привет, я голосовой помощник Nova, чем я могу вам помочь?</p>
            </li>
        </ul>
        <div class="chat-input">
            <textarea id="message" rows="0" cols="17" placeholder="Enter a message..."></textarea>
            <button id="sendBTN">Send</button>
            <button id="voiceInputBtn">Vois</button>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/dotenv@10.0.0/dist/dotenv.js"></script>
    <script src="./js/script.js" defer></script>
    <script src="./js/voiceInput.js" defer></script>
    <script src="./js/workingWithSite.js" defer></script>
</body>

</html>