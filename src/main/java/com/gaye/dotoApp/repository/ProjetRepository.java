package com.gaye.dotoApp.repository;

import java.util.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gaye.dotoApp.model.Projet;

@Repository
public interface ProjetRepository extends JpaRepository<Projet, Integer> {

    Collection<Projet> findByDeveloperId(Integer developerId);
}
