const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input button");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "";

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "chat-outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatLi.querySelector("p");

  var xhr = new XMLHttpRequest();

  var per_1 = false;
  var per_2 = false;
  let found;
  let type;
  let nonMatches = [];

  xhr.open("GET", "./php/db.php", true);

  xhr.onload = function () {
    var responseData = JSON.parse(xhr.responseText);

    Object.keys(responseData).forEach((key) => {
      responseData[key].variants.forEach((variant) => {
        const words = userMessage.split(" ");
        const patternWords = variant.split(" ");
        const patternLength = patternWords.length;

        for (let i = 0; i <= words.length - patternLength; i++) {
          const segment = words.slice(i, i + patternLength).join(" ");
          if (segment === variant) {
            per_1 = true;
            per_2 = true;
            for (let j = 0; j < patternLength; j++) words[i + j] = "";
          }
        }
        if (per_1) {
          nonMatches = words.filter((word) => word !== "");
          per_1 = false;
        }
      });
      if (per_2) {
        found = responseData[key].answer;
        type = responseData[key].type;
        per_2 = false;
      }
    });

    if (found) {
      type_first_character = type.split("_")[0];
      if (type_first_character == "l") {
        var url = found + encodeURIComponent(nonMatches);
        messageElement.textContent =
          "Отправляю вас на страницу с запросом: " + userMessage;
        setTimeout(function () {
          window.open(url, "_blank");
        }, 1000);
      } else if (type_first_character == "p") {
        let found_divided = found.split("/");
        let found_name = found_divided[found_divided.length - 1].split(".")[0];
        messageElement.classList.add('messageElement_for_file');

        var linkElement = document.createElement("a");
        linkElement.href = found;
        linkElement.setAttribute("target", "_blank");

        var imgElement = document.createElement("img");
        imgElement.classList.add('icon_for_file');
        imgElement.src = "./img/icon/icon_file.svg";
        imgElement.alt = found_name;

        var spanElement = document.createElement("p");
        var found_name_new = found_name.replace(/_/g, " ") + ".";
        spanElement.textContent = found_name_new;

        linkElement.appendChild(imgElement);
        messageElement.textContent = '';
        messageElement.appendChild(linkElement);
        messageElement.appendChild(spanElement);
      }

      found = null;
      nonMatches = [];
    } else {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      };

      fetch(API_URL, requestOptions)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          messageElement.textContent = data.choices[0].message.content;
        })
        .catch((error) => {
          messageElement.classList.add("error");
          messageElement.textContent =
            "Oops! Something went wrong. Please try again!";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    }
  };

  xhr.send();
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) {
    return;
  }
  chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("Thinking...", "chat-incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);

function cancel() {
  let chatbotcomplete = document.querySelector(".chatBot");
  if (chatbotcomplete.style.display != "none") {
    chatbotcomplete.style.display = "none";
    let lastMsg = document.createElement("p");
    lastMsg.textContent = "Спасибо за использование ChatBotNova!";
    lastMsg.classList.add("lastMessage");
    document.body.appendChild(lastMsg);
  }
}
