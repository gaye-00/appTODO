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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.gaye.dotoApp.dto.AdminRequest;
import com.gaye.dotoApp.dto.AdminResponse;
import com.gaye.dotoApp.model.Admin;
import com.gaye.dotoApp.repository.AdminRepository;

import io.micrometer.common.util.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

    private final AdminRepository adminRepository;
    private final Logger logger = LoggerFactory.getLogger(AdminService.class);
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public ResponseEntity<List<AdminResponse>> getAll() {
        try {
            List<Admin> items = new ArrayList<>();
            adminRepository.findAll().forEach(items::add);

            if (items.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            List<AdminResponse> responseItems = items.stream().map(this::mapToAdminResponse)
                    .collect(Collectors.toList());

            return new ResponseEntity<>(responseItems, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<AdminResponse> getById(Integer id) {
        Optional<Admin> existingItemOptional = adminRepository.findById(id);

        if (existingItemOptional.isPresent()) {
            return new ResponseEntity<>(mapToAdminResponse(existingItemOptional.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<String> create(AdminRequest adminRequest) {
        try {

            Admin admin = mapToAdmin(adminRequest);
            admin.setPassword(passwordEncoder.encode(admin.getPassword()));
            adminRepository.save(admin);

            logger.info("\n\n Admin create successfully.\n");
            return ResponseEntity.ok("Admin créée avec succès");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur lors de la creation =>" + e.getMessage());
        }
    }

    public ResponseEntity<String> update(Integer id, AdminRequest adminRequest) {
        try {
            Optional<Admin> existingItemOptional = adminRepository.findById(id);
            if (existingItemOptional.isPresent()) {
                Admin existingItem = existingItemOptional.get();

                if (StringUtils.isNotBlank(adminRequest.getFirstName())) {
                    existingItem.setFirstName(adminRequest.getFirstName());
                }

                existingItem.setLastModifiedAt(LocalDateTime.now());
                adminRepository.save(existingItem);

                return ResponseEntity.ok("Admin mis à jour avec succès");
            } else {
                return ResponseEntity.status(404)
                        .body("Erreur lors de la mise à jour => Admin inexistant");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour de l'Admin => " + e.getMessage());
        }
    }


    public ResponseEntity<String> patchUpdate(Integer id, Map<String, Object> updates) {
        try {
            Optional<Admin> existingItemOptional = adminRepository.findById(id);

            if (existingItemOptional.isPresent()) {
                Admin existingItem = existingItemOptional.get();

                if(updates.containsKey("firstName")) {
                    existingItem.setFirstName((String) updates.get("firstName"));
                }

                existingItem.setLastModifiedAt(LocalDateTime.now());
                adminRepository.save(existingItem);

                return ResponseEntity.ok("Admin mise à jour avec succès");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Erreur lors de la mise à jour => Admin inexistante");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la mise à jour du Admin => " + e.getMessage());
        }
    }

    public ResponseEntity<HttpStatus> delete(Integer id) {
        try {
            adminRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    public AdminResponse mapToAdminResponse(Admin admin) {
        return AdminResponse.builder()
                .id(admin.getId())
                .firstName(admin.getFirstName())
                .lastName(admin.getLastName())
                .email(admin.getEmail())
                .isBlocked(admin.isBlocked())
                .build();
    }

    public Admin mapToAdmin(AdminRequest adminRequest) {
        return Admin.builder()
                .firstName(Objects.requireNonNull(adminRequest.getFirstName(), "First name cannot be null"))
                .lastName(Objects.requireNonNull(adminRequest.getLastName(), "Last name cannot be null"))
                .email(Objects.requireNonNull(adminRequest.getEmail(), "Email cannot be null"))
                .password(Objects.requireNonNull(adminRequest.getPassword(), "Password cannot be null"))
                .creatAt(LocalDateTime.now())
                .lastModifiedAt(LocalDateTime.now())
                .build();
    }
}



