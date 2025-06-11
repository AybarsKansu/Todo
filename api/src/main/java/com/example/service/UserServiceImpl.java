package com.example.service;

import com.example.dto.EmailRequest;
import com.example.dto.PasswordRequest;
import com.example.dto.UserDTO;
import com.example.exception.DuplicationException;
import com.example.exception.NoSuchAccountException;
import com.example.mapper.UserMapper;
import com.example.model.User;
import com.example.repository.UserRepository;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserServiceI {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new DuplicationException("Bu hesap zaten var.");
        }

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Kullanıcı kaydedilirken bir hata oluştu: " + e.getMessage());
        }
    }



    @Override
    public User getUserByUsername(User user) {
        return userRepository.findByUsername(user.getUsername())
                .orElseThrow(() -> new NoSuchAccountException("This account does not exist"));

    }

    @Override
    public List<UserDTO> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .map(UserMapper.INSTANCE::toUserDTO)
                .collect(Collectors.toList()); // Ensures proper conversion
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(UserMapper.INSTANCE::toUserDTO) // Handles Optional correctly
                .orElse(null); // Returns null if user is not found
    }

    @Override
    public void changeEmail(Long id, EmailRequest email) {
        User user = userRepository.findById(id).orElse(null);
        if(user != null)
        {
            user.setEmail(email.getEmail());
            userRepository.save(user);
        }
        else
        {
            throw new NoSuchAccountException("Can not change email");
        }
    }

    @Override
    public void deleteAccountById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void changePassword(Long id, PasswordRequest password) {
        User user = userRepository.findById(id).orElse(null);
        if(user != null){
            if(user.getPassword().equals(password.getOldPassword())) {
                user.setPassword(password.getPassword());
                userRepository.save(user);
            }else{
                throw new DuplicationException("Wrong Password");
            }
        }
        else{
            throw new NoSuchAccountException("Could not change password");
        }
    }

}
