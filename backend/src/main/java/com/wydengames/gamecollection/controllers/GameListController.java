package com.wydengames.gamecollection.controllers;


import com.wydengames.gamecollection.dto.*;
import com.wydengames.gamecollection.services.GameApplicationFlux;
import com.wydengames.gamecollection.services.GameListService;
import com.wydengames.gamecollection.services.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Service
@RestController
@RequestMapping(value = "/lists")
public class GameListController {

    private final GameApplicationFlux<CreateGameListDTO, CreateGameListResponseDTO> createGameListFlux;

    @Autowired
    private GameListService gameListService;

    @Autowired
    private GameService gameService;

    public GameListController(GameApplicationFlux<CreateGameListDTO, CreateGameListResponseDTO> createGameListFlux) {
        this.createGameListFlux = createGameListFlux;
    }

    @GetMapping
    public List<GameListDTO> findAll(){
        return gameListService.findAll();
    }

    @GetMapping(value = "/{listId}/games")
    public List<GameMinDTO> findByList(@PathVariable("listId")Long listId){
        return gameService.findByList(listId);
    }

    @PostMapping(value = "/{listId}/replacement")
    public void move(@PathVariable("listId")Long listId, @RequestBody ReplacementDTO body){
        gameListService.move(listId, body.getSourceIndex(), body.getDestinationIndex());
    }

    @PostMapping()
    public ResponseEntity<CreateGameListResponseDTO> createList (@RequestBody CreateGameListDTO createGameListDTO){
        CreateGameListResponseDTO createGameListResponseDTO = createGameListFlux.process(createGameListDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createGameListResponseDTO);
    }

}
