package com.chatium.backend.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class OpenAIService {

    private final WebClient webClient;
    private final String apiKey;

    public OpenAIService(@Value("${openai.api.key:}") String apiKey) {
        this.apiKey = apiKey;
        this.webClient = WebClient.builder()
                .baseUrl("https://api.openai.com/v1")
                .defaultHeader("Authorization", "Bearer " + apiKey)
                .defaultHeader("Content-Type", "application/json")
                .build();
    }

    public String sendMessage(String userMessage) {
        if (apiKey == null || apiKey.isEmpty()) {
            log.warn("OpenAI API key not configured");
            return "Hello! I'm a demo ChatGPT response. Please configure your OpenAI API key in application.properties to enable real ChatGPT responses.";
        }

        try {
            Map<String, Object> requestBody = Map.of(
                    "model", "gpt-4",
                    "messages", List.of(
                            Map.of(
                                    "role", "user",
                                    "content", userMessage
                            )
                    ),
                    "max_tokens", 1024
            );

            Map<String, Object> response = webClient.post()
                    .uri("/chat/completions")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            if (response != null && response.containsKey("choices")) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
                if (!choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }

            return "Sorry, I couldn't generate a response.";
        } catch (Exception e) {
            log.error("Error calling OpenAI API", e);
            return "Error: Unable to get response from ChatGPT. Please check your API key and try again.";
        }
    }
}
