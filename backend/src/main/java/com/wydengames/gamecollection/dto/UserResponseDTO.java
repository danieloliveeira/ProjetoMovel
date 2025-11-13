package com.wydengames.gamecollection.dto;

import com.wydengames.gamecollection.entites.User;
import lombok.Builder;



@Builder
public record UserResponseDTO(Long id, String username, String email, long playedCount, long backlogCount, String role ){

}
