package com.gaye.dotoApp.security;

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

/**
 * La classe AuthEntryPointHandleErrors est un point d'entrée d'authentification
 * personnalisé pour gérer les erreurs d'authentification.
 * Elle est utilisée pour renvoyer une réponse appropriée lorsqu'un utilisateur
 * non authentifié tente d'accéder à une ressource protégée.
 */
@Component
public class AuthEntryPointHandleErrors implements AuthenticationEntryPoint {

	/**
	 * Méthode pour commencer le processus d'authentification pour les utilisateurs
	 * non authentifiés.
	 * 
	 * @param request       La requête HTTP entrante.
	 * @param response      La réponse HTTP sortante.
	 * @param authException L'exception d'authentification générée lorsqu'un
	 *                      utilisateur non authentifié tente d'accéder à une
	 *                      ressource protégée.
	 * @throws IOException      Si une erreur d'entrée-sortie se produit lors de
	 *                          l'écriture de la réponse.
	 * @throws ServletException Si une erreur de servlet se produit.
	 */
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // Définir le statut de la réponse sur "Unauthorized" (401)
		response.setContentType(MediaType.APPLICATION_JSON_VALUE); // Définir le type de contenu de la réponse sur JSON

		// Écrire un message d'erreur JSON dans le corps de la réponse
		PrintWriter writer = response.getWriter();
		writer.println("Error: " + authException.getMessage());
	}
}
