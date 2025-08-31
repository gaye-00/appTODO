package com.gaye.dotoApp.security;

import java.util.Optional;
import java.security.Key;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.function.Function;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.gaye.dotoApp.model.User;
import com.gaye.dotoApp.token.AccessTokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class JwtService {

    // static final long EXPIRATION_TIME_ACCESS_TOKEN = 1 * 60 * 1000;
    static final long EXPIRATION_TIME_ACCESS_TOKEN = 30 * 60 * 1000; // 30 minutes
    // static final long EXPIRATION_TIME_REFRESH_TOKEN = 50 * 60 * 1000;
    static final long EXPIRATION_TIME_REFRESH_TOKEN = 100L * 24 * 60 * 60 * 1000; // 100 jours
    static final String PREFIX = "Bearer ";
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final AccessTokenRepository tokenRepository;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenExpired(LocalDateTime createdAt) {
        // Calcule la durée écoulée entre la création du token et maintenant
        Duration duration = Duration.between(createdAt, LocalDateTime.now());
        
        // Convertir EXPIRATION_TIME_ACCESS_TOKEN en millisecondes et vérifier si le token a expiré
        return duration.toMillis() > EXPIRATION_TIME_ACCESS_TOKEN;
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.
            parserBuilder()
            .setSigningKey(key)
            .build()
            .parseClaimsJws(token)
            .getBody();
    }

    // Méthode pour générer un access token avec des rôles et permissions
    public String generateAccessToken(UserDetails userDetails) {
        Map<String, Object> extraClaims = new HashMap<>();
        return buildToken(extraClaims, userDetails, EXPIRATION_TIME_ACCESS_TOKEN);
    }

    // Méthode pour générer un refresh token sans rôles ou permissions
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, EXPIRATION_TIME_REFRESH_TOKEN);
    }

    // Méthode pour construire le token
    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expirationTime) {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
            .signWith(key, SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean isTokenMatchingUser(Integer userId, String token) {
        // Utiliser la méthode du TokenRepository pour trouver l'utilisateur lié au token
        Optional<User> userFromToken = tokenRepository.findUserByToken(token);

        // Vérifier si l'utilisateur associé au token correspond à l'ID fourni
        return userFromToken.map(user -> user.getId().equals(userId)).orElse(false);
    }

    public Integer getUserIdFromToken(String token) {
        return tokenRepository.findUserByToken(token)
            .map(User::getId)
            .orElseThrow(() -> new IllegalArgumentException("Token invalide ou utilisateur non trouvé"));
    }     
}