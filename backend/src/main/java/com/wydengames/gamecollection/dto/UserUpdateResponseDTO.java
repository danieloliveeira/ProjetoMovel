package com.wydengames.gamecollection.dto;

import lombok.Builder;

@Builder
public record UserUpdateResponseDTO(
        UserResponseDTO userDetails,
        String newToken
) {}