package com.wydengames.gamecollection.dto;

public record UserUpdateRequestDTO(
//        @NotBlank(message = "Nome de usuário não pode ser vazio")
//        @Size(min = 3, message = "Nome de usuário deve ter pelo menos 3 caracteres")
        String username,

//        @NotBlank(message = "E-mail não pode ser vazio")
//        @Email(message = "Formato de e-mail inválido")
        String email
) {}