package program.services;

import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import program.constants.Roles;
import program.entities.RoleEntity;
import program.entities.UserEntity;
import program.entities.UserRoleEntity;
import program.iterfaces.SeedService;
import program.repositories.RoleRepository;
import program.repositories.UserRepository;
import program.repositories.UserRoleRepository;

@Service
@AllArgsConstructor
public class SeedServiceImp implements SeedService {
    RoleRepository roleRepository;

    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void seedRoleData() {
        if (roleRepository.count() == 0) {
            RoleEntity admin = new RoleEntity().builder()
                    .name(Roles.Admin)
                    .build();
            roleRepository.save(admin);

            RoleEntity user = new RoleEntity().builder()
                    .name(Roles.User)
                    .build();
            roleRepository.save(user);
        }
    }

    @Override
    public void seedUserData() {

        if (userRepository.count() == 0) {
            var user = UserEntity.builder()
                    .firstName("Mykola")
                    .lastName("Burdiuh")
                    .email("burdiugh.bk@gmail.com")
                    .phone("097 075 75 45")
                    .image(null)
                    .password(passwordEncoder.encode("edizas123"))
                    .build();
            userRepository.save(user);
            var role = roleRepository.findByName(Roles.Admin);
            var ur = new UserRoleEntity().builder()
                    .user(user)
                    .role(role)
                    .build();
            userRoleRepository.save(ur);
        }
    }


}