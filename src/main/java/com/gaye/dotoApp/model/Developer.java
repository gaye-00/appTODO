package com.gaye.dotoApp.model;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
// @DiscriminatorValue("student")
public class Developer extends User {

    @Enumerated(EnumType.STRING)
    private SPECIALITY speciality;

    private String verificationCode;

    @OneToMany(mappedBy = "developer")
    private List<Projet> projets;
}
