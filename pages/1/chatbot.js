function sendMessage() {
    const userMessage = chatTextarea.value.trim();
    if (!userMessage) return;

    appendMessage(userMessage, "your__chat", "You");

    // For the first message, set it as the chat title
    if (titleHolder.textContent === "Title") {
        titleHolder.textContent = summarizeText(userMessage);
    }

    // Clear the input field
    chatTextarea.value = "";

    // Send message to server
    fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.message) {
                appendMessage(data.message, "bot__chat", "Bot");
            } else {
                appendMessage("Something went wrong. Please try again.", "bot__chat", "Bot");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            appendMessage("Unable to reach the server. Please try again later.", "bot__chat", "Bot");
        });
}
