package com.gaye.dotoApp.authentication;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;

import com.gaye.dotoApp.dto.AdminRequest;
import com.gaye.dotoApp.dto.DeveloperRequest;
import com.gaye.dotoApp.dto.UserResponse;
import com.gaye.dotoApp.email.EmailService;
import com.gaye.dotoApp.email.EmailTemplate;
import com.gaye.dotoApp.model.Admin;
import com.gaye.dotoApp.model.Developer;
import com.gaye.dotoApp.model.Role;
import com.gaye.dotoApp.model.User;
import com.gaye.dotoApp.repository.AdminRepository;
import com.gaye.dotoApp.repository.DeveloperRepository;
import com.gaye.dotoApp.repository.UserRepository;
import com.gaye.dotoApp.security.JwtService;
import com.gaye.dotoApp.service.AdminService;
import com.gaye.dotoApp.service.DeveloperService;
import com.gaye.dotoApp.token.AccessToken;
import com.gaye.dotoApp.token.AccessTokenRepository;
import com.gaye.dotoApp.token.RefreshToken;
import com.gaye.dotoApp.token.RefreshTokenRepository;
import com.gaye.dotoApp.token.TokenType;

import java.util.Objects;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import java.time.LocalDateTime;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final AdminRepository adminRepository;
    private final AdminService adminService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final AccessTokenRepository accessTokenRepository;
    private final RefreshTokenRepository refreshTokenRepository;
	private final DeveloperRepository developerRepository;
    private final DeveloperService developerService;
    private final EmailService emailService;
	private final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    // private final EmailServiceImpl emailServiceImpl;

    public AuthenticationResponse register(DeveloperRequest request) {
        // Vérifier si un developeur avec cet email existe déjà dans la base de données
        Optional<Developer> existingDeveloperOpt = developerRepository.findByEmail(request.getEmail());

        Developer developer;
        if (existingDeveloperOpt.isPresent()) {
            developer = existingDeveloperOpt.get();

            if (!developer.isActive()) {
                // Mettre à jour les informations si developeur n'a pas encore activé son compte
                developer.setPassword(passwordEncoder.encode(request.getPassword()));
                developer.setRole(Role.DEVELOPER);
                developer.setFirstName(request.getFirstName());
                developer.setLastName(request.getLastName());
                developer.setSpeciality((request.getSpeciality()));
                developer.setLastModifiedAt(LocalDateTime.now());

                developer.setActive(true); //TODO Activer le compte pour le dev

                // Générer un nouveau code de vérification et le sauvegarder
                String verificationCode = generateVerificationCode();
                developer.setVerificationCode(verificationCode);
                developerRepository.save(developer);

                
                // Préparer les données pour le template
                Context context = new Context();
                context.setVariable("firstName", developer.getFirstName());
                context.setVariable("lastName", developer.getLastName());
                context.setVariable("email", developer.getEmail());
                context.setVariable("verificationCode", verificationCode);
                
                // Ré-envoyer l'email de confirmation TODO
                // emailService.sendEmail(
                //     developer.getEmail(),
                //     "Confirmation de votre compte",
                //     EmailTemplate.INSCRIPTION_CONFIRMATION,
                //     context
                // );

                // Retourner une réponse sans token car le compte n'est pas activé
                return AuthenticationResponse.builder()
                        .accessToken(null)
                        .refreshToken(null)
                        .user(mapToUserResponse(developer))
                        .build();
            } else {
                // Si developeur est actif, lever une exception pour indiquer que l'email est déjà utilisé
                throw new DataIntegrityViolationException("Cet email est déjà utilisé par un compte activé.");
            }
        } else {
            // Créer un nouvel developeur si l'email n'existe pas encore
            developer = developerService.mapToDeveloper(new DeveloperRequest(
                request.getSpeciality(), request.getFirstName(), request.getLastName(),
                passwordEncoder.encode(request.getPassword()), request.getEmail()
            ));

            developer.setRole(Role.DEVELOPER);
            developer.setActive(true); //TODO Activer le compte par défaut
            developer.setPassword(passwordEncoder.encode(request.getPassword()));
            developer.setCreatAt(LocalDateTime.now());
            developer.setLastModifiedAt(LocalDateTime.now());  

            
            // Générer et sauvegarder le code de vérification
            String verificationCode = generateVerificationCode();
            developer.setVerificationCode(verificationCode);

            // Enregistrer developeur dans la base de données
            var savedStudent = developerRepository.save(developer);

            // Préparer les données pour le template
            Context context = new Context();
            context.setVariable("firstName", savedStudent.getFirstName());
            context.setVariable("lastName", savedStudent.getLastName());
            context.setVariable("email", savedStudent.getEmail());
            context.setVariable("verificationCode", verificationCode);

            // Ré-envoyer l'email de confirmation TODO
            // emailService.sendEmail(
            //     savedStudent.getEmail(),
            //     "Confirmation de votre compte",
            //     EmailTemplate.INSCRIPTION_CONFIRMATION,
            //     context
            // );

            // Retourner une réponse sans token car le compte n'est pas activé
            return AuthenticationResponse.builder()
                    .accessToken(null)
                    .refreshToken(null)
                    .user(mapToUserResponse(savedStudent))
                    .build();
        }
    }

    public AuthenticationResponse register(AdminRequest request) {

        Admin admin = adminService.mapToAdmin(new AdminRequest(request.getFirstName(), request.getLastName(), request.getEmail(), passwordEncoder.encode(request.getPassword())));
        admin.setRole(Role.ADMIN);
        admin.setActive(true);
        admin.setCreatAt(LocalDateTime.now());
        admin.setLastModifiedAt(LocalDateTime.now());
        adminRepository.save(admin);

        // Mapper l'utilisateur en réponse
        var userResponse = mapToUserResponse(admin);

        // Retourner les informations de l'utilisateur sans les tokens
        return AuthenticationResponse.builder()
            .accessToken(null)
            .refreshToken(null)
            .user(userResponse)
            .build();
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        // Authentifier l'utilisateur
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
    
        // Trouver l'utilisateur
        var user = userRepository.findByEmail(request.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
    
        // Vérifier si l'utilisateur est actif
        if (!user.isActive()) {
            throw new IllegalStateException("Votre compte n'est pas activé. Veuillez vérifier votre email pour l'activer.");
        }

        // Vérifier si l'utilisateur n'est pas bloqué
        if (user.isBlocked()) {
            throw new IllegalStateException("Votre compte est bloqué.");
        }
    
        // Supprimer les anciens access tokens et refresh tokens
        deleteAllUserTokens(user);
    
        // Générer un nouvel access token
        var jwtAccessToken = jwtService.generateAccessToken(user);
    
        // Générer un nouveau refresh token
        var jwtRefreshToken = jwtService.generateRefreshToken(user);
    
        // Enregistrer le nouvel access token dans la base de données
        saveUserAccessToken(user, jwtAccessToken);
    
        // Enregistrer le nouveau refresh token dans la base de données
        saveUserRefreshToken(user, jwtRefreshToken);
    
        // Mapper l'utilisateur en réponse
        var userResponse = mapToUserResponse(user);

        logger.info("\nL'utilisateur {} s'est connecté avec succès\n", user.getEmail());
    
        // Retourner le token et les informations de l'utilisateur
        return AuthenticationResponse.builder()
            .accessToken(jwtAccessToken)
            .refreshToken(jwtRefreshToken)
            .user(userResponse)
            .build();
    }

    public ResponseEntity<String> confirmAccount(String email, String verificationCode) {
        Optional<Developer> developerOpt = developerRepository.findByEmail(email);

        if (developerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Developeur non trouvé.");
        }

        Developer developer = developerOpt.get();

        if (!Objects.equals(developer.getVerificationCode(), verificationCode)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Code de vérification incorrect.");
        }

        developer.setActive(true);
        developer.setVerificationCode(null);  // Clear the verification code after confirmation
        developerRepository.save(developer);

        return ResponseEntity.ok("Compte activé avec succès.");
    }

    public void reSendConfirmationCode(String email) {
        // Vérifier si un étudiant avec cet email existe
        Optional<Developer> developerOpt = developerRepository.findByEmail(email);
        
        if (developerOpt.isPresent()) {
            Developer developer = developerOpt.get();
            
            // Vérifier si l'étudiant n'a pas encore activé son compte
            if (!developer.isActive()) {
                // Générer un nouveau code de vérification
                String newVerificationCode = generateVerificationCode();
                
                // Mettre à jour le code de vérification
                developer.setVerificationCode(newVerificationCode);
                
                // Enregistrer les modifications dans la base de données
                developerRepository.save(developer);
                
                // Préparer les données pour le template
                Context context = new Context();
                context.setVariable("firstName", developer.getFirstName());
                context.setVariable("lastName", developer.getLastName());
                context.setVariable("email", developer.getEmail());
                context.setVariable("verificationCode", newVerificationCode);

                // Ré-envoyer l'email de confirmation avec le nouveau code
                emailService.sendEmail(
                    developer.getEmail(),
                    "Confirmation de votre compte",
                    EmailTemplate.INSCRIPTION_CONFIRMATION,
                    context
                );
            } else {
                // Lever une exception si le compte est déjà activé
                throw new RuntimeException("Ce compte est déjà activé.");
            }
        } else {
            // Lever une exception si aucun compte n'a été trouvé avec cet email
            throw new RuntimeException("Aucun compte trouvé avec cet email.");
        }
    }

    private void saveUserAccessToken(User user, String jwtToken) {
        // Vérifier si le token existe déjà
         if (accessTokenRepository.findByAccessToken(jwtToken).isPresent()) {
             return; // Ne rien faire si le token existe déjà
         }
        AccessToken token = AccessToken.builder()
            .user(user)
            .accessToken(jwtToken)
            .tokentype(TokenType.BEARER)
            .revoked(false)
            .expired(false)
            .creatAt(LocalDateTime.now())
            .createdBy(user.getFirstName() + " " + user.getLastName())
            .build();
        accessTokenRepository.save(token);
    }

    private void saveUserRefreshToken(User user, String jwtToken) {
        RefreshToken refeshToken = RefreshToken.builder()
            .user(user)
            .refreshToken(jwtToken)
            .tokentype(TokenType.BEARER)
            .revoked(false)
            .expired(false)
            .creatAt(LocalDateTime.now())
            .createdBy(user.getFirstName() + " " + user.getLastName())
            .build();
        refreshTokenRepository.save(refeshToken);
    }
    
    private void revokeAllUserAccessTokens(User user) {
        List<AccessToken> validUserTokens = accessTokenRepository.findAllValidTokensByUser(user.getId());
    
        if(validUserTokens.isEmpty())
            return;
    
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
    
        accessTokenRepository.saveAll(validUserTokens);
    }

    private String generateVerificationCode() {
        return String.valueOf((int)(Math.random() * 900000) + 100000);  // 6-digit code
    }

    public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
        // Récupérer les cookies
        Cookie[] cookies = request.getCookies();
        String jwtRefreshToken = null;
    
        // Parcourir les cookies pour trouver le refresh token
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    jwtRefreshToken = cookie.getValue();
                }
            }
        }
    
        // Si le refresh token n'est pas trouvé dans les cookies, retourner une erreur
        if (jwtRefreshToken == null) {
            logger.error("\n\nRefresh token not found in cookies. \n");
            return ResponseEntity.badRequest().body("Refresh token manquant ou invalide.");
        }
    
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByRefreshToken(jwtRefreshToken);
    
        // Si le refresh token n'est pas trouvé ou est invalide
        if (!refreshToken.isPresent() || refreshToken.get().isExpired() || refreshToken.get().isRevoked()) {
            return ResponseEntity.badRequest().body("Refresh token manquant ou invalide.");
        }
    
        // Extraire l'email de l'utilisateur à partir du refresh token
        String userEmail = jwtService.extractUsername(jwtRefreshToken);
    
        if (userEmail != null) {
            // Chercher l'utilisateur dans la base de données
            var userDetails = this.userRepository.findByEmail(userEmail)
                    .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));
    
            // Vérifier si un access token valide existe pour l'utilisateur
            List<AccessToken> validTokens = accessTokenRepository.findAllValidTokensByUser(userDetails.getId());

            // Vérifier si le token est valide (non expiré et correspond à l'utilisateur)
            if(!validTokens.isEmpty() && jwtService.isTokenExpired(validTokens.get(0).getCreatAt())) {
                validTokens = new ArrayList<>();
            }
    
            if (!validTokens.isEmpty()) {
                // Si un token valide existe, retourner ce token sans en générer un nouveau
                String existingToken = validTokens.get(0).getAccessToken();
    
                // Créer la réponse avec l'access token existant
                var authenticationResponse = AuthenticationResponse.builder()
                        .accessToken(existingToken)
                        .user(mapToUserResponse(userDetails))
                        .build();
    
                return ResponseEntity.ok(authenticationResponse);
            } else {
                // Si aucun token valide n'est trouvé, générer un nouveau access token
                String accessToken = jwtService.generateAccessToken(userDetails);

                logger.info("\n\n L'access token {}\n", accessToken);
    
                // Révoquer les anciens tokens et supprimer ceux qui ne sont plus valides
                revokeAllUserAccessTokens(userDetails);
                saveUserAccessToken(userDetails, accessToken);
    
                // Créer la réponse avec le nouvel access token
                var authenticationResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .user(mapToUserResponse(userDetails))
                        .build();
    
                return ResponseEntity.ok(authenticationResponse);
            }
        }
    
        // Retourner une réponse d'erreur si le refresh token est invalide
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token invalide.");
    }
    
    private void deleteAllUserTokens(User user) {
        // Supprimer tous les anciens access tokens et refresh tokens associés à l'utilisateur
        accessTokenRepository.deleteByUser(user);
        refreshTokenRepository.deleteByUser(user);
    }

    public void removeAccessUser(Integer userId) {
        // Chercher l'utilisateur dans la base de données
        var user = this.userRepository.findById(userId).orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé"));

        revokeAllUserAccessTokens(user);
        accessTokenRepository.deleteByUser(user);
        refreshTokenRepository.deleteByUser(user);
    }

    public boolean validateToken(String token) {
        if (token == null || token.isEmpty()) {
            return false; // Token invalide
        }

        // Vérifier si le token est expiré
        if (jwtService.isTokenExpired(token)) {
            return false; // Token expiré
        }

        // Vérifier si le token existe dans la base de données
        Optional<AccessToken> accessToken = accessTokenRepository.findByAccessToken(token);
        if (accessToken.isEmpty() || accessToken.get().isRevoked() || accessToken.get().isExpired()) {
            return false; // Token non trouvé ou révoqué
        }

        return true; // Token valide
    }
    
    private UserResponse mapToUserResponse(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .role(user.getClass().getSimpleName().toLowerCase())
                .firstName(Objects.requireNonNull(user.getFirstName(), "Firstname can't be null"))
                .lastName(Objects.requireNonNull(user.getLastName(), "Lastname can't be null"))
                .email(Objects.requireNonNull(user.getEmail(), "Email can't be null"))
                .active(user.isActive())
                .build();
    }
}

