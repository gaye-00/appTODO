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

import com.gaye.dotoApp.dto.DeveloperRequest;
import com.gaye.dotoApp.dto.DeveloperResponse;
import com.gaye.dotoApp.model.Developer;
import com.gaye.dotoApp.model.SPECIALITY;
import com.gaye.dotoApp.repository.DeveloperRepository;

import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DeveloperService {

    private final DeveloperRepository developerRepository;
    private final Logger logger = LoggerFactory.getLogger(DeveloperService.class);


    public ResponseEntity<List<DeveloperResponse>> getAll() {
        try {
            List<Developer> items = new ArrayList<>();
            developerRepository.findAll().forEach(items::add);

            if (items.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            List<DeveloperResponse> responseItems = items.stream().map(this::mapToDeveloperResponse)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responseItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public DeveloperResponse getById(Integer id) {
        Optional<Developer> existingItemOptional = developerRepository.findById(id);

        // if (existingItemOptional.isPresent()) {
        //     return new ResponseEntity<>(mapToDeveloperResponse(existingItemOptional.get()), HttpStatus.OK);
        // } else {
        //     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // }

        return mapToDeveloperResponse(existingItemOptional.get());
    }


    // public ResponseEntity<String> create(DeveloperRequest developerRequest) {
    //     try {
    //         developerRepository.save(mapToDeveloper(developerRequest));

    //         logger.info("\n\n Developer create successfully.\n");
    //         return ResponseEntity.ok("Developer créée avec succès");
    //     } catch (Exception e) {
    //         return ResponseEntity.status(500).body("Erreur lors de la creation =>" + e.getMessage());
    //     }
    // }

    public ResponseEntity<String> update(Integer id, DeveloperRequest developerRequest) {
        try {
            Optional<Developer> existingItemOptional = developerRepository.findById(id);
            if (existingItemOptional.isPresent()) {
                Developer existingItem = existingItemOptional.get();

                if (StringUtils.isNotBlank(developerRequest.getFirstName())) {
                    existingItem.setFirstName(developerRequest.getFirstName());
                }

                if (StringUtils.isNotBlank(developerRequest.getLastName())) {
                    existingItem.setLastName(developerRequest.getLastName());
                }

                if (developerRequest.getSpeciality() != null) {
                    existingItem.setSpeciality(developerRequest.getSpeciality());
                }

                // changer le mot de passe
                // if (StringUtils.isNotBlank(developerRequest.getPassword())) {
                //     existingItem.setPassword(developerRequest.getPassword());
                // }

                existingItem.setLastModifiedAt(LocalDateTime.now());
                developerRepository.save(existingItem);

                return ResponseEntity.ok("Developer mis à jour avec succès");
            } else {
                return ResponseEntity.status(404)
                        .body("Erreur lors de la mise à jour => Developer inexistant");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour de l'Developer => " + e.getMessage());
        }
    }


    public ResponseEntity<String> patchUpdate(Integer id, Map<String, Object> updates) {
        try {
            Optional<Developer> existingItemOptional = developerRepository.findById(id);

            if (existingItemOptional.isPresent()) {
                Developer existingItem = existingItemOptional.get();

                if(updates.containsKey("firstName")) {
                    existingItem.setFirstName((String) updates.get("firstName"));
                }

                if(updates.containsKey("lastName")) {
                    existingItem.setLastName((String) updates.get("lastName"));
                }

                if(updates.containsKey("speciality")) {
                    existingItem.setSpeciality(SPECIALITY.valueOf((String) updates.get("speciality")));
                }

                // if(updates.containsKey("password")) {
                //     existingItem.setPassword((String) updates.get("password"));
                // }

                existingItem.setLastModifiedAt(LocalDateTime.now());
                developerRepository.save(existingItem);

                return ResponseEntity.ok("Developer mise à jour avec succès");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erreur lors de la mise à jour => Developer inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du Developer => " + e.getMessage());
        }
    }

    public ResponseEntity<HttpStatus> delete(Integer id) {
        try {
            developerRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    public ResponseEntity<String> blocked(Integer id) {
        try {
            Optional<Developer> optDeveloper = developerRepository.findById(id);

            if (!optDeveloper.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Étudiant introuvable");
            }

            Developer student = optDeveloper.get();

            // Bloqué l'étudiant
            student.setBlocked(true);

            developerRepository.save(student);


            return ResponseEntity.ok("Étudiant bloqué avec succès");

        } catch (Exception e) {
            // Log l'erreur pour un meilleur diagnostic;
            logger.error("Erreur lors du blocage de l'étudiant", e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors du blocage : " + e.getMessage());
        }
    }

    public ResponseEntity<String> unblocked(Integer id) {
        try {
            Optional<Developer> optDeveloper = developerRepository.findById(id);

            if (!optDeveloper.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Étudiant introuvable");
            }

            Developer student = optDeveloper.get();

            if(student.isBlocked()) {
                // Debloqué l'étudiant
                student.setBlocked(false);

                developerRepository.save(student);
                return ResponseEntity.ok("Étudiant debloqué avec succès");
            }
            
            return ResponseEntity.ok("Étudiant n'est pas bloqué.");

        } catch (Exception e) {
            // Log l'erreur pour un meilleur diagnostic
            // LoggerFactory.getLogger(DeveloperService.class)
            //     .error("Erreur lors du deblocage de l'étudiant", e);
            logger.error("Erreur lors du deblocage de l'étudiant", e);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors du deblocage : " + e.getMessage());
        }
    }

    public DeveloperResponse mapToDeveloperResponse(Developer student) {
        return DeveloperResponse.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .speciality(student.getSpeciality())
                // .verificationCode(student.getVerificationCode())
                .active(student.isActive())
                .blocked(student.isBlocked())
                .build();
    }

    public Developer mapToDeveloper(DeveloperRequest developerRequest) {
        return Developer.builder()
                .speciality(Objects.requireNonNull(developerRequest.getSpeciality(), "Speciality cannot be null"))
                .firstName(Objects.requireNonNull(developerRequest.getFirstName(), "First name cannot be null"))
                .lastName(Objects.requireNonNull(developerRequest.getLastName(), "Last name cannot be null"))
                .email(Objects.requireNonNull(developerRequest.getEmail(), "Email cannot be null"))
                .creatAt(LocalDateTime.now())
                .lastModifiedAt(LocalDateTime.now())
                .build();
    }
}




