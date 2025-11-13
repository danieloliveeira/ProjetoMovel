package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.GameDTO;
import com.wydengames.gamecollection.dto.GameMinDTO;
import com.wydengames.gamecollection.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
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


    @PostMapping
    public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO dto) {
        GameDTO newGame = gameService.createGame(dto);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newGame.getId()).toUri();

        return ResponseEntity.created(uri).body(newGame);
    }


}
