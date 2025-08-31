package com.gaye.dotoApp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjetRequest {

    @NotNull(message = "Le titre du projet ne peut pas être null")
    @NotBlank(message = "Le titre du projet ne peut pas être vide")
    private String title;

    @NotNull(message = "La description du projet ne peut pas être null")
    @NotBlank(message = "La description du projet ne peut pas être vide")
    private String description;
    // private List<Tache> taches; 

    @NotNull(message = "L'ID du developer ne peut pas être null")
    private Integer developerId;
    
}
