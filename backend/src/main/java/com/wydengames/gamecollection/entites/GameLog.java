package com.wydengames.gamecollection.entites;

import com.wydengames.gamecollection.enums.GameStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "tb_game_logs",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"user_id", "game_id"})
        }
)
@Getter
@Setter
@NoArgsConstructor
public class GameLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GameStatus status;

    private Integer rating;

    @Column(name = "created_at", updatable = false)
    private Instant createdAt = Instant.now();

    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public GameLog(User user, Game game, GameStatus status, Integer rating) {
        this.user = user;
        this.game = game;
        this.status = status;
        this.rating = rating;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameLog gameLog = (GameLog) o;
        return Objects.equals(id, gameLog.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}