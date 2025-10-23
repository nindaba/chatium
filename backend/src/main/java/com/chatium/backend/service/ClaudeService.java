package com.chatium.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class ClaudeService {

    private final WebClient webClient;
    private final String apiKey;

    public ClaudeService(@Value("${claude.api.key:}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://api.anthropic.com/v1")
                .defaultHeader("x-api-key", apiKey)
                .defaultHeader("anthropic-version", "2023-06-01")
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String sendMessage(String userMessage) {
        if (apiKey == null || apiKey.isEmpty()) {
            log.warn("Claude API key not configured");
            return "Hello! I'm a demo response. Please configure your Claude API key in application.properties to enable real Claude responses.";
        }

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", "claude-3-5-sonnet-20241022",
                    "max_tokens", 1024,
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", userMessage
                            )
                    )
            );

            Map<String, Object> response = webClient.post()
                    .uri("/messages")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("content")) {
                List<Map<String, Object>> content = (List<Map<String, Object>>) response.get("content");
                if (!content.isEmpty()) {
                    return (String) content.get(0).get("text");
                }
            }

            return "Sorry, I couldn't generate a response.";
        } catch (Exception e) {
            log.error("Error calling Claude API", e);
            return "Error: Unable to get response from Claude. Please check your API key and try again.";
        }
    }
}
