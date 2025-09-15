// Chatbot functionality
class KoziChatbot {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.isTyping = false;
        
        this.initializeEventListeners();
        this.loadChatHistory();
    }

    initializeEventListeners() {
        // Send message on button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Send message on Enter key (but allow Shift+Enter for new lines)
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        // Auto-resize textarea
        this.messageInput.addEventListener('input', () => {
            this.autoResizeTextarea();
        });
        
        // Focus on input when page loads
        this.messageInput.focus();
    }

    autoResizeTextarea() {
        this.messageInput.style.height = 'auto';
        this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.autoResizeTextarea();
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Disable send button
        this.sendButton.disabled = true;
        this.isTyping = true;

        try {
            // Simulate API call delay
            await this.delay(1000 + Math.random() * 2000);
            
            // Generate bot response
            const botResponse = await this.generateBotResponse(message);
            
            // Remove typing indicator
            this.hideTypingIndicator();
            
            // Add bot response
            this.addMessage(botResponse, 'bot');
            
        } catch (error) {
            console.error('Error generating response:', error);
            this.hideTypingIndicator();
            this.addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
        } finally {
            this.sendButton.disabled = false;
            this.isTyping = false;
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = sender === 'bot' ? '<i class="fas fa-robot"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('span');
        messageTime.className = 'message-time';
        messageTime.textContent = this.getCurrentTime();
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        // Save to localStorage
        this.saveMessage(content, sender);
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator-message';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-robot"></i>';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            typingContent.appendChild(dot);
        }
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingContent);
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greeting responses
        if (this.containsAny(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            return this.getRandomResponse([
                "Hello! How can I help you today?",
                "Hi there! What can I assist you with?",
                "Hey! I'm here to help. What do you need?",
                "Good to see you! How may I assist you?"
            ]);
        }
        
        // Help requests
        if (this.containsAny(message, ['help', 'support', 'assist', 'how to', 'what is'])) {
            return this.getRandomResponse([
                "I'm here to help! What specific question do you have?",
                "I'd be happy to assist you. Could you tell me more about what you need help with?",
                "Sure! I can help with various topics. What would you like to know?",
                "I'm ready to help! Please describe what you need assistance with."
            ]);
        }
        
        // Job/application related
        if (this.containsAny(message, ['job', 'application', 'apply', 'career', 'work', 'employment'])) {
            return this.getRandomResponse([
                "I can help you with job applications and career guidance. What specific aspect would you like to know about?",
                "Great! I can assist with job-related questions. Are you looking for help with applications, interviews, or career advice?",
                "I'm here to help with your job search! What would you like to know about applications or career opportunities?",
                "I can provide guidance on jobs and applications. What specific help do you need?"
            ]);
        }
        
        // Profile related
        if (this.containsAny(message, ['profile', 'account', 'settings', 'edit profile', 'view profile'])) {
            return this.getRandomResponse([
                "I can help you with profile management. You can edit your profile or view it from the sidebar menu.",
                "For profile-related tasks, you can use the 'Edit Profile' or 'View Profile' options in the sidebar.",
                "I can guide you through profile settings. What specific profile information do you need help with?",
                "Profile management is available through the sidebar. What would you like to do with your profile?"
            ]);
        }
        
        // Payment related
        if (this.containsAny(message, ['payment', 'billing', 'subscription', 'premium', 'upgrade'])) {
            return this.getRandomResponse([
                "I can help with payment and billing questions. What specific payment issue do you have?",
                "For payment-related inquiries, you can access the Payment section in the sidebar. What do you need help with?",
                "I'm here to assist with payment questions. What billing or subscription help do you need?",
                "I can help with payment and premium features. What would you like to know about?"
            ]);
        }
        
        // Guidelines
        if (this.containsAny(message, ['guidelines', 'rules', 'policy', 'terms', 'how to use'])) {
            return this.getRandomResponse([
                "I can help explain our guidelines and policies. What specific guideline are you looking for?",
                "You can find detailed guidelines in the 'Guidelines' section of the sidebar. What specific question do you have?",
                "I'm here to help with guidelines and policies. What would you like to know about our rules?",
                "I can provide information about our guidelines. What specific policy question do you have?"
            ]);
        }
        
        // Thank you responses
        if (this.containsAny(message, ['thank', 'thanks', 'appreciate', 'grateful'])) {
            return this.getRandomResponse([
                "You're very welcome! I'm happy to help.",
                "My pleasure! Is there anything else I can assist you with?",
                "You're welcome! Feel free to ask if you need more help.",
                "Glad I could help! Let me know if you have other questions."
            ]);
        }
        
        // Goodbye responses
        if (this.containsAny(message, ['bye', 'goodbye', 'see you', 'farewell', 'exit'])) {
            return this.getRandomResponse([
                "Goodbye! Have a great day!",
                "See you later! Feel free to come back anytime.",
                "Take care! I'll be here when you need help.",
                "Goodbye! Thanks for chatting with me."
            ]);
        }
        
        // Default responses for unclear messages
        return this.getRandomResponse([
            "I'm not sure I understand. Could you rephrase your question?",
            "That's interesting! Could you provide more details so I can help you better?",
            "I'd like to help you with that. Could you explain a bit more?",
            "I'm here to assist you. Could you clarify what you need help with?",
            "I want to make sure I understand correctly. Could you elaborate on that?",
            "That's a good question! Could you provide more context so I can give you the best answer?"
        ]);
    }

    containsAny(str, keywords) {
        return keywords.some(keyword => str.includes(keyword));
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Local storage functions
    saveMessage(content, sender) {
        const messages = this.getChatHistory();
        messages.push({
            content,
            sender,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('koziChatHistory', JSON.stringify(messages));
    }

    getChatHistory() {
        const history = localStorage.getItem('koziChatHistory');
        return history ? JSON.parse(history) : [];
    }

    loadChatHistory() {
        // Clear any existing chat history to start fresh
        localStorage.removeItem('koziChatHistory');
        
        // Clear existing messages
        this.chatMessages.innerHTML = '';
        
        // Add fresh welcome message
        this.addMessage("Hello! I'm your AI assistant. How can I help you today?", 'bot');
    }

    clearChatHistory() {
        localStorage.removeItem('koziChatHistory');
        this.chatMessages.innerHTML = '';
        this.addMessage("Hello! I'm your AI assistant. How can I help you today?", 'bot');
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.koziChatbot = new KoziChatbot();
    
    // Add some interactive features
    addInteractiveFeatures();
});

function addInteractiveFeatures() {
    // Add click handlers for navigation items
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            
            // Add active class to clicked item
            link.parentElement.classList.add('active');
            
            // If it's the chatbot link, scroll to top of chat
            if (link.textContent.includes('Chatbot')) {
                document.querySelector('.chatbot-container').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus on chat input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('messageInput').focus();
        }
        
        // Escape to clear input
        if (e.key === 'Escape') {
            document.getElementById('messageInput').value = '';
            document.getElementById('messageInput').style.height = 'auto';
        }
    });
    
    // No need for additional welcome message since it's already added in loadChatHistory
}
