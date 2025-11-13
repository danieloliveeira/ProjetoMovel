package com.wydengames.gamecollection.dto;

import com.wydengames.gamecollection.entites.GameLog;

import com.wydengames.gamecollection.enums.GameStatus;
import lombok.Getter;

import java.time.Instant;

@Getter
public class GameLogResponseDTO {

    private Long id;
    private Long gameId;
    private Long userId;
    private GameStatus status;
    private Integer rating;
    private Instant updatedAt;
    private String gameTitle;
    private String gameImgUrl;

    public GameLogResponseDTO(GameLog entity) {
        this.id = entity.getId();
        this.gameId = entity.getGame().getId();
        this.userId = entity.getUser().getId();
        this.status = entity.getStatus();
        this.rating = entity.getRating();
        this.updatedAt = entity.getUpdatedAt();
        this.gameTitle = entity.getGame().getTitle();
        this.gameImgUrl = entity.getGame().getImgUrl();
    }
}