package com.wydengames.gamecollection.services;


import com.wydengames.gamecollection.dto.GameListDTO;
import com.wydengames.gamecollection.projections.GameMinProjection;
import com.wydengames.gamecollection.repositories.GameListRepository;
import com.wydengames.gamecollection.repositories.GameRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameListService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameListRepository gameListRepository;

    @Transactional
    public List<GameListDTO> findAll(){
        return gameListRepository.findAll().stream().map(GameListDTO::new).toList();
    }

    @Transactional
    public void move(Long listId, int sourceIndex, int destinationIndex){
        List<GameMinProjection> list = gameRepository.searchByList(listId);

        GameMinProjection obj = list.remove(sourceIndex);
        list.add(destinationIndex, obj);

//        int min = sourceIndex < destinationIndex ? sourceIndex: destinationIndex;
//        int max = sourceIndex < destinationIndex ? destinationIndex : sourceIndex;
        int min = Math.min(sourceIndex, destinationIndex);
        int max = Math.max(sourceIndex, destinationIndex);

        for (int i = min; i <= max; i++){
            gameListRepository.updateBelongingPosition(listId, list.get(i).getId(), i);
        }

    }

}
