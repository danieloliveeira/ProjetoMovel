package com.wydengames.gamecollection.dto;

import lombok.Builder;

@Builder
public record CreateGameListResponseDTO(Long id, String name){}
