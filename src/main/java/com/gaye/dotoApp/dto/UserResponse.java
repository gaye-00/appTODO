package com.gaye.dotoApp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserResponse {

    private Integer id;
    private String role;
    private String firstName;
    private String lastName;
    private String email;
    private boolean active;
}

