package com.gaye.dotoApp.authentication;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.gaye.dotoApp.dto.UserResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @JsonProperty("access_token")
    private String accessToken;

    // Supprime le refresh token du corps de la réponse si nécessaire
    @JsonIgnore
    @JsonProperty("refresh_token")
    private String refreshToken;

    private UserResponse user;
}
