package com.wydengames.gamecollection.repositories;

import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {


    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    List<User> findByRole(UserRole role);
}
