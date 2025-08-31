package com.gaye.dotoApp.model;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Tache extends BaseEntity {

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private ETAT etat;

    @Enumerated(EnumType.STRING)
    private PRIORITY priority;

    private LocalDateTime dueDate;

    @ManyToOne
    @JsonBackReference("projet")
    @JoinColumn(name = "projet_id", nullable = false)
    private Projet projet;

    // @OneToMany(mappedBy = "tache")
    // private List<SubTask> subTasks; // Assuming SubTask is another entity related to Tache
}
