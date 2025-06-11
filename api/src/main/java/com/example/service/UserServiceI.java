package com.example.service;

import com.example.dto.EmailRequest;
import com.example.dto.PasswordRequest;
import com.example.dto.UserDTO;
import com.example.model.User;

import java.util.List;

public interface UserServiceI {
    User register(User user);

    User getUserByUsername(User user);

    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    void changeEmail(Long id, EmailRequest email);
    void deleteAccountById(Long id);

    void changePassword(Long id, PasswordRequest password);
}