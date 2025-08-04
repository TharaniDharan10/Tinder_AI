# Tinder AI 🔥

A full-stack AI-powered dating platform that simulates Tinder-like interactions with intelligent AI personas powered by Llama 3.2. Users can swipe through profiles, match with AI characters, and engage in dynamic conversations through a modern React frontend.

## 🎯 Project Overview

**Duration:** November 2024 - December 2024  
**Tech Stack:** React, Spring Boot, MongoDB, Llama 3.2, Maven

### Use Case
Programmed a Tinder-like dating platform where users interact with an AI-driven persona powered by Llama, providing gender-specific responses. The system supports left swipes for dislikes, right swipes for matches, and seamless chatting with liked profiles through an intuitive React interface.

### Key Features
- **Frontend:** React-based responsive UI with swipe gestures and real-time chat interface
- **Backend:** Spring Boot REST API for efficient processing and data management
- **Database:** MongoDB for flexible user data, matches, and chat history storage
- **AI Integration:** Llama 3.2 AI for intelligent, context-aware conversations
- **Matching System:** Left/right swipe functionality with match storage and retrieval
- **Real-time Chat:** Dynamic messaging system with AI-generated responses
- **Profile Management:** Comprehensive profile system with personality-driven interactions

### Outcome
Launched a dynamic, AI-powered matchmaking system with real-time chat capabilities. Optimized performance using efficient database queries, responsive UI interactions, and seamless frontend-backend integration.

## 🏗️ Project Architecture

### Full-Stack Structure
```
Tinder_AI/
├── frontend/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── SwipeCard.jsx         # Profile swiping interface
│   │   │   ├── ChatInterface.jsx     # Real-time messaging UI
│   │   │   ├── MatchList.jsx         # Display user matches
│   │   │   └── ProfileCard.jsx       # Profile display component
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Main swiping page
│   │   │   ├── Matches.jsx           # Matches overview
│   │   │   └── Chat.jsx              # Individual chat page
│   │   ├── services/
│   │   │   └── api.js                # API calls to backend
│   │   ├── App.jsx
│   │   └── index.js
│   ├── package.json
│   └── public/
├── backend/                           # Spring Boot Backend
│   ├── src/main/java/io/javabrains/tinderaibackend/
│   │   ├── conversations/
│   │   │   ├── ConversationController.java
│   │   │   ├── ConversationService.java
│   │   │   ├── ConversationRepository.java
│   │   │   ├── Conversation.java
│   │   │   └── ChatMessage.java
│   │   ├── profiles/
│   │   │   ├── ProfileController.java
│   │   │   ├── ProfileRepository.java
│   │   │   └── Profile.java
│   │   ├── matches/
│   │   │   ├── MatchController.java
│   │   │   ├── MatchRepository.java
│   │   │   └── Match.java
│   │   └── TinderAiBackendApplication.java
│   ├── pom.xml
│   ├── profiles.json
│   └── src/main/resources/
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Frontend:** Node.js 16+, npm/yarn
- **Backend:** Java 17+, Maven 3.6+
- **Database:** MongoDB
- **AI:** Ollama with Llama 3.2 model

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TharaniDharan10/Tinder_AI.git
   cd Tinder_AI
   ```

2. **Set up MongoDB**
   ```bash
   docker-compose up mongodb -d
   ```

3. **Install and configure Ollama**
   ```bash
   # Install Ollama
   curl -fsSL https://ollama.ai/install.sh | sh
   
   # Pull Llama 3.2 model
   ollama pull llama3.2
   ```

4. **Backend Setup**
   ```bash
   cd backend
   # Configure application.properties if needed
   mvn spring-boot:run
   ```
   Backend will be available at `http://localhost:8080`

5. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:8080
```

### Profile Endpoints

#### Get Random Profile
Returns a random profile for swiping functionality.

- **URL:** `http://localhost:8080/profiles/random`
- **Method:** `GET`
- **Description:** Retrieves a random profile from the database for the swiping interface
- **Response:** Profile object with user details

**Example Response:**
```json
{
  "id": "profile123",
  "firstName": "Emma",
  "lastName": "Johnson",
  "age": 25,
  "ethnicity": "Caucasian",
  "gender": "FEMALE",
  "bio": "Love hiking and coffee. Looking for meaningful connections!",
  "imageUrl": "https://example.com/image.jpg",
  "myersBriggsPersonalityType": "ENFP"
}
```

### Match Endpoints

