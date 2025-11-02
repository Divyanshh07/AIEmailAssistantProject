package com.student.EmailAssistant;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.scheduler.Schedulers;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${gemini.api.key}")
    private String apiKey;

    public EmailGeneratorService() throws Exception {
        // ✅ SSL fix to trust all certs (for local dev only)
        SslContext sslContext = SslContextBuilder.forClient()
                .trustManager(InsecureTrustManagerFactory.INSTANCE)
                .build();

        HttpClient httpClient = HttpClient.create()
                .secure(t -> t.sslContext(sslContext))
                .responseTimeout(Duration.ofSeconds(60))
                .compress(true);

        this.webClient = WebClient.builder()
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        try {
            String prompt = buildPrompt(emailRequest);

            String requestBody = String.format("""
            {
              "contents": [
                {
                  "role": "user",
                  "parts": [{ "text": "%s" }]
                }
              ]
            }
            """, prompt.replace("\"", "\\\""));

            String uri = "/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey;

            // ✅ FIX: Run blocking code on elastic thread (safe)
            String response = webClient.post()
                    .uri(uri)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .subscribeOn(Schedulers.boundedElastic())
                    .block(Duration.ofSeconds(60));

            return extractResponseContent(response);

        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Error calling Gemini API: " + e.getMessage();
        }
    }

    private String extractResponseContent(String json) {
        try {
            JsonNode node = objectMapper.readTree(json);
            return node.path("candidates").get(0)
                    .path("content").path("parts").get(0)
                    .path("text").asText("⚠️ No content received from Gemini.");
        } catch (Exception e) {
            return "⚠️ Failed to parse Gemini response: " + e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder("Generate a professional email reply.\n");
        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Tone: ").append(emailRequest.getTone()).append("\n");
        }
        prompt.append("Original Email:\n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
