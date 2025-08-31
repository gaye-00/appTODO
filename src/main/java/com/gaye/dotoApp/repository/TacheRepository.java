package com.gaye.dotoApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gaye.dotoApp.model.Tache;


@Repository
public interface TacheRepository extends JpaRepository<Tache, Integer> {

    void deleteByProjetId(Integer id);
    
}
