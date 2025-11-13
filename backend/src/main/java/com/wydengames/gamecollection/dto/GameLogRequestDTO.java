package com.wydengames.gamecollection.dto;

import com.wydengames.gamecollection.enums.GameStatus;
import lombok.Getter;



@Getter
public class GameLogRequestDTO {
        private Long gameId;
        private GameStatus status;
        private Integer rating;
    }
