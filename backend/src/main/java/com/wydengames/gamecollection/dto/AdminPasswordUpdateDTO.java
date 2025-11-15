package com.wydengames.gamecollection.dto;

//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPasswordUpdateDTO {

//    @NotBlank
//    @Size(min = 6, message = "A nova senha deve ter pelo menos 6 caracteres")
    private String newPassword;
}