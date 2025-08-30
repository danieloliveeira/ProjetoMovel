package com.wydengames.gamecollection.services.flux;


import com.wydengames.gamecollection.dto.CreateGameListDTO;
import com.wydengames.gamecollection.dto.CreateGameListResponseDTO;
import com.wydengames.gamecollection.entites.GameList;
import com.wydengames.gamecollection.repositories.GameListRepository;
import com.wydengames.gamecollection.services.GameApplicationFlux;
import jakarta.transaction.Transactional;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
@Transactional
public class CreateGameListFlux  implements GameApplicationFlux<CreateGameListDTO, CreateGameListResponseDTO> {


    private final GameListRepository gameListRepository;

    public CreateGameListFlux(GameListRepository gameListRepository) {
        this.gameListRepository = gameListRepository;
    }

    @Override
    public CreateGameListResponseDTO process(CreateGameListDTO request) {
        GameList newList = new GameList();
        newList.setName(request.name());

        newList = gameListRepository.save(newList);
        return builderResponseDTO(newList);
    }

    private CreateGameListResponseDTO builderResponseDTO(GameList newList){
        return CreateGameListResponseDTO.builder()
                .id(newList.getId())
                .name(newList.getName())
                .build();
    }



}

