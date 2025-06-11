package com.example.service;

import com.example.dto.TaskDTO;
import com.example.model.Task;

import java.util.List;

public interface TaskServiceI {
    Task addTask(Long userId, Task task);
    void deleteTask(Long taskId);
    Task updateTask(Long taskId, Task task);
    List<Task> getTasksByUser(String username);
    Task completeTask(Long taskId);
    Task getTaskByName(String username);
}