import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ChatMessage {
  id: string;
  content: string;
  role: string;
  timestamp: string;
}

const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
      role
      timestamp
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($input: SendMessageInput!) {
    sendMessage(input: $input) {
      id
      content
      role
      timestamp
    }
  }
`;

const CLEAR_MESSAGES = gql`
  mutation ClearMessages {
    clearMessages
  }
`;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private apollo: Apollo) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.apollo
      .watchQuery<{ messages: ChatMessage[] }>({
        query: GET_MESSAGES,
      })
      .valueChanges.pipe(map((result) => result.data.messages));
  }

  sendMessage(content: string, provider: string = 'claude'): Observable<ChatMessage> {
    return this.apollo
      .mutate<{ sendMessage: ChatMessage }>({
        mutation: SEND_MESSAGE,
        variables: {
          input: { content, provider },
        },
        refetchQueries: [{ query: GET_MESSAGES }],
      })
      .pipe(map((result) => result.data!.sendMessage));
  }

  clearMessages(): Observable<boolean> {
    return this.apollo
      .mutate<{ clearMessages: boolean }>({
        mutation: CLEAR_MESSAGES,
        refetchQueries: [{ query: GET_MESSAGES }],
      })
      .pipe(map((result) => result.data!.clearMessages));
  }
}
