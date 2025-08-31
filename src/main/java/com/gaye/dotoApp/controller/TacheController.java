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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaye.dotoApp.dto.ProjetResponse;
import com.gaye.dotoApp.dto.TacheRequest;
import com.gaye.dotoApp.dto.TacheResponse;
import com.gaye.dotoApp.security.JwtService;
import com.gaye.dotoApp.service.ProjetService;
import com.gaye.dotoApp.service.TacheService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/taches")
public class TacheController {

    private final TacheService tacheService;
    private final ProjetService projetService;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(TacheController.class);

    @GetMapping
    public ResponseEntity<List<TacheResponse>> getAll() {
        return tacheService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TacheResponse> getById(@PathVariable("id") Integer id) {
        return tacheService.getById(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> patchUpdate(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
        return tacheService.patchUpdate(id, updates);
    }

    // @PatchMapping("/{id}")
    // public ResponseEntity<String> patchUpdateENCOURS(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
    //     return tacheService.patchUpdateENCOURS(id, updates);
    // }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid TacheRequest requestItem) {
        return tacheService.create(requestItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Integer id, @RequestBody @Valid TacheRequest requestItem) {
        return tacheService.update(id, requestItem);
    }

    /**
     * Mettre à jour le statut d'une tâche
     * @param id ID de la tâche
     * @param statut Nouveau statut
     * @returns Tâche mise à jour
     */
    @PutMapping("/{id}/statut/{statut}")
    public ResponseEntity<?> updateStatut(@PathVariable("id") Integer id, @PathVariable("statut") String statut) {
        return tacheService.updateStatut(id, statut);
    }

    // @DeleteMapping("/{id}")
    // public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
    //     return tacheService.delete(id);
    // }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id, HttpServletRequest request) {
        // Extraire le token JWT de la requête
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7); // Retirer "Bearer "

        // Aller chercher la tache
        TacheResponse tacheResponse = tacheService.getById(id).getBody();

        // Vérifier si la tâche existe et si elle est associée à un projet
        if (tacheResponse == null || tacheResponse.getProjetId() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(HttpStatus.NOT_FOUND);
        }

        // Aller chercher le projet associé à la tâche
        ProjetResponse projetResponse = projetService.getById(tacheResponse.getProjetId()).getBody();

        // Vérifier si le projet existe
        if (projetResponse == null || projetResponse.getDeveloperId() == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(HttpStatus.NOT_FOUND);
        }

        // Vérifier si le token JWT correspond à l'utilisateur du projet
        if (!jwtService.isTokenMatchingUser(projetResponse.getDeveloperId(), jwtToken)) {
            logger.error("\nID : " + jwtService.getUserIdFromToken(jwtToken) + " Vous n'avez pas le droit de supprimer cette ressource.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(HttpStatus.FORBIDDEN); 
        }

        return tacheService.delete(id);
    }
}

