# Chatium - Chat Application with Claude AI

A full-stack chat application built with Spring Boot, Angular 20, Tailwind CSS, and GraphQL, featuring integration with Claude AI.

## Technology Stack

### Backend
- **Spring Boot 3.2.0** - Java backend framework
- **GraphQL** - API query language
- **Spring WebFlux** - Reactive HTTP client for Claude API
- **Maven** - Build and dependency management

### Frontend
- **Angular 20** - Modern web framework
- **Tailwind CSS** - Utility-first CSS framework
- **Apollo GraphQL Client** - GraphQL client for Angular
- **TypeScript** - Type-safe JavaScript

## Features

- Real-time chat interface with Claude AI
- Modern, responsive UI built with Tailwind CSS
- GraphQL API for efficient data fetching
- Message history management
- Clear chat functionality
- Beautiful gradient design with smooth animations

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
│   │   │   │       └── ClaudeService.java
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── graphql/
│   │   │           └── schema.graphqls
│   └── pom.xml
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
- **Maven 3.6** or higher
- **Claude API Key** (from Anthropic)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chatium
```

### 2. Backend Setup

#### Configure Claude API Key

Edit `backend/src/main/resources/application.properties` and add your Claude API key:

```properties
claude.api.key=your-api-key-here
```

Or set it as an environment variable:

```bash
export CLAUDE_API_KEY=your-api-key-here
```

#### Build and Run

```bash
cd backend
mvn clean install
mvn spring-boot:run
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
3. Type a message in the input field and press "Send" or hit Enter
4. Claude AI will respond to your message
5. All messages are displayed in a beautiful chat interface
6. Use the "Clear" button to delete all messages and start fresh

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
```graphql
mutation {
  sendMessage(input: { content: "Hello, Claude!" }) {
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

```bash
cd backend
mvn clean package
java -jar target/backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm run build
```

The production build will be in the `dist/` folder.

## Troubleshooting

### Backend Issues

- **Port 8080 already in use**: Change the port in `application.properties`:
  ```properties
  server.port=8081
  ```

- **Claude API errors**: Ensure your API key is correctly set and valid

### Frontend Issues

- **CORS errors**: Ensure the backend is running and the CORS configuration in `WebConfig.java` includes your frontend URL

- **GraphQL connection errors**: Verify the backend URL in `app.config.ts` matches your backend server

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Claude AI by Anthropic
- Spring Boot team
- Angular team
- Tailwind CSS team
- Apollo GraphQL team