#### Create Match (Right Swipe)
Creates a new match when user swipes right on a profile.

- **URL:** `http://localhost:8080/matches`
- **Method:** `POST`
- **Description:** Records a right swipe as a match and creates a conversation
- **Request Body:** Match object with user and profile IDs

**Example Request:**
```json
{
  "userId": "user",
  "profileId": "profile123"
}
```

**Example Response:**
```json
{
  "id": "match456",
  "userId": "user",
  "profileId": "profile123",
  "conversationId": "conv_789",
  "createdAt": "2024-12-01T10:00:00"
}
```

#### Get User Matches
Retrieves all matches for the current user.

- **URL:** `http://localhost:8080/matches`
- **Method:** `GET`
- **Description:** Fetches all matches for a specific user

**Example Request:**
```
GET http://localhost:8080/matches
```

**Example Response:**
```json
[
    {
        "id": "7460ae71-e4c9-4ca3-b246-8ac803cbdb4b",
        "profile": {
            "id": "98eeb593-0adb-4f18-ae1d-81db5fa3b023",
            "firstName": "Gabriela",
            "lastName": "Gomez",
            "age": 31,
            "ethnicity": "Hispanic",
            "gender": "FEMALE",
            "bio": "Engineer and problem solver. Loves building things and finding innovative solutions. Looking for someone who shares my curiosity and drive.",
            "imageUrl": "98eeb593-0adb-4f18-ae1d-81db5fa3b023.jpg",
            "myersBriggsPersonalityType": "ENTP"
        },
        "conversationId": "1cfd6399-ff66-4f76-a0d3-cc2f413b7e17"
    },
    { ... }
]
```

### Conversation Endpoints

#### Get Conversation
Retrieves a specific conversation by its ID.

- **URL:** `http://localhost:8080/conversations/{conversationId}`
- **Method:** `GET`
- **Path Parameters:**
  - `conversationId` (string): The unique identifier of the conversation
- **Description:** Fetches the complete conversation history including all messages

**Example Request:**
```
GET http://localhost:8080/conversations/e71b959e-0cd7-4a68-9faf-f9a4438b7228
```

**Example Response:**
```json
{
    "id": "e71b959e-0cd7-4a68-9faf-f9a4438b7228",
    "profileId": "403ccbc5-d866-48d1-81a2-872e6940878b",
    "messages": [
        {
            "messageText": "hi",
            "authorId": "user",
            "messageTime": "2025-08-04T11:01:30.903"
        },
        {
            "messageText": "More than just a hello, I hope! What draws you to music like it does to me?",
            "authorId": "403ccbc5-d866-48d1-81a2-872e6940878b",
            "messageTime": "2025-08-04T11:01:34.396"
        }
    ]
}
```

#### Add Message to Conversation
Sends a new message to an existing conversation and generates an AI response.

- **URL:** `http://localhost:8080/conversations/{conversationId}`
- **Method:** `POST`
- **Path Parameters:**
  - `conversationId` (string): The unique identifier of the conversation
- **Request Body:** ChatMessage object
- **Description:** Adds a user message to the conversation and triggers an AI-generated response

**Example Request:**
```
POST http://localhost:8080/conversations/e71b959e-0cd7-4a68-9faf-f9a4438b7228
Content-Type: application/json

{
    "messageText" : "What date is today",
    "authorId" : "user"
}
```

## 🎨 Frontend Features

### React Components

#### SwipeCard Component
- **Purpose:** Displays profile cards with swipe gestures
- **Features:** Left/right swipe detection, smooth animations, profile image display
- **Integration:** Calls match API on right swipe, discards on left swipe

#### ChatInterface Component
- **Purpose:** Real-time messaging interface
- **Features:** Message bubbles
- **Integration:** Connects to conversation APIs for sending/receiving messages

#### MatchList Component
- **Purpose:** Displays all user matches
- **Features:** list view of matched profiles, navigation to individual chats
- **Integration:** Fetches matches from backend API

#### ProfileCard Component
- **Purpose:** Reusable profile display component
- **Features:** Profile image, bio, age, personality type display
- **Usage:** Used in swipe cards and match lists

### Frontend API Integration

