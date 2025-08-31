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

import com.gaye.dotoApp.dto.ProjetRequest;
import com.gaye.dotoApp.dto.ProjetResponse;
import com.gaye.dotoApp.model.Projet;
import com.gaye.dotoApp.repository.DeveloperRepository;
import com.gaye.dotoApp.repository.ProjetRepository;
import com.gaye.dotoApp.repository.TacheRepository;

import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProjetService {

    private final ProjetRepository projetRepository;
    private final DeveloperRepository developerRepository;
    private final TacheRepository tacheRepository;
    private final Logger logger = LoggerFactory.getLogger(ProjetService.class);


    public ResponseEntity<List<ProjetResponse>> getAll() {
        try {
            List<Projet> items = new ArrayList<>();
            projetRepository.findAll().forEach(items::add);

            if (items.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            List<ProjetResponse> responseItems = items.stream().map(this::mapToProjetResponse)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responseItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<ProjetResponse>> getByDeveloperId(Integer developerId) {
        try {
            return new ResponseEntity<>(projetRepository.findByDeveloperId(developerId)
                    .stream()
                    .map(this::mapToProjetResponse)
                    .collect(Collectors.toList()), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<ProjetResponse> getById(Integer id) {
        Optional<Projet> existingItemOptional = projetRepository.findById(id);

        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(mapToProjetResponse(existingItemOptional.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<?> create(ProjetRequest projetRequest) {
        try {
            Projet projet = projetRepository.save(mapToProjet(projetRequest));

            logger.info("\n\n Projet create successfully.\n");
            // return ResponseEntity.ok("Projet créée avec succès");
            // return mapToProjetResponse(projet)
            return new ResponseEntity<>(mapToProjetResponse(projet), HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la creation =>" + e.getMessage());
        }
    }

    // public ResponseEntity<ProjetResponse> getLast() {
    //     try {
    //         Optional<Projet> existingItemOptional = projetRepository.findTopByOrderByCreatAtDesc();
    //         if (existingItemOptional.isPresent()) {
    //             return new ResponseEntity<>(mapToProjetResponse(existingItemOptional.get()), HttpStatus.OK);
    //         } else {
    //             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //         }
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    //     }
    // }

    public ResponseEntity<String> update(Integer id, ProjetRequest projetRequest) {
        try {
            Optional<Projet> existingItemOptional = projetRepository.findById(id);
            if(existingItemOptional.isPresent()) {
                Projet existingItem = existingItemOptional.get();

                if(StringUtils.isNotBlank(projetRequest.getTitle())) {
                    existingItem.setTitle(projetRequest.getTitle());
                }

                if(StringUtils.isNotBlank(projetRequest.getDescription())) {
                    existingItem.setDescription(projetRequest.getDescription());
                }

                existingItem.setLastModifiedAt(LocalDateTime.now());

                projetRepository.save(existingItem);

                return ResponseEntity.ok("Projet mise à jour avec succès");
            } else {
                return ResponseEntity.status(404)
                        .body("Erreur lors de la mise à jour => Projet inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du Projet => " + e.getMessage());
        }
    }

    public ResponseEntity<String> patchUpdate(Integer id, Map<String, Object> updates) {
        try {
            Optional<Projet> existingItemOptional = projetRepository.findById(id);

            if (existingItemOptional.isPresent()) {
                Projet existingItem = existingItemOptional.get();

                if(updates.containsKey("title")) {
                    existingItem.setTitle((String) updates.get("title"));
                }

                if(updates.containsKey("description")) {
                    existingItem.setDescription((String) updates.get("description"));
                }

                existingItem.setLastModifiedAt(LocalDateTime.now());
                projetRepository.save(existingItem);

                return ResponseEntity.ok("Projet mise à jour avec succès");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erreur lors de la mise à jour => Projet inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du Projet => " + e.getMessage());
        }
    }

    public ResponseEntity<HttpStatus> delete(Integer id) {
        try {
            projetRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    public void deleteTachesByProjetId(Integer id) {
        tacheRepository.deleteByProjetId(id);
    }

    // private ProductResponse mapToProductResponse(Product product) {
    //     ProductResponse.ProductResponseBuilder builder = ProductResponse.builder()

    //     .id(product.getId())
    //     .name(product.getName())
    //     .description(product.getDescription())
    //     .oldPrice(product.getOldPrice())
    //     .price(product.getPrice())
    //     .stockQuantity(product.getStockQuantity())
    //     // .valide(product.getValide())
    //     .sexe(product.getSexe())
    //     .point(product.getPoint())
    //     .creatAt(product.getCreatAt())
    //     .category_id(product.getCategory() != null ? product.getCategory().getId() : 0);
    //     // .pictures(product.getPictures() != null ? product.getPictures() : Collections.emptyList())
        
    //     List<PictureResponse> pictures = product.getPictures() != null
    //     ? product.getPictures().stream()
    //             .map(this::mapToPictureResponse)
    //             .collect(Collectors.toList())
    //     : Collections.emptyList();

    //     builder.pictures(pictures);

    //     return builder.build();
    // }

    public ProjetResponse mapToProjetResponse(Projet projet) {
        return ProjetResponse.builder()
                .id(projet.getId())
                .title(projet.getTitle())
                .description(projet.getDescription())
                .developerId(projet.getDeveloper() != null ? projet.getDeveloper().getId() : null)
                .taches(projet.getTaches())
                .creatAt(projet.getCreatAt())
                .lastModifiedAt(projet.getLastModifiedAt())
                .build();
    }

    public Projet mapToProjet(ProjetRequest projetRequest) {
        return Projet.builder()
                .title(Objects.requireNonNull(projetRequest.getTitle(), "Title cannot be null"))
                .description(Objects.requireNonNull(projetRequest.getDescription(), "Description cannot be null"))
                .developer(developerRepository.findById(projetRequest.getDeveloperId())
                        .orElseThrow(() -> new IllegalArgumentException("Developer not found for id: " + projetRequest.getDeveloperId())))
                .creatAt(LocalDateTime.now())
                .lastModifiedAt(LocalDateTime.now())
                .build();
    }
}



