package com.gaye.dotoApp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
public class Projet extends BaseEntity {

    private String title;
    private String description;

    @OneToMany(mappedBy = "projet")
    @JsonManagedReference("projet-taches")
    private List<Tache> taches; 

    @ManyToOne
    @JoinColumn(name = "developer_id", nullable = false)
    private Developer developer;
}
