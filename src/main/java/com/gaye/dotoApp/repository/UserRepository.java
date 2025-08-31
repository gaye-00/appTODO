package com.gaye.dotoApp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gaye.dotoApp.model.User;



public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findByEmail(String email);
    Optional<User> findById(Integer id);
}