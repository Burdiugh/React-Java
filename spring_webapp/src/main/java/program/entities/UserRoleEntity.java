package program.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tbl_user_roles")
@IdClass(UserRolePK.class)
public class UserRoleEntity {
    @Id
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private UserEntity user;
    @Id
    @ManyToOne
    @JoinColumn(name="role_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private RoleEntity role;
}