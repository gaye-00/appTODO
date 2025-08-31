package com.gaye.dotoApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gaye.dotoApp.model.Admin;


@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    Optional<Admin> findByEmail(String email);
    boolean existsByEmail(String email);
}
