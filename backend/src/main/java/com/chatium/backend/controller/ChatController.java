package com.chatium.backend.controller;

import com.chatium.backend.model.ChatMessage;
import com.chatium.backend.model.SendMessageInput;
import com.chatium.backend.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SubscriptionMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @QueryMapping
    public List<ChatMessage> messages() {
        return chatService.getAllMessages();
    }

    @QueryMapping
    public ChatMessage message(@Argument String id) {
        return chatService.getMessage(id);
    }

    @MutationMapping
    public ChatMessage sendMessage(@Argument SendMessageInput input) {
        String provider = input.getProvider() != null ? input.getProvider() : "claude";
        return chatService.sendMessage(input.getContent(), provider);
    }

    @MutationMapping
    public Boolean clearMessages() {
        return chatService.clearMessages();
    }

    @SubscriptionMapping
    public Flux<ChatMessage> messageAdded() {
        return chatService.subscribeToMessages();
    }
}
