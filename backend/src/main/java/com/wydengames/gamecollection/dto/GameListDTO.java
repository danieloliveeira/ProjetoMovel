package com.wydengames.gamecollection.dto;


import com.wydengames.gamecollection.entites.GameList;
import lombok.Getter;

@Getter
public class GameListDTO {

    private Long id;
    private String name;

    public GameListDTO(){
    }

    public GameListDTO(GameList entity){
        id = entity.getId();
        name = entity.getName();
    }

}
