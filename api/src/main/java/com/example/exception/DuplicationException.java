package com.example.exception;

public class DuplicationException extends RuntimeException {
    public DuplicationException(String message){
        super(message);
    }
}
