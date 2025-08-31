package com.gaye.dotoApp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminRequest {

    @NotNull(message = "Le prenom est requis")
    @NotBlank(message = "Le prenom n'est pas valide")
    private String firstName;

    @NotNull(message = "Le nom est requis")
    @NotBlank(message = "Le nom n'est pas valide")
    private String lastName;

    @NotNull(message = "Le nom est requis")
    @NotBlank(message = "Le nom n'est pas valide")
    @Email(message = "L'email n'est pas valide")
    private String email;

    @NotNull(message = "Le mot de passe est requis")
    @NotBlank(message = "Le mot de passe n'est pas valide")
    private String password;
}
