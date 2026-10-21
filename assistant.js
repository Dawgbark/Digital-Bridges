
// DIGITAL BRIDGES CURRICULUM ASSISTANT
// Predefined educational responses.
// No generative AI or external API is used.

const messages = document.getElementById("messages");
const input = document.getElementById("userInput");
const chatForm = document.getElementById("chatForm");

// APPROVED CURRICULUM RESPONSES

const answers = {

  ai: `The Digital Bridges curriculum introduces AI as a technology people can use alongside trusted websites and applications. It can support everyday tasks such as planning a trip or understanding a confusing document. Important information should be checked with trustworthy, current sources because AI can produce incorrect or outdated information. Would you like to review the steps or choose another topic?`,

  appointments: `Technology can help you prepare for an appointment. You can find your healthcare provider’s official scheduling page, write down questions you want to ask, learn how to use a patient portal, or set a reminder. For a virtual visit, check the National Institute on Aging’s telehealth guidance and confirm details with your healthcare provider. I can help you get organized, but I can’t book an appointment or access your account.`,

  travel: `Absolutely! AI can help you plan a trip by organizing an itinerary, making a packing list, or comparing your options. Be sure to confirm prices, schedules, reservations, and accessibility details directly with the travel provider. I can help you make a packing list to get started! I can’t make reservations or verify live prices.`,

  home: `Technology can help with everyday tasks such as planning meals, making a shopping list, drafting emails, organizing a calendar, or keeping information in one place. Start with one task at a time. If the steps depend on your device, tell me whether you use an iPhone, Android phone, Windows computer, Mac, or another device. This demo only has predefined guidance, so it may not have detailed steps for every app.`,

  money: `Technology can help explain unfamiliar words on a bill or help you organize a budget. For your safety, never share passwords, bank login details, PINs, full account details, or verification codes. Be cautious of urgent payment demands, suspicious links, impersonation, and requests to keep something secret. Contact a bank or organization using contact information you independently verify.`,

  device: `I can help you choose the right kind of guidance, but the steps depend on your device. Are you using an iPhone, an Android phone, a Windows computer, a Mac, or something else? Please do not share passwords, verification codes, or private account information. This demo has predefined curriculum guidance rather than instructions for every device or app.`,

  scams: `The curriculum warns about urgent payment demands, suspicious links, impersonation, and requests for secrecy. Never share authentication codes or sensitive personal information. Contact the organization through independently verified contact information. The curriculum references the Federal Trade Commission's resource on scams affecting older adults. A suspicious message cannot be guaranteed safe just by looking at it.`,

  sources: `The curriculum's source library names these resources: Senior Planet from AARP — AI for Older Adults; OpenAI — Helping Older Adults Use AI in Everyday Life; National Institute on Aging — Telehealth; Federal Trade Commission — Addressing Scams Affecting Older Adults; Medicare.gov — Telehealth Coverage; and AARP Research — Older Adults and AI. This demo lists the sources from your curriculum but does not include or verify the full text of those resources. Use their official websites for the original materials.`,

  fallback: `I don't have an approved answer for that question in the Digital Bridges curriculum available in this demo. I don't want to guess or give you information that may be wrong. Please choose one of the curriculum topics, consult the listed official source, or ask a Digital Bridges mentor for help.`

};

// DISPLAY CHAT MESSAGES

function addMessage(text, who) {
  const message = document.createElement("div");

  message.className = "assistant-message " + who;

  const label = document.createElement("span");
  label.className = "assistant-message-label";

  label.textContent =
    who === "user" ? "YOU" : "DIGITAL BRIDGES";

  message.appendChild(label);

  // Use textContent instead of innerHTML
  // so user input is displayed safely.
  message.appendChild(document.createTextNode(text));

  messages.appendChild(message);

  messages.scrollTop = messages.scrollHeight;
}

// IDENTIFY QUESTION TOPICS

function pickTopic(question) {
  const text = question.toLowerCase();

  if (/scam|fraud|phish|suspicious|fake message|online safety/.test(text)) {
    return "scams";
  }

  if (/appointment|patient portal|telehealth|doctor|healthcare|virtual visit/.test(text)) {
    return "appointments";
  }

  if (/travel|trip|itinerary|packing|flight|vacation/.test(text)) {
    return "travel";
  }

  if (/bill|budget|bank|money|financial|payment|pin|password|account/.test(text)) {
    return "money";
  }

  if (/device|iphone|android|windows|mac|phone|computer|tablet|app/.test(text)) {
    return "device";
  }

  if (/meal|shopping list|calendar|email|household|organize/.test(text)) {
    return "home";
  }

  if (/source|resource|reference|library/.test(text)) {
    return "sources";
  }

  if (/\bai\b|artificial intelligence|what can ai|what is ai/.test(text)) {
    return "ai";
  }

  return "fallback";
}

// SEND A MESSAGE AND SHOW THE RESPONSE

function sendMessage(question, selectedTopic = null) {
  const text = question.trim();

  if (!text) {
    return;
  }

  addMessage(text, "user");

  input.value = "";

  const topic = selectedTopic || pickTopic(text);

  const response = answers[topic] || answers.fallback;

  addMessage(response, "bot");
}

// USER TYPES A QUESTION

chatForm.addEventListener("submit", function(event) {
  event.preventDefault();

  sendMessage(input.value);
});

// USER CLICKS A CURRICULUM TOPIC

document.querySelectorAll("[data-topic]").forEach(function(button) {

  button.addEventListener("click", function() {

    const topic = button.dataset.topic;

    const question = button.textContent.trim();

    sendMessage(question, topic);

  });

});
