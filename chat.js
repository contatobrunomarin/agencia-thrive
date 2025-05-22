emailjs.init('ags6O3yAki7QNSk7G'); // Seu User ID

const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const sendFullConversationBtn = document.getElementById('send-full-conversation');

let conversation = [];

chatToggle.addEventListener('click', () => {
  chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
});

function addMessage(text, fromUser = true) {
  const messageEl = document.createElement('div');
  messageEl.textContent = text;
  messageEl.style.margin = '5px 0';
  messageEl.style.padding = '8px 12px';
  messageEl.style.borderRadius = '15px';
  messageEl.style.maxWidth = '80%';
  messageEl.style.wordWrap = 'break-word';
  messageEl.style.alignSelf = fromUser ? 'flex-end' : 'flex-start';
  messageEl.style.backgroundColor = fromUser ? '#007bff' : '#f1f0f0';
  messageEl.style.color = fromUser ? '#fff' : '#000';
  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const input = this.message;
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, true);
  conversation.push({ from: 'Usuário', text });

  input.value = '';
});

sendFullConversationBtn.addEventListener('click', () => {
  if (conversation.length === 0) {
    alert('Nenhuma mensagem para enviar.');
    return;
  }

  const fullText = conversation.map(msg => `${msg.from}: ${msg.text}`).join('\n');

  emailjs.send('service_911tx3j', 'template_zd98gfp', {
    conversation: fullText
  }).then(() => {
    alert('Conversa enviada com sucesso!');
    conversation = [];
    chatMessages.innerHTML = '';
    chatWindow.style.display = 'none';
  }).catch((err) => {
    alert('Erro ao enviar a conversa. Tente novamente.');
    console.error(err);
  });
});
