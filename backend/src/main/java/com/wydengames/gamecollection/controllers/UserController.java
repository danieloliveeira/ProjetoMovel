package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.LoginRequestDTO;
import com.wydengames.gamecollection.dto.LoginResponseDTO;
import com.wydengames.gamecollection.dto.UserCreateDTO;
import com.wydengames.gamecollection.dto.UserResponseDTO;
import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.services.TokenService;
import com.wydengames.gamecollection.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/users")
@CrossOrigin(origins = "http://localhost:8081")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(@RequestBody UserCreateDTO createDTO) {
        UserResponseDTO createUser = userService.createUser(createDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(createUser.id()).toUri();

        return ResponseEntity.created(uri).body(createUser);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO data) {

        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User) auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }
}
