package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import program.dto.account.AuthResponseDTO;
import program.dto.account.LoginDTO;
import program.dto.account.RegisterDTO;
import program.services.AccountService;

@RestController
@RequestMapping("api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;

    @PostMapping("/register")
    public ResponseEntity<AuthResponseDTO> register(
            @RequestBody RegisterDTO request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> authenticate(
            @RequestBody LoginDTO request
    ) {
        return ResponseEntity.ok(service.login(request));
    }
}