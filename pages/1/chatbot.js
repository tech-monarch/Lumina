document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("fn__chat_textarea");
    const sendButton = document.getElementById("send-button");
    const chatContainer = document.getElementById("chat-container");

    // When the user clicks the send button
    sendButton.addEventListener("click", async () => {
        const userMessage = messageInput.value.trim();
        if (!userMessage) return;

        // Display the user's message in the chat
        const userDiv = document.createElement("div");
        userDiv.classList.add("chat__item", "your__chat");
        userDiv.innerHTML = `<div class="author"><span>You</span></div><div class="chat"><p>${userMessage}</p></div>`;
        chatContainer.appendChild(userDiv);
        messageInput.value = ""; // Clear the input

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Send the user's message to the server
        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: userMessage })
            });

            const data = await response.json();

            // Display the bot's response in the chat
            const botDiv = document.createElement("div");
            botDiv.classList.add("chat__item", "bot__chat");
            botDiv.innerHTML = `<div class="author"><span>Bot</span></div><div class="chat"><p>${data.message}</p></div>`;
            chatContainer.appendChild(botDiv);

            // Scroll to the bottom of the chat container
            chatContainer.scrollTop = chatContainer.scrollHeight;
        } catch (error) {
            console.error("Error:", error);
            // Display a fallback error message
            const errorDiv = document.createElement("div");
            errorDiv.classList.add("chat__item", "bot__chat");
            errorDiv.innerHTML = `<div class="author"><span>Bot</span></div><div class="chat"><p>Sorry, something went wrong.</p></div>`;
            chatContainer.appendChild(errorDiv);
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    });

    // Handle Enter key press for sending messages
    messageInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            sendButton.click();
        }
    });
});
