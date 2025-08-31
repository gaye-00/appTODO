package com.gaye.dotoApp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.gaye.dotoApp.dto.TacheRequest;
import com.gaye.dotoApp.dto.TacheResponse;
import com.gaye.dotoApp.model.ETAT;
import com.gaye.dotoApp.model.PRIORITY;
import com.gaye.dotoApp.model.Tache;
import com.gaye.dotoApp.repository.ProjetRepository;
import com.gaye.dotoApp.repository.TacheRepository;

import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TacheService {

    private final TacheRepository tacheRepository;
    private final ProjetRepository projetRepository;
    private final Logger logger = LoggerFactory.getLogger(TacheService.class);


    public ResponseEntity<List<TacheResponse>> getAll() {
        try {
            List<Tache> items = new ArrayList<>();
            tacheRepository.findAll().forEach(items::add);

            if (items.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            List<TacheResponse> responseItems = items.stream().map(this::mapToTacheResponse)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responseItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<TacheResponse> getById(Integer id) {
        Optional<Tache> existingItemOptional = tacheRepository.findById(id);

        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(mapToTacheResponse(existingItemOptional.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<String> create(TacheRequest tacheRequest) {
        try {
            tacheRepository.save(mapToTache(tacheRequest));

            logger.info("\n\n Tache create successfully.\n");
            return ResponseEntity.ok("Tache créée avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la creation =>" + e.getMessage());
        }
    }

    public ResponseEntity<String> update(Integer id, TacheRequest tacheRequest) {
        try {
            Optional<Tache> existingItemOptional = tacheRepository.findById(id);
            if(existingItemOptional.isPresent()) {
                Tache existingItem = existingItemOptional.get();

                if(StringUtils.isNotBlank(tacheRequest.getTitle())) {
                    existingItem.setTitle(tacheRequest.getTitle());
                }

                if(StringUtils.isNotBlank(tacheRequest.getDescription())) {
                    existingItem.setDescription(tacheRequest.getDescription());
                }

                if(tacheRequest.getEtat() != null) {
                    existingItem.setEtat((ETAT) tacheRequest.getEtat());
                }

                if(tacheRequest.getPriority() != null) {
                    existingItem.setPriority((PRIORITY) tacheRequest.getPriority());
                }

                if(tacheRequest.getDueDate() != null) {
                    existingItem.setDueDate(tacheRequest.getDueDate());
                }

                // if(tacheRequest.getProjetId() != null) {
                //     existingItem.setProjet(projetRepository.findById(tacheRequest.getProjetId())
                //             .orElseThrow(() -> new IllegalArgumentException("Projet not found for id: " + tacheRequest.getProjetId())));
                // }

                existingItem.setLastModifiedAt(LocalDateTime.now());

                tacheRepository.save(existingItem);

                return ResponseEntity.ok("Tache mise à jour avec succès");
            } else {
                return ResponseEntity.status(404)
                        .body("Erreur lors de la mise à jour => Tache inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du Tache => " + e.getMessage());
        }
    }

    public ResponseEntity<String> patchUpdate(Integer id, Map<String, Object> updates) {
        try {
            Optional<Tache> existingItemOptional = tacheRepository.findById(id);

            if (existingItemOptional.isPresent()) {
                Tache existingItem = existingItemOptional.get();

                if(updates.containsKey("title")) {
                    existingItem.setTitle((String) updates.get("title"));
                }

                if(updates.containsKey("description")) {
                    existingItem.setDescription((String) updates.get("description"));
                }

                if(updates.containsKey("etat")) {
                    existingItem.setEtat((ETAT) updates.get("etat"));
                }

                if(updates.containsKey("priority")) {
                    existingItem.setPriority((PRIORITY) updates.get("priority"));
                }

                if(updates.containsKey("dueDate")) {
                    existingItem.setDueDate(LocalDateTime.parse((String) updates.get("dueDate")));
                }

                existingItem.setLastModifiedAt(LocalDateTime.now());
                tacheRepository.save(existingItem);

                return ResponseEntity.ok("Tache mise à jour avec succès");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erreur lors de la mise à jour => Tache inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du Tache => " + e.getMessage());
        }
    }

    public ResponseEntity<?> updateStatut(Integer id, String statut) {
        try {
            Optional<Tache> existingItemOptional = tacheRepository.findById(id);
            if (existingItemOptional.isPresent()) {
                Tache existingItem = existingItemOptional.get();
                ETAT newEtat = ETAT.valueOf(statut.toUpperCase());
                existingItem.setEtat(newEtat);
                existingItem.setLastModifiedAt(LocalDateTime.now());
                tacheRepository.save(existingItem);
                return ResponseEntity.ok(mapToTacheResponse(existingItem));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erreur lors de la mise à jour => Tache inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du statut de la Tache => " + e.getMessage());
        }
	}

    public ResponseEntity<HttpStatus> delete(Integer id) {
        try {
            tacheRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    public TacheResponse mapToTacheResponse(Tache projet) {
        return TacheResponse.builder()
                .id(projet.getId())
                .title(projet.getTitle())
                .description(projet.getDescription())
                .etat(projet.getEtat())
                .projetId(projet.getProjet() != null ? projet.getProjet().getId() : null)
                .priority(projet.getPriority())
                .dueDate(projet.getDueDate())
                .creatAt(projet.getCreatAt())
                .lastModifiedAt(projet.getLastModifiedAt())
                .build();
    }

    public Tache mapToTache(TacheRequest tacheRequest) {
        return Tache.builder()
                .title(Objects.requireNonNull(tacheRequest.getTitle(), "Title cannot be null"))
                .description(Objects.requireNonNull(tacheRequest.getDescription(), "Description cannot be null"))
                .etat(Objects.requireNonNullElse(tacheRequest.getEtat(), ETAT.EN_ATTENTE))
                .projet(projetRepository.findById(tacheRequest.getProjetId())
                        .orElseThrow(() -> new IllegalArgumentException("Projet not found for id: " + tacheRequest.getProjetId())))
                .priority(tacheRequest.getPriority())
                .dueDate(Objects.requireNonNullElse(tacheRequest.getDueDate(), LocalDateTime.now().plusDays(7)))
                .creatAt(LocalDateTime.now())
                .lastModifiedAt(LocalDateTime.now())
                .build();
    }
}



