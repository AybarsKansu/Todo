package com.example.dto;

public class PasswordRequest {
    private String newPassword;
    private String oldPassword;

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getPassword() {
        return newPassword;
    }

    public void setPassword(String password) {
        this.newPassword = password;
    }
}
