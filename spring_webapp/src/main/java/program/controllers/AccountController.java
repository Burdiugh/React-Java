package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import program.configuration.captcha.CaptchaSettings;
import program.dto.account.AuthResponseDTO;
import program.dto.account.GoogleAuthDTO;
import program.dto.account.LoginDTO;
import program.dto.account.RegisterDTO;
import program.services.AccountService;
import program.services.GoogleAuthService;
import program.services.InvalidTokenException;

import java.io.IOException;
import java.security.GeneralSecurityException;

@RestController
@RequestMapping("api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService service;

    private final CaptchaSettings captchaSettings;


    @PostMapping("/google-auth")
    public ResponseEntity<AuthResponseDTO> googleAuth(
            @RequestBody GoogleAuthDTO request
    ) throws InvalidTokenException, GeneralSecurityException, IOException {
        return ResponseEntity.ok(service.googleAuth(request));
    }

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
        var auth = service.login(request);
        if(auth==null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        return ResponseEntity.ok(auth);
    }
}