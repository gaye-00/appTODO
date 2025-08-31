package com.gaye.dotoApp.model;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
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
// @DiscriminatorValue("admin")
public class Admin extends User {
    @Builder.Default
    private Boolean active = true;

    // @OneToMany(mappedBy = "admin")
    // private List<Projet> taches;
}
