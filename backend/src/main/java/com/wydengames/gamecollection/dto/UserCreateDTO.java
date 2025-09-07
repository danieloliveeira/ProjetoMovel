package com.wydengames.gamecollection.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class UserCreateDTO {
    private String username;
    private String email;
    private String password;
}
