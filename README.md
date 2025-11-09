# 🌾 Khet2Kitchen

A comprehensive agricultural platform connecting farmers directly with companies and consumers, featuring multilingual support and AI-powered voice assistance.

## 🌟 Features

### Core Functionality
- **Direct Market Connection** - Connect farmers with companies and consumers
- **Real-time Price Updates** - Live market prices for crops
- **Weather Forecasting** - Accurate weather predictions for farming
- **Crop Management** - Track crops, harvest, and farm activities
- **Financial Tracking** - Monitor income, expenses, and profits
- **AI-Powered Insights** - Smart recommendations for farming

### 🎤 Voice Assistant
- **Multilingual Support** - English, Hindi, Telugu, Tamil
- **100+ Voice Commands** - Control the app with your voice
- **Natural Conversations** - AI-powered intelligent responses
- **Hands-Free Operation** - Perfect for farmers in the field

### 🌐 Multilingual Interface
- **4 Indian Languages** - English, Hindi (हिंदी), Telugu (తెలుగు), Tamil (தமிழ்)
- **100% Translation Coverage** - Every element translated
- **Real-time Language Switching** - Change language anytime
- **Persistent Preferences** - Your language choice is saved

### 👥 User Roles
- **Farmers** - Manage crops, track finances, get insights
- **Companies** - Source produce directly from farmers
- **Consumers** - Buy fresh produce from the source

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser (Chrome, Edge, or Safari for voice features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd khet2kitchen
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your API keys to .env
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
khet2kitchen/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── farmer/            # Farmer portal pages
│   │   ├── company/           # Company portal pages
│   │   ├── consumer/          # Consumer portal pages
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── auth/             # Authentication components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── ui/               # UI components (shadcn/ui)
│   │   └── voice-assistant/  # Voice assistant components
│   ├── lib/                   # Utility libraries
│   │   ├── translations/     # Translation files
│   │   └── voice-assistant/  # Voice assistant services
│   ├── hooks/                 # Custom React hooks
│   ├── context/              # React context providers
│   └── ai/                    # AI/Genkit integration
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🎤 Voice Assistant Usage

### Supported Commands

#### Weather
- "What's the weather today?"
- "Will it rain tomorrow?"

#### Prices
- "Show tomato prices"
- "What's the wheat price?"

#### Farm Management
- "Add 2 acres of wheat"
- "Record harvest 50 kg"

#### Financial
- "Calculate my profit"
- "Show my expenses"

#### Crop Advice
- "What fertilizer for rice?"
- "How to treat pests?"

[See full command list](VOICE_COMMANDS_QUICK_REFERENCE.md)

## 🌐 Supported Languages

| Language | Code | Status |
|----------|------|--------|
| English | en | ✅ Complete |
| Hindi | hi | ✅ Complete |
| Telugu | te | ✅ Complete |
| Tamil | ta | ✅ Complete |

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.3** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

### Backend
- **Next.js API Routes** - Backend API
- **Firebase** - Authentication & Database
- **Genkit** - AI integration
- **Google Gemini** - AI model

### Voice Features
- **Web Speech API** - Voice recognition
- **Speech Synthesis API** - Text-to-speech
- **Custom Intent Parser** - Command understanding
- **AI Service** - Intelligent responses

## 📊 Features by Role

### Farmer Portal
- Dashboard with crop overview
- AI-powered pricing suggestions
- Incoming orders management
- Graded produce tracking
- Market insights & demand
- Community features
- Nutrient recommendations
- Pest & disease control
- Weather forecasts
- Feedback system

### Company Portal
- Source produce directly
- Manage supply chain
- Track orders
- Quality grading
- Bulk purchasing

### Consumer Portal
- Browse fresh produce
- Direct from farmers
- Quality assured
- Fair pricing

## 🔒 Environment Variables

Create a `.env` file with:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google AI (Gemini)
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

## 📱 Browser Compatibility

| Browser | Support | Voice Assistant |
|---------|---------|-----------------|
| Chrome | ✅ Full | ✅ Yes |
| Edge | ✅ Full | ✅ Yes |
| Safari | ✅ Full | ✅ Yes |
| Firefox | ⚠️ Partial | ⚠️ Limited |
| Mobile Chrome | ✅ Full | ✅ Yes |
| Mobile Safari | ✅ Full | ✅ Yes |

## 🧪 Testing

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build
npm run build
```

## 📚 Documentation

- [Voice Assistant Guide](VOICE_ASSISTANT_GUIDE.md)
- [Voice Commands Reference](VOICE_COMMANDS_QUICK_REFERENCE.md)
- [Translation Guide](TRANSLATION_GUIDE.md)
- [Browser Compatibility](BROWSER_COMPATIBILITY_SOLUTION.md)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ for Indian farmers

## 🙏 Acknowledgments

- Google Gemini AI for intelligent responses
- Web Speech API for voice capabilities
- shadcn/ui for beautiful components
- Next.js team for the amazing framework

## 📞 Support

For support, email support@khet2kitchen.com or join our community.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] More regional languages
- [ ] WhatsApp integration
- [ ] SMS alerts
- [ ] Payment integration
- [ ] Logistics tracking
- [ ] Weather alerts
- [ ] Crop insurance integration
- [ ] Government scheme integration

## 📈 Stats

- **Languages**: 4
- **Voice Commands**: 100+
- **Components**: 50+
- **Pages**: 20+
- **Translation Keys**: 350+
- **Lines of Code**: 10,000+

---

**Made in India 🇮🇳 for Indian Farmers 🌾**
