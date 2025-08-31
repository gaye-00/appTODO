package com.gaye.dotoApp.security;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import com.gaye.dotoApp.token.AccessTokenRepository;
import com.gaye.dotoApp.token.RefreshTokenRepository;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogOutService implements LogoutHandler {

    private final AccessTokenRepository accessTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        // Récupération de l'access token
        final String authenticationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String jwtToken;

        if (authenticationHeader == null || !authenticationHeader.startsWith("Bearer ")) {
            return;
        }

        jwtToken = authenticationHeader.substring(7);
        var storedAccessToken = accessTokenRepository.findByAccessToken(jwtToken).orElse(null);

        // Invalidation de l'access token
        if (storedAccessToken != null) {
            storedAccessToken.setExpired(true);
            storedAccessToken.setRevoked(true);
            accessTokenRepository.save(storedAccessToken);
        }

        // Récupération du refresh token à partir des cookies
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    String refreshTokenValue = cookie.getValue();

                    // Récupération du refresh token en base de données
                    var storedRefreshToken = refreshTokenRepository.findByRefreshToken(refreshTokenValue).orElse(null);

                    // Invalidation du refresh token
                    if (storedRefreshToken != null) {
                        storedRefreshToken.setExpired(true);
                        storedRefreshToken.setRevoked(true);
                        refreshTokenRepository.save(storedRefreshToken);
                    }

                    // Suppression du cookie du refresh token
                    Cookie deleteCookie = new Cookie("refresh_token", null);
                    deleteCookie.setHttpOnly(true);
                    deleteCookie.setSecure(true);
                    deleteCookie.setPath("/");
                    deleteCookie.setMaxAge(0); // Supprime le cookie
                    response.addCookie(deleteCookie);
                }
            }
        }
    }
}
