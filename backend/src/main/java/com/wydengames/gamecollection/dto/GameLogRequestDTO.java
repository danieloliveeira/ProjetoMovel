package com.wydengames.gamecollection.dto;

import com.wydengames.gamecollection.enums.GameStatus;

public class GameLogRequestDTO {

    private Long gameApiId;
    private GameStatus status; // "PLAYED", "BACKLOG", etc.
    private Integer rating; // opcional

    // Getters e Setters
}