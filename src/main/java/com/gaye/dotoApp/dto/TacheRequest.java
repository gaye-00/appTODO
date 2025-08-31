package com.gaye.dotoApp.dto;

import java.time.LocalDateTime;

import com.gaye.dotoApp.model.ETAT;
import com.gaye.dotoApp.model.PRIORITY;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TacheRequest {
    
    @NotNull(message = "Le titre du projet ne peut pas être null")
    @NotBlank(message = "Le titre du projet ne peut pas être vide")
    private String title;

    @NotNull(message = "La description du projet ne peut pas être null")
    @NotBlank(message = "La description du projet ne peut pas être vide")
    private String description;

    @NotNull(message = "L'état de la tâche ne peut pas être null")
    private ETAT etat;

    @NotNull(message = "La priorité de la tâche ne peut pas être null")
    private PRIORITY priority;

    // @NotNull(message = "La date d'échéance ne peut pas être null")
    private LocalDateTime dueDate;

    @NotNull(message = "L'ID du projet ne peut pas être null")
    private Integer projetId;
}
