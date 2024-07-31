const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');

const onLoadData=()=> {
    const chats = localStorage.getItem('chats');
    const user = JSON.parse(localStorage.getItem('user'));
    const label = document.getElementById('username');
    label.textContent = user.fullname;
    if (chats) {
        const chat = JSON.parse(chats);
        chat.forEach((data) => {
            const messageElemet = document.createElement('div');
            messageElemet.innerHTML=data.message;
            messages.appendChild(messageElemet);
        });
    }
}

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = messageInput.value;
    const message = `[${new Date().toLocaleString()}]  ${generateRandomUsername()}: ${text}`;

    const chats = localStorage.getItem('chats');
    if (chats) {
        const chat = JSON.parse(chats);
        chat.push({ message });
        localStorage.setItem('chats', JSON.stringify(chat));
    } else {
        localStorage.setItem('chats', JSON.stringify([{ message }]));
    }

    const messageElemet = document.createElement('div');
    messageElemet.innerHTML=message;
    messages.appendChild(messageElemet);
    messageInput.value = '';
    messageInput.focus();
})


const generateRandomUsername =() =>{
    const adjectives = ['happy', 'sad', 'funny', 'serious', 'clever', 'brave', 'calm', 'loud', 'quiet', 'proud'];
    const nouns = ['cat', 'dog', 'bird', 'fish', 'turtle', 'rabbit', 'lion', 'tiger', 'elephant', 'monkey'];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return randomAdjective + '_' + randomNoun; // Example: happy_cat, funny_dog
}
