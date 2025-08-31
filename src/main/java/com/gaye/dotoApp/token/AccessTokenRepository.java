
package com.gaye.dotoApp.token;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaye.dotoApp.model.User;


public interface AccessTokenRepository extends JpaRepository<AccessToken, Integer> {

    // Requête pour récupérer tous les jetons valides (non expirés et non révoqués) pour un utilisateur donné
    @Query("""
            select t from AccessToken t inner join User u on t.user.id = u.id
            where u.id = :userId and (t.expired = false or t.revoked = false)
            """)
    List<AccessToken> findAllValidTokensByUser(Integer userId);

    // Trouver un jeton d'accès spécifique par sa valeur de jeton
    Optional<AccessToken> findByAccessToken(String accessToken);

    // Requête pour récupérer l'utilisateur associé à un jeton d'accès spécifique
    @Query("SELECT t.user FROM AccessToken t WHERE t.accessToken = :accessToken")
    Optional<User> findUserByToken(String accessToken);

    // Méthode pour supprimer tous les access tokens d'un utilisateur
    void deleteByUser(User user);
}
