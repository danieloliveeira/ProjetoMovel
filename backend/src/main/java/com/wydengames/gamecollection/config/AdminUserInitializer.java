package com.wydengames.gamecollection.config;

import com.wydengames.gamecollection.entites.User;
import com.wydengames.gamecollection.enums.UserRole;
import com.wydengames.gamecollection.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminUserInitializer implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@wydengames.com").isEmpty()) {
            User admin = new User();
            admin.setUsername("AdminWyd");
            admin.setEmail("admin@wydengames.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(UserRole.ADMIN);

            userRepository.save(admin);
            System.out.println(">>> Usuário ADMIN criado com sucesso!");
        }
    }
}
