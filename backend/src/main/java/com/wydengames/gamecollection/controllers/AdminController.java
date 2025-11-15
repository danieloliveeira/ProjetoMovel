package com.wydengames.gamecollection.controllers;

import com.wydengames.gamecollection.dto.AdminPasswordUpdateDTO;
import com.wydengames.gamecollection.dto.UserCreateDTO;
import com.wydengames.gamecollection.dto.UserResponseDTO;
import com.wydengames.gamecollection.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/admin")
@CrossOrigin(origins = "http://localhost:8081")
public class AdminController {
    @Autowired
    private UserService userService;

    @PostMapping("/users")
    public ResponseEntity<UserResponseDTO> createUser(@RequestBody UserCreateDTO createDTO) {
        UserResponseDTO newUser = userService.createUser(createDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(newUser.id()).toUri();

        return ResponseEntity.created(uri).body(newUser);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getStandardUsers();
        return ResponseEntity.ok(users);
    }

    @PatchMapping("/users/{id}/password")
    public ResponseEntity<Void> updateUserPassword(
            @PathVariable Long id,
             @RequestBody AdminPasswordUpdateDTO passwordDTO)
    {
        userService.adminUpdatePassword(id, passwordDTO.getNewPassword());
        return ResponseEntity.noContent().build();
    }
}
