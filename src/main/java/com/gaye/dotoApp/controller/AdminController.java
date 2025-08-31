package com.gaye.dotoApp.controller;

import java.util.List;
import java.util.Map;

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

import com.gaye.dotoApp.dto.AdminRequest;
import com.gaye.dotoApp.dto.AdminResponse;
import com.gaye.dotoApp.service.AdminService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/admins")
public class AdminController {

    private final AdminService adminService;

    @GetMapping
    public ResponseEntity<List<AdminResponse>> getAll() {
        return adminService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdminResponse> getById(@PathVariable("id") Integer id) {
        return adminService.getById(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> patchUpdate(@PathVariable Integer id, @RequestBody Map<String, Object> updates) {
        return adminService.patchUpdate(id, updates);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid AdminRequest requestItem) {
        return adminService.create(requestItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Integer id, @RequestBody @Valid AdminRequest requestItem) {
        return adminService.update(id, requestItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Integer id) {
        return adminService.delete(id);
    }
}

