package com.example.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(DuplicationException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicationException(DuplicationException ex) {
        Map<String, Object> errorResponse = Map.of(
                "message", ex.getMessage()
        );
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(NoSuchAccountException.class)
    public ResponseEntity<Map<String, Object>> handleNoAccountException(NoSuchAccountException ex) {
        Map<String, Object> errorResponse = Map.of(
                "message", ex.getMessage()
        );
        return ResponseEntity.badRequest().body(errorResponse);
    }

    // Handle invalid task operations
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, Object> errorResponse = Map.of(
                "message", ex.getMessage()
        );
        return ResponseEntity.badRequest().body(errorResponse);
    }

    // Handle cases where a task is already completed
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalStateException(IllegalStateException ex) {
        Map<String, Object> errorResponse = Map.of(
                "message", ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    // Handle Task Not Found
    @ExceptionHandler(NoSuchTaskException.class)
    public ResponseEntity<Map<String, Object>> handleNoSuchTaskException(NoSuchTaskException ex) {
        Map<String, Object> errorResponse = Map.of(
                "message", ex.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
}
