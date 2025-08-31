package com.gaye.dotoApp.dto;

import com.gaye.dotoApp.model.SPECIALITY;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class DeveloperResponse {

    private Integer id;
    private SPECIALITY speciality;
    // private String verificationCode;
    private String firstName;
    private String lastName;
    private String password;
    private String email;
    private Boolean active;
    private Boolean blocked;

}
