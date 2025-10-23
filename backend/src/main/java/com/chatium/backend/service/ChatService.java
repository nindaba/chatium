package com.chatium.backend.service;

import com.chatium.backend.model.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ClaudeService claudeService;
    private final List<ChatMessage> messages = new CopyOnWriteArrayList<>();
    private final Sinks.Many<ChatMessage> messageSink = Sinks.many().multicast().onBackpressureBuffer();

    public List<ChatMessage> getAllMessages() {
        return new ArrayList<>(messages);
    }

    public ChatMessage getMessage(String id) {
        return messages.stream()
                .filter(msg -> msg.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public ChatMessage sendMessage(String content) {
        // Add user message
        ChatMessage userMessage = ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .content(content)
                .role("user")
                .timestamp(Instant.now())
                .build();

        messages.add(userMessage);
        messageSink.tryEmitNext(userMessage);

        // Get Claude's response
        String claudeResponse = claudeService.sendMessage(content);

        // Add assistant message
        ChatMessage assistantMessage = ChatMessage.builder()
                .id(UUID.randomUUID().toString())
                .content(claudeResponse)
                .role("assistant")
                .timestamp(Instant.now())
                .build();

        messages.add(assistantMessage);
        messageSink.tryEmitNext(assistantMessage);

        return assistantMessage;
    }

    public boolean clearMessages() {
        messages.clear();
        return true;
    }

    public Flux<ChatMessage> subscribeToMessages() {
        return messageSink.asFlux();
    }
}
