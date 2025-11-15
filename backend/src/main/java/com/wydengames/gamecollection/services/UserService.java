package com.wydengames.gamecollection.services;

import com.wydengames.gamecollection.dto.UserUpdateRequestDTO;
import com.wydengames.gamecollection.enums.UserRole;
import com.wydengames.gamecollection.enums.GameStatus;
import com.wydengames.gamecollection.repositories.GameLogRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import com.wydengames.gamecollection.dto.UserCreateDTO;
import com.wydengames.gamecollection.dto.UserResponseDTO;
import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private GameLogRepository gameLogRepository;

    @Transactional
    public UserResponseDTO createUser(UserCreateDTO createDTO){

        if (userRepository.findByEmail(createDTO.getEmail()).isPresent()){
            throw new RuntimeException("E-mail ja cadastrado!");
        }

        User newUser = new User();
        newUser.setUsername(createDTO.getUsername());
        newUser.setEmail(createDTO.getEmail());

        newUser.setPassword(passwordEncoder.encode(createDTO.getPassword()));
        newUser.setRole(UserRole.USER);
        User savedUser = userRepository.save(newUser);

        return UserResponseDTO.builder()
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .playedCount(0L)
                .backlogCount(0L)
                .build();

    }

    @Transactional(readOnly = true)
    public UserResponseDTO findUserDetailsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado com o email: " + email));

        long played = gameLogRepository.countByUserAndStatus(user, GameStatus.PLAYED);
        long backlog = gameLogRepository.countByUserAndStatus(user, GameStatus.BACKLOG);

        return UserResponseDTO.builder()
                .id(user.getId())
                .username(user.getRealUsername())
                .email(user.getEmail())
                .playedCount(played)
                .backlogCount(backlog)
                .role(user.getRole().name())
                .build();
    }

    @Transactional
    public User updateUser(String currentEmail, UserUpdateRequestDTO userUpdateRequestDTO) {

        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new EntityNotFoundException("Usuário não encontrado"));

        if (!user.getRealUsername().equals(userUpdateRequestDTO.username())) {
            if (userRepository.findByUsername(userUpdateRequestDTO.username()).isPresent()) {
                throw new RuntimeException("Este nome de usuário já está em uso.");
            }
            user.setUsername(userUpdateRequestDTO.username());
        }

        if (!user.getEmail().equals(userUpdateRequestDTO.email())) {
            if (userRepository.findByEmail(userUpdateRequestDTO.email()).isPresent()) {
                throw new RuntimeException("Este e-mail já está em uso por outra conta.");
            }
            user.setEmail(userUpdateRequestDTO.email());
        }
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        String adminEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        User userToDelete = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID " + id + " não encontrado."));

        if (userToDelete.getEmail().equals(adminEmail)) {
            throw new RuntimeException("Você não pode deletar a sua própria conta de administrador.");
        }

        userRepository.delete(userToDelete);
    }

    @Transactional(readOnly = true)
    public List<UserResponseDTO> getStandardUsers() {
        List<User> users = userRepository.findByRole(UserRole.USER);

        return users.stream().map(user -> {
            long played = gameLogRepository.countByUserAndStatus(user, GameStatus.PLAYED);
            long backlog = gameLogRepository.countByUserAndStatus(user, GameStatus.BACKLOG);

            return UserResponseDTO.builder()
                    .id(user.getId())
                    .username(user.getRealUsername())
                    .email(user.getEmail())
                    .playedCount(played)
                    .backlogCount(backlog)
                    .build();
        }).collect(Collectors.toList());
    }

    @Transactional
    public void adminUpdatePassword(Long userId, String newPassword) {
        // 1. Encontra o usuário
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("Usuário com ID " + userId + " não encontrado."));

        // 2. Encodifica a NOVA senha
        String encodedPassword = passwordEncoder.encode(newPassword);

        // 3. Define e salva
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

}
