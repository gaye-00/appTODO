package com.gaye.dotoApp.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaye.dotoApp.dto.DeveloperRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping
public class AuthenticationController {

	private final AuthenticationService authenticationService;
	private final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

	@PostMapping("/v1/register/developer")
	public ResponseEntity<?> register(@RequestBody DeveloperRequest request) {
		try {
			// Appel du service pour enregistrer l'étudiant
			logger.info("\n Controller request {}", request);
			return ResponseEntity.ok(authenticationService.register(request));
		} catch (DataIntegrityViolationException e) {
			// Gérer l'erreur en cas de doublon d'email
			return ResponseEntity.status(HttpStatus.CONFLICT)
					.body("L'email est déjà utilisé. Veuillez en utiliser un autre.");
		} catch (Exception e) {
			// Gérer toutes les autres exceptions
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Une erreur s'est produite lors de l'enregistrement.");
		}
	}

	@PostMapping("/v1/auth/login")
	public ResponseEntity<?> login(@RequestBody AuthenticationRequest request, HttpServletResponse response) {
		try {
			// Appeler la méthode login qui renvoie à la fois l'access token, refresh token et l'utilisateur
			AuthenticationResponse authResponse = authenticationService.login(request);

			// Ajouter le refresh token comme cookie HttpOnly
			ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", authResponse.getRefreshToken())
				.httpOnly(true)           // Empêcher l'accès en JavaScript
				.secure(false)             // S'assurer que le cookie est envoyé uniquement via HTTPS TODO : true
				.path("/")                // Disponible sur tout le site
				.maxAge(100 * 24 * 60 * 60) // Durée de validité de 100 jours 
				.sameSite("Strict")       // Renforcer la politique de sécurité SameSite
				.build();

			// Ajouter l'en-tête Set-Cookie avec le refresh token
			response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());

			// Retourner la réponse avec l'access token dans le corps
			return ResponseEntity.ok()
					.header(HttpHeaders.AUTHORIZATION, "Bearer " + authResponse.getAccessToken())
					.body(authResponse);

		} catch (IllegalStateException e) {
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Échec de la connexion : l'email ou le mot de passe est incorrect.");
		}
	}

	@PostMapping("/v1/auth/refresh-token")
	public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
		try {
			logger.info("\n\n Refresh token request received.\n");
			return authenticationService.refreshToken(request, response);
		} catch (DataIntegrityViolationException ex) {
			// Si c'est une violation d'intégrité, comme un doublon
			if (ex.getCause() instanceof org.hibernate.exception.ConstraintViolationException) {
				return ResponseEntity.status(HttpStatus.CONFLICT)
						.body("Le token existe déjà dans la base de données. Veuillez réessayer.");
			} else {
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body("Erreur de base de données : " + ex.getMessage());
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Échec lors de la génération du nouveau token.");
		}
	}


	@GetMapping("/v1/auth/validate")
	public ResponseEntity<?> validateToken(HttpServletRequest request) {
		// try {
		// 	boolean isValid = authenticationService.validateToken(token);
		// 	if (isValid) {
		// 		return ResponseEntity.ok("Token valide");
		// 	} else {
		// 		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token invalide");
		// 	}
		// } catch (Exception e) {
		// 	return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
		// 			.body("Erreur lors de la validation du token : " + e.getMessage());
		// }
		String token = request.getHeader(HttpHeaders.AUTHORIZATION);
		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7);
		}
		boolean isValid = authenticationService.validateToken(token);
		if (isValid) {
			return ResponseEntity.ok("Token valide");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token invalide");
		}
	}

	@PostMapping("/v1/confirm")
	public ResponseEntity<?> confirmAccount(@RequestBody ConfirmRequest confirmRequest) {
		return authenticationService.confirmAccount(confirmRequest.getEmail(), confirmRequest.getVerificationCode());
	}

	@PostMapping("/v1/reSendConfirmation")
	public ResponseEntity<?> reSendConfirmation(@RequestBody String email) {
		authenticationService.reSendConfirmationCode(email);
		return ResponseEntity.ok("Un nouveau code de confirmation a été envoyé.");
	}
}
