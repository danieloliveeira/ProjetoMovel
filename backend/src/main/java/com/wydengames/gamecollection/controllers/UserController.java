package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.UserCreateDTO;
import com.wydengames.gamecollection.dto.UserResponseDTO;
import com.wydengames.gamecollection.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserCreateDTO createDTO) {
        UserResponseDTO createUser = userService.createUser(createDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createUser.id()).toUri();

        return ResponseEntity.created(uri).body(createUser);
    }
}
