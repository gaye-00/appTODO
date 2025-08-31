package com.gaye.dotoApp.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.gaye.dotoApp.model.Permission;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthEntryPointHandleErrors authEntryPointHandleErrors;
    private final AuthenticationProvider authenticationProvider;
    private final LogoutHandler logoutHandler;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())  // Désactiver CSRF pour simplifier (peut être activé selon tes besoins)
            .cors(withDefaults()) // Configurer les CORS si nécessaire
            .authorizeHttpRequests(auth -> auth
                // Access pour tout les mondes
                .requestMatchers(HttpMethod.GET, "/v1/auth/validate").permitAll()
                .requestMatchers(HttpMethod.POST, "/v1/register/developer", "/v1/auth/login", "/v1/auth/refresh-token", "/v1/confirm", "/v1/reSendConfirmation").permitAll()
                // Access pour les admin
                .requestMatchers(HttpMethod.GET,  "/v1/admins/**").hasAuthority(Permission.ADMIN_READ.getPermission())
                .requestMatchers(HttpMethod.POST, "/v1/admins/**").hasAuthority(Permission.ADMIN_CREATE.getPermission())
                .requestMatchers(HttpMethod.PATCH,  "/v1/admins/{id}").hasAuthority(Permission.ADMIN_UPDATE.getPermission())
                .requestMatchers(HttpMethod.DELETE, "/v1/admins/**").hasAuthority(Permission.ADMIN_DELETE.getPermission())
                // projet
                .requestMatchers(HttpMethod.GET, "/v1/projets/developer/{id}").hasAnyAuthority(Permission.ADMIN_READ.getPermission(), Permission.DEVELOPER_READ.getPermission())
                .requestMatchers(HttpMethod.GET,  "/v1/projets/**").hasAuthority(Permission.ADMIN_READ.getPermission())
                .requestMatchers(HttpMethod.POST, "/v1/projets/**").hasAnyAuthority(Permission.ADMIN_CREATE.getPermission(), Permission.DEVELOPER_CREATE.getPermission())
                .requestMatchers(HttpMethod.PATCH,  "/v1/projets/{id}").hasAnyAuthority(Permission.ADMIN_UPDATE.getPermission(), Permission.DEVELOPER_UPDATE.getPermission())
                .requestMatchers(HttpMethod.DELETE, "/v1/projets/{id}").hasAuthority(Permission.DEVELOPER_DELETE.getPermission())
                .requestMatchers(HttpMethod.DELETE, "/v1/projets/**").hasAuthority(Permission.ADMIN_DELETE.getPermission())
                // taches
                .requestMatchers(HttpMethod.GET,  "/v1/taches/**").hasAuthority(Permission.ADMIN_READ.getPermission())
                .requestMatchers(HttpMethod.PUT,  "/v1/taches/{id}/statut/{statut}").hasAuthority(Permission.DEVELOPER_UPDATE.getPermission())
                .requestMatchers(HttpMethod.POST, "/v1/taches/**").hasAnyAuthority(Permission.ADMIN_CREATE.getPermission(), Permission.DEVELOPER_CREATE.getPermission())
                .requestMatchers(HttpMethod.PATCH,  "/v1/taches/{id}").hasAuthority(Permission.ADMIN_UPDATE.getPermission())
                .requestMatchers(HttpMethod.DELETE, "/v1/taches/{id}").hasAuthority(Permission.DEVELOPER_DELETE.getPermission())
                .requestMatchers(HttpMethod.DELETE, "/v1/taches/**").hasAuthority(Permission.ADMIN_DELETE.getPermission())
                .anyRequest().authenticated())
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // JWT, donc pas de session
            .authenticationProvider(authenticationProvider)
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(authEntryPointHandleErrors))    // Gestion des erreurs d'authentification
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
            .logout(logout -> logout
            .logoutUrl("/v1/auth/logout")  // Définir l'URL de déconnexion
            .addLogoutHandler(logoutHandler)  // Ajoute un handler de déconnexion personnalisé
            .logoutSuccessHandler((request, response, authentication) -> {
                // Action à effectuer après une déconnexion réussie, par exemple nettoyer le contexte de sécurité
                SecurityContextHolder.clearContext();
                response.setStatus(HttpServletResponse.SC_OK);  // Optionnel: définir le statut HTTP
            }));

        return http.build();
    }

    // CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        System.out.println("\n\n CORS allowed origin: " + frontendUrl + "\n");
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin(frontendUrl); // Frontend URL from config
        // configuration.addAllowedOriginPattern("*"); // Allow all origins (use with caution)
        configuration.addAllowedMethod("*"); // Allow all HTTP methods
        configuration.addAllowedHeader("*"); // Allow all headers
        configuration.setAllowCredentials(true); // Allow credentials
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}