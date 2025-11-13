package com.wydengames.gamecollection.repositories;

import com.wydengames.gamecollection.entites.GameLog;
import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.enums.GameStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface GameLogRepository extends JpaRepository<GameLog, Long> {

    // Método crucial: Encontra um log específico para um usuário e um jogo
    Optional<GameLog> findByUsuarioAndGameApiId(User user, Long gameApiId);

    // Método para buscar a lista de um usuário (ex: todos do BACKLOG)
    List<GameLog> findByUsuarioAndStatus(User user, GameStatus status);

    // Método para buscar todos os logs de um usuário
    List<GameLog> findByUsuario(User User);
}