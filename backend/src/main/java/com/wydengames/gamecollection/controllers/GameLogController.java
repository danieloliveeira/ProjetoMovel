package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.GameLogRequestDTO;
import com.wydengames.gamecollection.dto.GameLogResponseDTO;
import com.wydengames.gamecollection.services.GameLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/gamelogs")
@CrossOrigin(origins = "http://localhost:8081") // Igual ao seu UserController
public class GameLogController {

    @Autowired
    private GameLogService gameLogService;


    @PostMapping
    public ResponseEntity<GameLogResponseDTO> setGameStatus(
            @RequestBody GameLogRequestDTO requestDTO,
            Authentication authentication
    ) {
        String userEmail = authentication.getName();

        GameLogResponseDTO response = gameLogService.setGameStatus(userEmail, requestDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/my-logs")
    public ResponseEntity<List<GameLogResponseDTO>> getMyLogs(
            Authentication authentication
    ) {
        String userEmail = authentication.getName();
        List<GameLogResponseDTO> logs = gameLogService.findLogsByUser(userEmail);
        return ResponseEntity.ok(logs);
    }
}