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
public class AccessToken extends BaseEntity {

    // La valeur du jeton d'accès
    @Column(unique = true)
    private String accessToken;
    
    // Indicateur si le jeton est expiré
    private boolean expired;
    
    // Indicateur si le jeton a été révoqué
    // @Enumerated(EnumType.ORDINAL)
    private boolean revoked;

    // Type de jeton (peut être défini avec une énumération)
    @Enumerated(EnumType.STRING)
    private TokenType tokentype;

    // L'utilisateur associé à ce jeton
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

