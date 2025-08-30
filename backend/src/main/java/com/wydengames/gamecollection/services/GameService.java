package com.wydengames.gamecollection.services;

import com.wydengames.gamecollection.dto.GameDTO;
import com.wydengames.gamecollection.dto.GameMinDTO;
import com.wydengames.gamecollection.entites.Game;
import com.wydengames.gamecollection.repositories.GameRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Transactional
    public List<GameMinDTO> findAll(){
        return gameRepository.findAll().stream().map(GameMinDTO::new).toList();
    }

    @Transactional
    public GameDTO findById(Long id) {
        Game result = gameRepository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Recurso nao encontrado")
        );
        return new GameDTO(result);
    }

    @Transactional
    public List<GameMinDTO> findByList(Long listId){
        return gameRepository.searchByList(listId).stream().map(GameMinDTO::new).toList();
    }
}