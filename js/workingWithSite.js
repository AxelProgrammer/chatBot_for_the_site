document.getElementById('sendBTN').addEventListener('click', function () {
    setTimeout(function () {
        document.getElementById('message').value = '';
    }, 1000);
});
function checkKey(e) {
    e = e || window.event;
    if (e.keyCode === 13) { // Если нажата клавиша Enter
        document.getElementById('sendBTN').click();
    }
}

document.getElementById('message').addEventListener('keydown', checkKey);

// Добавляем обработчик события click к кнопке
var chatMessages = [];

document.getElementById('sendBTN').addEventListener('click', function () {
    var message = document.getElementById('message').value;

    chatMessages.push(message);

    setTimeout(function () {
        // Очистите значение textarea 
        document.getElementById('message').value = '';
    }, 1000);
});