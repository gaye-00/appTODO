package com.gaye.dotoApp.dto;

import com.gaye.dotoApp.model.SPECIALITY;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class DeveloperRequest {

    @NotNull(message = "La specialité est requis")
    private SPECIALITY speciality;

    // @NotNull(message = "Le code est requis")
    // @NotBlank(message = "Le code n'est pas valide")
    // private String verificationCode;

    @NotNull(message = "Le prenom est requis")
    @NotBlank(message = "Le prenom n'est pas valide")
    private String firstName;

    @NotNull(message = "Le nom est requis")
    @NotBlank(message = "Le nom n'est pas valide")
    private String lastName;

    // @NotNull(message = "Le mot de passe est requis")
    @NotBlank(message = "Le mot de passe n'est pas valide")
    private String password;

    @NotNull(message = "L'email est requis")
    @NotBlank(message = "L'email n'est pas valide")
    @Email(message = "L'email n'est pas valide")
    private String email;
}
