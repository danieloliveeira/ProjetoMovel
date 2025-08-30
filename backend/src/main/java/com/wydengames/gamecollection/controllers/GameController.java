package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.GameDTO;
import com.wydengames.gamecollection.dto.GameMinDTO;
import com.wydengames.gamecollection.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/games")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping
    public List<GameMinDTO> findAll(){
        return gameService.findAll();
    }

    @GetMapping(value = "/{id}")
    public GameDTO findById(@PathVariable("id") Long id){
        return gameService.findById(id);
    }


}
