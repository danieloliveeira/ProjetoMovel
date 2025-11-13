package com.wydengames.gamecollection.services;

import com.wydengames.gamecollection.dto.GameLogRequestDTO;
import com.wydengames.gamecollection.dto.GameLogResponseDTO;
import com.wydengames.gamecollection.entites.Game;
import com.wydengames.gamecollection.entites.GameLog;
import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.repositories.GameLogRepository;
import com.wydengames.gamecollection.repositories.GameRepository;
import com.wydengames.gamecollection.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class GameLogService {

    @Autowired
    private GameLogRepository gameLogRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;

    @Transactional
    public GameLogResponseDTO setGameStatus(String userEmail, GameLogRequestDTO requestDTO) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));
        Game game = gameRepository.findById(requestDTO.getGameId())
                .orElseThrow(() -> new EntityNotFoundException("Jogo não encontrado"));
        Optional<GameLog> existingLog = gameLogRepository.findByUserAndGame(user, game);

        GameLog log;
        if (existingLog.isPresent()) {
            log = existingLog.get();
            log.setStatus(requestDTO.getStatus());
        } else {
            log = new GameLog();
            log.setUser(user);
            log.setGame(game);
            log.setStatus(requestDTO.getStatus());
        }
        log.setRating(requestDTO.getRating());
        log.setUpdatedAt(Instant.now());

        GameLog savedLog = gameLogRepository.save(log);

        return new GameLogResponseDTO(savedLog);
    }

    
    @Transactional
    public List<GameLogResponseDTO> findLogsByUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        return gameLogRepository.findAllByUserWithGame(user)
                .stream()
                .map(GameLogResponseDTO::new)
                .toList();
    }
}