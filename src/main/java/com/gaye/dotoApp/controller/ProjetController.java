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

import com.gaye.dotoApp.dto.ProjetRequest;
import com.gaye.dotoApp.dto.ProjetResponse;
import com.gaye.dotoApp.security.JwtService;
import com.gaye.dotoApp.service.ProjetService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/projets")
public class ProjetController {

    private final ProjetService projetService;
    private final JwtService jwtService;
    private static final Logger logger = LoggerFactory.getLogger(ProjetController.class);

    @GetMapping
    public ResponseEntity<List<ProjetResponse>> getAll() {
        return projetService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetResponse> getById(@PathVariable("id") Integer id) {
        return projetService.getById(id);
    }

    // Recuperer les projets d'un developpeur
    @GetMapping("/developer/{id}")
    public ResponseEntity<List<ProjetResponse>> getByDeveloperId(@PathVariable("id") Integer developerId, HttpServletRequest request) {
        // Extraire le token JWT de la requête
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7); // Retirer "Bearer "

        if (!jwtService.isTokenMatchingUser(developerId, jwtToken)) {
            logger.error("\nID :  " + jwtService.getUserIdFromToken(jwtToken) + "Vous n'avez pas le droit d'optenir cette ressource.");
            return null;
            // return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'avez pas le droit de modifier cette ressource.");
        }

        return projetService.getByDeveloperId(developerId);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> patchUpdate(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
        return projetService.patchUpdate(id, updates);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid ProjetRequest requestItem) {
        return projetService.create(requestItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Integer id, @RequestBody @Valid ProjetRequest requestItem) {
        return projetService.update(id, requestItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id, HttpServletRequest request) {
        // Extraire le token JWT de la requête
        String jwtToken = request.getHeader(HttpHeaders.AUTHORIZATION).substring(7); // Retirer "Bearer "

        ProjetResponse projetResponse = projetService.getById(id).getBody();

        if (projetResponse == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(HttpStatus.NOT_FOUND);
        }

        if (!jwtService.isTokenMatchingUser(projetResponse.getDeveloperId(), jwtToken)) {
            logger.error("\nID : " + jwtService.getUserIdFromToken(jwtToken) + " Vous n'avez pas le droit de supprimer cette ressource.");
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(HttpStatus.FORBIDDEN); 
        }

        // Supprimer les taches associées au projet avant de supprimer le projet
        projetService.deleteTachesByProjetId(id);
        return projetService.delete(id);
    }
}
