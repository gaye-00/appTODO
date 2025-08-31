
package com.gaye.dotoApp.token;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.gaye.dotoApp.model.User;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    @Query("""
            select t from RefreshToken t inner join User u on t.user.id = u.id
            where u.id = :userId and (t.expired = false or t.revoked = false)
            """)
    List<RefreshToken> findAllValidRefreshTokensByUser(Integer userId);

    Optional<RefreshToken> findByRefreshToken(String token);

    // Méthode pour supprimer tous les refresh tokens d'un utilisateur
    void deleteByUser(User user);
}
