package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.*;
import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.services.TokenService;
import com.wydengames.gamecollection.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.security.core.Authentication;

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

    @GetMapping("/profile")
    public ResponseEntity<UserResponseDTO> getMyProfile(Authentication authentication) {
        String userEmail = authentication.getName();
        UserResponseDTO userDetails = userService.findUserDetailsByEmail(userEmail);

        return ResponseEntity.ok(userDetails);
    }

    @PutMapping("/me")
    public ResponseEntity<UserUpdateResponseDTO> updateMyProfile(
             @RequestBody UserUpdateRequestDTO userUpdateRequestDTO,
            Authentication authentication
    ) {
        String currentEmail = authentication.getName();

        User updatedUser = userService.updateUser(currentEmail, userUpdateRequestDTO);

        String newToken = tokenService.generateToken(updatedUser);

        UserResponseDTO userDetailsDTO = userService.findUserDetailsByEmail(updatedUser.getEmail());

        UserUpdateResponseDTO response = UserUpdateResponseDTO.builder()
                .userDetails(userDetailsDTO)
                .newToken(newToken)
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
