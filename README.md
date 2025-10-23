# Chatium - Multi-AI Chat Application

A full-stack chat application built with Spring Boot, Angular 20, Tailwind CSS, and GraphQL, featuring integration with Claude AI and ChatGPT (OpenAI).

## Technology Stack

### Backend
- **Spring Boot 3.2.0** - Java backend framework
- **GraphQL** - API query language
- **Spring WebFlux** - Reactive HTTP client for AI APIs
- **Gradle** - Build and dependency management
- **Claude API** - Anthropic's Claude AI integration
- **OpenAI API** - ChatGPT integration

### Frontend
- **Angular 20** - Modern web framework
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo GraphQL Client** - GraphQL client for Angular
- **TypeScript** - Type-safe JavaScript

## Features

- **Multi-AI Support** - Switch between Claude AI and ChatGPT (OpenAI) in real-time
- **Real-time Chat Interface** - Seamless conversation with AI models
- **Modern, Responsive UI** - Built with Tailwind CSS
- **GraphQL API** - Efficient data fetching and mutations
- **Message History** - View and manage conversation history
- **Provider Selection** - Easy dropdown to switch between AI providers
- **Beautiful Design** - Gradient themes with smooth animations

## Project Structure

```
chatium/
├── backend/                    # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/chatium/backend/
│   │   │   │   ├── BackendApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── WebConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── ChatController.java
│   │   │   │   ├── model/
│   │   │   │   │   ├── ChatMessage.java
│   │   │   │   │   └── SendMessageInput.java
│   │   │   │   └── service/
│   │   │   │       ├── ChatService.java
│   │   │   │       ├── ClaudeService.java
│   │   │   │       └── OpenAIService.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── graphql/
│   │   │           └── schema.graphqls
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradlew
└── frontend/                   # Angular 20 frontend
    ├── src/
    │   ├── app/
    │   │   ├── app.ts
    │   │   ├── app.config.ts
    │   │   ├── chat.component.ts
    │   │   └── chat.service.ts
    │   ├── styles.css
    │   └── index.html
    ├── tailwind.config.js
    └── package.json
```

## Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **Gradle 8.0** or higher (or use the included Gradle wrapper)
- **Claude API Key** (from Anthropic) - Optional, for Claude AI
- **OpenAI API Key** (from OpenAI) - Optional, for ChatGPT

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chatium
```

### 2. Backend Setup

#### Configure API Keys

You can configure one or both AI providers:

**Option 1: Edit application.properties**

Edit `backend/src/main/resources/application.properties`:

```properties
# For Claude AI
claude.api.key=your-claude-api-key-here

# For ChatGPT
openai.api.key=your-openai-api-key-here
```

**Option 2: Set Environment Variables (Recommended)**

```bash
export CLAUDE_API_KEY=your-claude-api-key-here
export OPENAI_API_KEY=your-openai-api-key-here
```

**Note:** You can use the app without API keys - it will return demo responses. Configure at least one API key for real AI responses.

#### Build and Run

Using Gradle wrapper (recommended):
```bash
cd backend
./gradlew bootRun
```

Or using system Gradle:
```bash
cd backend
gradle bootRun
```

The backend will start on `http://localhost:8080`

#### GraphiQL Interface

Once running, you can access the GraphiQL interface at:
- http://localhost:8080/graphiql

### 3. Frontend Setup

#### Install Dependencies

```bash
cd frontend
npm install
```

#### Run Development Server

```bash
npm start
```

The frontend will start on `http://localhost:4200`

## Usage

1. Open your browser and navigate to `http://localhost:4200`
2. You'll see the Chatium chat interface
3. **Select your AI provider** using the dropdown in the header (Claude or ChatGPT)
4. Type a message in the input field and press "Send" or hit Enter
5. The selected AI will respond to your message
6. **Switch providers anytime** - just select a different AI from the dropdown
7. Use the "Clear" button to delete all messages and start fresh

## GraphQL API

### Queries

#### Get All Messages
```graphql
query {
  messages {
    id
    content
    role
    timestamp
  }
}
```

#### Get Single Message
```graphql
query {
  message(id: "message-id") {
    id
    content
    role
    timestamp
  }
}
```

### Mutations

#### Send Message

With Claude (default):
```graphql
mutation {
  sendMessage(input: { content: "Hello, Claude!", provider: "claude" }) {
    id
    content
    role
    timestamp
  }
}
```

With ChatGPT:
```graphql
mutation {
  sendMessage(input: { content: "Hello, ChatGPT!", provider: "openai" }) {
    id
    content
    role
    timestamp
  }
}
```

#### Clear Messages
```graphql
mutation {
  clearMessages
}
```

## API Endpoints

- **GraphQL Endpoint**: `http://localhost:8080/graphql`
- **GraphiQL Interface**: `http://localhost:8080/graphiql`

## Development

### Backend Development

The backend uses Spring Boot DevTools for hot reloading. Any changes to Java files will automatically restart the application.

### Frontend Development

Angular's development server supports hot module replacement. Changes to TypeScript or HTML files will automatically reload in the browser.

## Building for Production

### Backend

Using Gradle wrapper:
```bash
cd backend
./gradlew build
java -jar build/libs/backend-1.0.0.jar
```

Or using system Gradle:
```bash
cd backend
gradle build
java -jar build/libs/backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `dist/` folder.

## Getting API Keys

### Claude API Key

1. Visit https://console.anthropic.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add credits to your account

### OpenAI API Key

1. Visit https://platform.openai.com/
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Add credits to your account

## Troubleshooting

### Backend Issues

- **Port 8080 already in use**: Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```

- **Claude API errors**: Ensure your Claude API key is correctly set and valid

- **OpenAI API errors**: Ensure your OpenAI API key is correctly set and valid

### Frontend Issues

- **CORS errors**: Ensure the backend is running and the CORS configuration in `WebConfig.java` includes your frontend URL

- **GraphQL connection errors**: Verify the backend URL in `app.config.ts` matches your backend server

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Claude AI by Anthropic
- ChatGPT by OpenAI
- Spring Boot team
- Angular team
- Tailwind CSS team
- Apollo GraphQL team
