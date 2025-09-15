# KOZI Chatbot

A modern, responsive AI chatbot interface designed for the KOZI platform. Features a beautiful pink/purple gradient design that matches the KOZI brand aesthetic.

## Features

- 🤖 **Intelligent AI Assistant** - Context-aware responses for various topics
- 🎨 **Modern UI Design** - Pink/purple gradient theme matching KOZI brand
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 💬 **Real-time Chat** - Smooth animations and typing indicators
- 💾 **Chat History** - Automatically saves and loads conversation history
- ⌨️ **Keyboard Shortcuts** - Ctrl/Cmd+K to focus input, Enter to send
- 🎯 **Context-Aware** - Understands job applications, profiles, payments, and more

## Quick Start

### Option 1: Simple HTTP Server
```bash
# Using Python (if installed)
python3 -m http.server 3000

# Using Node.js (if installed)
npx http-server -p 3000 -o
```

### Option 2: Live Development Server
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Option 3: Direct File Access
Simply open `index.html` in your web browser.

## Usage

1. **Start a Conversation**: Click on the "Chatbot" item in the sidebar
2. **Send Messages**: Type your message and press Enter or click the send button
3. **Keyboard Shortcuts**:
   - `Enter` - Send message
   - `Shift + Enter` - New line
   - `Ctrl/Cmd + K` - Focus on input
   - `Escape` - Clear input

## Chatbot Capabilities

The AI assistant can help with:

- **Job Applications** - Guidance on applying for jobs and career advice
- **Profile Management** - Help with editing and viewing profiles
- **Payment Issues** - Assistance with billing and subscription questions
- **Guidelines** - Information about platform rules and policies
- **General Support** - Any other questions or concerns

## Customization

### Styling
Edit `styles.css` to customize:
- Color scheme (currently pink/purple gradient)
- Typography and spacing
- Animation effects
- Responsive breakpoints

### Functionality
Modify `script.js` to:
- Add new response patterns
- Integrate with external APIs
- Customize chat behavior
- Add new features

## File Structure

```
kozi-chatbot/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── script.js           # JavaScript functionality
├── package.json        # Project configuration
└── README.md          # This file
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or support, please contact the KOZI team or open an issue on GitHub.