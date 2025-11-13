package com.wydengames.gamecollection.repositories;

import com.wydengames.gamecollection.entites.Game;
import com.wydengames.gamecollection.entites.GameLog;

import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.enums.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GameLogRepository extends JpaRepository<GameLog, Long> {
    @Query("SELECT gl FROM GameLog gl JOIN FETCH gl.game WHERE gl.user = :user")
    List<GameLog> findAllByUserWithGame(@Param("user") User user);
    Optional<GameLog> findByUserAndGame(User user, Game game);
    List<GameLog> findByUserAndStatus(User user, GameStatus status);
    List<GameLog> findByUser(User user);

    long countByUserAndStatus(User user, GameStatus status);
}