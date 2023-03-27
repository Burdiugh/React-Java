package program.configuration.security;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import program.constants.Roles;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthentificationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
//    private final LogoutHandler logoutHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/account/**").permitAll()
                .requestMatchers("/api/home/files/**").permitAll()
                .requestMatchers("/static/**").permitAll()
                .requestMatchers("/swagger-resources/**").permitAll()
                .requestMatchers("/v3/api-docs/**").permitAll()
                .requestMatchers("/webjars/**").permitAll()
                .requestMatchers("/rest-api-docs/**").permitAll()
                .requestMatchers("/swagger-ui/**").permitAll()
                .requestMatchers("/api/categories/**").permitAll()
//                .requestMatchers("/api/products/**").hasAuthority(Roles.Admin) // only admin has permission
                .requestMatchers("/api/products/**").permitAll()
                .anyRequest().authenticated()
                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
//                .logout()
//                .logoutUrl("/api/v1/auth/logout")
//                .addLogoutHandler(logoutHandler)
//                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
        ;

        return http.build();
    }
}
