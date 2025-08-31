package com.gaye.dotoApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gaye.dotoApp.model.Developer;

@Repository
public interface DeveloperRepository extends JpaRepository<Developer, Integer> {

    Optional<Developer> findByEmail(String email);
}
