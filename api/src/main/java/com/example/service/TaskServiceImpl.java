package com.example.service;

import com.example.dto.TaskDTO;
import com.example.exception.NoSuchAccountException;
import com.example.mapper.TaskMapper;
import com.example.model.Task;
import com.example.model.User;
import com.example.repository.TaskRepository;
import com.example.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskServiceI{

    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Task addTask(Long userId, Task task) {
        if (task == null) {
            throw new IllegalArgumentException("Task cannot be null");
        }

        User user = userRepository.findById(userId).orElseThrow(() -> new NoSuchAccountException("User not found"));
        task.setUser(user);
        return taskRepository.save(task);
    }


    @Override
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    @Override
    public Task updateTask(Long taskId, Task task) {
        Task existingTask = taskRepository.findById(taskId).orElseThrow(() -> new NoSuchAccountException("Task not found"));

        existingTask.setName(task.getName());
        existingTask.setDescription(task.getDescription());
        existingTask.setDueDate(task.getDueDate());
        existingTask.setDone(task.isDone());

        return taskRepository.save(existingTask);
    }


    @Override
    public List<Task> getTasksByUser(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new NoSuchAccountException("No Such Account"));
        return taskRepository.findByUserId(user.getId());
    }

    @Override
    public Task completeTask(Long taskId) {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new NoSuchAccountException("Task not found"));

        if (task.isDone()) {
            throw new IllegalStateException("Task is already completed");
        }

        task.setDone(true);
        return taskRepository.save(task);
    }

    @Override
    public Task getTaskByName(String username) {
        return taskRepository.getTaskByName(username);
    }

}