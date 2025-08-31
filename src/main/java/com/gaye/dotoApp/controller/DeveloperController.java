// package com.gaye.dotoApp.controller;

// import java.util.List;
// import java.util.Map;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PatchMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.gaye.dotoApp.dto.DeveloperRequest;
// import com.gaye.dotoApp.dto.DeveloperResponse;
// import com.gaye.dotoApp.service.DeveloperService;

// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;

// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/v1/developers")
// public class DeveloperController {

//     private final DeveloperService developerService;

//     @GetMapping
//     public ResponseEntity<List<DeveloperResponse>> getAll() {
//         return developerService.getAll();
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<DeveloperResponse> getById(@PathVariable("id") Integer id) {
//         return developerService.getById(id);
//     }

//     @PatchMapping("/{id}")
//     public ResponseEntity<String> patchUpdate(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
//         return developerService.patchUpdate(id, updates);
//     }

//     // @PostMapping
//     // public ResponseEntity<?> create(@RequestBody @Valid DeveloperRequest requestItem) {
//     //     return developerService.create(requestItem);
//     // }

//     @PutMapping("/{id}")
//     public ResponseEntity<String> update(@PathVariable("id") Integer id, @RequestBody @Valid DeveloperRequest requestItem) {
//         return developerService.update(id, requestItem);
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
//         return developerService.delete(id);
//     }
// }


package com.gaye.dotoApp.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaye.dotoApp.authentication.AuthenticationService;
import com.gaye.dotoApp.dto.DeveloperResponse;
import com.gaye.dotoApp.security.JwtService;
import com.gaye.dotoApp.service.DeveloperService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/developers")
public class DeveloperController {

    private final DeveloperService developerService;
    private final AuthenticationService authenticationService;
    private static final Logger logger = LoggerFactory.getLogger(DeveloperController.class);
    private final JwtService jwtService;

    @GetMapping
    public ResponseEntity<List<DeveloperResponse>> getAll() {
        return developerService.getAll();
    }

    @GetMapping("/admin/{id}")
    public DeveloperResponse getById(@PathVariable("id") Integer id) {
        return developerService.getById(id);
    }

    @GetMapping("/{id}")
    public DeveloperResponse getById(@PathVariable("id") Integer id, HttpServletRequest request) {
        // Extraire le token JWT de la requête
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7); // Retirer "Bearer "

        if (!jwtService.isTokenMatchingUser(id, jwtToken)) {
            logger.error("\nID : " + jwtService.getUserIdFromToken(jwtToken) + "Vous n'avez pas le droit d'accéder à cette ressource.");
            return null;
            // return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'avez pas le droit de modifier cette ressource.");
        }

        // Si tout est OK, passer à la mise à jour
        return developerService.getById(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> patchUpdate(@PathVariable Integer id, @RequestBody Map<String, Object> updates, HttpServletRequest request) {
        // Extraire le token JWT de la requête
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7); // Retirer "Bearer "

        if (!jwtService.isTokenMatchingUser(id, jwtToken)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'avez pas le droit de modifier cette ressource.");
        }

        // Si tout est OK, passer à la mise à jour
        return developerService.patchUpdate(id, updates);
    }

    // @GetMapping("/niveau/{id}")
    // public ResponseEntity<List<DeveloperResponse>> getStudent(@PathVariable Integer id) {
    //     try {
    //         return ResponseEntity.ok(developerService.getAllByclasseromm(id));

    //     } catch (Exception e) {
    //         return ResponseEntity.badRequest().build();
    //     }
    // }

    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        return developerService.delete(id);
    }

    @PostMapping("/blocked/{id}")
    public ResponseEntity<?> blocked(@PathVariable("id") Integer id) {
        // Revoquer et supprimer les tokens du user dans la base de données
        authenticationService.removeAccessUser(id);

        return developerService.blocked(id);
    }

    @PostMapping("/unblocked/{id}")
    public ResponseEntity<String> unblocked(@PathVariable Integer id) {
        // Revoquer et supprimer les tokens du user dans la base de données
        authenticationService.removeAccessUser(id);

        return developerService.unblocked(id);
    }
}

