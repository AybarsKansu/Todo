package com.example.exception;

import java.security.GeneralSecurityException;

public class NoSuchAccountException extends RuntimeException {
    public NoSuchAccountException(String str) {
        super(str);
    }
}
