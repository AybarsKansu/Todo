package com.example.controller;

import com.example.dto.*;
import com.example.mapper.UserMapper;
import com.example.model.User;
import com.example.service.UserServiceI;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserServiceI userService;

    @PostMapping("/register")
    public ResponseEntity<UserDTO> register(@Valid @RequestBody SignUpRequest signUpRequest) {
        String email = signUpRequest.getEmail();
        String username = signUpRequest.getUsername();
        String password = signUpRequest.getPassword();

        if (email != null && username != null && password != null) {
            User user = new User(email, username, password);
            User userDTO = userService.register(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.INSTANCE.toUserDTO(user)); // Return with HTTP 201 Created
        } else {
            return ResponseEntity.badRequest().build(); // Return HTTP 400 Bad Request
        }
    }


    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@Valid @RequestBody LoginRequest loginRequest) {
        String username = loginRequest.getUsername(); String password = loginRequest.getPassword();
        if(username != null && password != null) {
            User user = new User(username, password);
            return ResponseEntity.status(HttpStatus.CREATED).body(UserMapper.INSTANCE.toUserDTO(userService.getUserByUsername(user)));
        }else {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<UserDTO> deleteAccount(@PathVariable Long id) {
        userService.deleteAccountById(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/update-email/{id}")
    public ResponseEntity<UserDTO> changeEmail(@PathVariable Long id, @RequestBody EmailRequest email){
        userService.changeEmail(id, email);
        return null;
    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<UserDTO> changePassword(@PathVariable Long id, @RequestBody PasswordRequest password){
        userService.changePassword(id, password);
        return null;
    }


    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserDTO user = userService.getUserById(id);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

}