#### API Service (`services/api.js`)
```javascript
// Example API calls
const API_BASE = 'http://localhost:8080';

export const getRandomProfile = () => 
  fetch(`${API_BASE}/profiles/random`);

export const createMatch = (userId, profileId) =>
  fetch(`${API_BASE}/matches`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, profileId })
  });

export const getUserMatches = (userId) =>
  fetch(`${API_BASE}/matches/user/${userId}`);

export const getConversation = (conversationId) =>
  fetch(`${API_BASE}/conversations/${conversationId}`);

export const sendMessage = (conversationId, message) =>
  fetch(`${API_BASE}/conversations/${conversationId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  });
```

### User Flow
1. **Profile Browsing:** Users see random profiles via swipe cards
2. **Swiping:** Left swipe to pass, right swipe to match
3. **Matching:** Right swipes create matches and initiate conversations
4. **Chat:** Users can chat with matched profiles via AI responses
5. **Match Management:** View all matches and navigate between conversations

## 🛠️ Backend Components

### Match Management System
- **MatchController:** Handles match creation and retrieval
- **MatchRepository:** MongoDB operations for match data
- **Match Entity:** Represents user-profile matches with conversation links

### AI Conversation System
- **ConversationService:** Integrates with Ollama's Llama 3.2 model
- **Personality Engine:** Myers-Briggs personality types for realistic interactions
- **Context Awareness:** Maintains conversation history and user preferences
- **Response Generation:** Tinder-appropriate casual and engaging tone

### Profile Management
- **ProfileRepository:** MongoDB-based profile storage with random selection
- **Profile Initialization:** Automatic profile seeding on startup
- **Gender Filtering:** Respects user preference settings

## 🔧 Configuration

### Backend Configuration (`application.properties`)
```properties
# Application settings
spring.application.name=tinder-ai-backend

# Ollama AI configuration
spring.ai.ollama.chat.options.model=llama3.2

# Startup behavior
startup-actions.initializeProfiles=true

# User preferences
tinderai.lookingForGender=FEMALE

# User profile data
tinderai.character.user={"id":"user","firstName":"Tharani","lastName":"Dharan","age":21,"ethnicity":"Indian","gender":"MALE","bio":"Software Engineer, I love to play basketball and also a bathroom singer","imageUrl":"","myersBriggsPersonalityType":"INTP"}
```

### Frontend Configuration
- **Environment Variables:** Configure API base URL in `.env`
- **Proxy Setup:** Development proxy to backend on localhost:8080
- **Build Configuration:** Production build optimization

### Docker Setup
```yaml
services:
  mongodb:
    image: 'mongo:latest'
    environment:
      - 'MONGO_INITDB_DATABASE=tinder-ai-database'
    ports:
      - '27017'
```

## 🚀 Development Workflow

### Frontend Development
```bash
cd frontend
npm run dev          # Development server with hot reload
npm run build        # Production build
npm run lint         # Code linting
npm test             # Run tests
```

### Backend Development
```bash
cd backend
mvn spring-boot:run  # Development server
mvn test             # Run tests
mvn package          # Build JAR
```

### Full-Stack Development
1. Start MongoDB: `docker-compose up mongodb -d`
2. Start Ollama and pull model: `ollama pull llama3.2`
3. Start backend: `cd backend && mvn spring-boot:run`
4. Start frontend: `cd frontend && npm start`
5. Access application at `http://localhost:3000`

## 🎯 Key Technologies

### Frontend Stack
- **React 18+:** Modern functional components with hooks
- **CSS/SCSS:** Responsive design with mobile-first approach
- **Axios/Fetch:** HTTP client for API communication
- **React Router:** Single-page application routing
- **Gesture Libraries:** Touch/swipe gesture handling

### Backend Stack
- **Spring Boot 3:** REST API framework
- **Spring AI:** Ollama integration for LLM calls
- **Spring Data MongoDB:** Database operations
- **Maven:** Dependency management and build tool

### Database & AI
- **MongoDB:** Document-based storage for flexible data models
- **Ollama:** Local LLM hosting platform
- **Llama 3.2:** Advanced language model for conversational AI

## 🔒 CORS & Security
- **CORS Configuration:** Enabled for frontend-backend communication
- **Development Mode:** Allows all origins (`*`) for development
- **Production Notes:** Configure specific origins for security

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👨‍💻 Author
**Tharani Dharan**
- GitHub: [@TharaniDharan10](https://github.com/TharaniDharan10)

## 🙏 Acknowledgments
- React team for the amazing frontend framework
- Spring Boot team for robust backend capabilities
- Spring AI for seamless LLM integration
- MongoDB for flexible data storage
- Ollama team for local LLM capabilities
