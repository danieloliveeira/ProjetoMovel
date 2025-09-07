package com.wydengames.gamecollection.services;

import com.wydengames.gamecollection.dto.UserCreateDTO;
import com.wydengames.gamecollection.dto.UserResponseDTO;
import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDTO createUser(UserCreateDTO createDTO){

        if (userRepository.findByEmail(createDTO.getEmail()).isPresent()){
            throw new RuntimeException("E-mail ja cadstrado!");
        }

        User newUser = new User();
        newUser.setUsername(createDTO.getUsername());
        newUser.setEmail(createDTO.getEmail());

        newUser.setPassword(passwordEncoder.encode(createDTO.getPassword()));

        User savedUser = userRepository.save(newUser);

        return UserResponseDTO.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .build();

    }
}
