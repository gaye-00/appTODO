package com.gaye.dotoApp.token;

import com.gaye.dotoApp.model.BaseEntity;
import com.gaye.dotoApp.model.User;

import jakarta.persistence.Column;
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
public class RefreshToken extends BaseEntity {

    @Column(unique = true)
    private String refreshToken;
    private boolean expired;
    private boolean revoked;

    @Enumerated(EnumType.STRING)
    private TokenType tokentype;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}


