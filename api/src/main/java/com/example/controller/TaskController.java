package com.example.controller;

import com.example.dto.TaskDTO;
import com.example.dto.TaskRequest;
import com.example.exception.NoSuchAccountException;
import com.example.mapper.TaskMapper;
import com.example.model.Task;
import com.example.model.User;
import com.example.repository.UserRepository;
import com.example.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import com.example.service.TaskServiceI;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskServiceI taskService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user/{username}")
    public ResponseEntity<TaskDTO> addTask(@PathVariable String username, @RequestBody TaskRequest taskRequest) {
        String name = taskRequest.getName(); String description = taskRequest.getDescription() == null ? "" : taskRequest.getDescription();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchAccountException("User not found"));
        Task task = new Task(name, description, new Date(), taskRequest.getDueDate(), false, user);
        Task savedTask = taskService.addTask(user.getId(), task);
        return ResponseEntity.ok(TaskMapper.INSTANCE.toTaskDTO(task));
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task task) {
        Task updated = taskService.updateTask(taskId, task);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/user/{username}")
    public List<Task> getTasksByUser(@PathVariable String username) {
        return taskService.getTasksByUser(username);
    }

    @PostMapping("/{taskId}/complete")
    public ResponseEntity<Task> completeTask(@PathVariable Long taskId) {
        Task completed = taskService.completeTask(taskId);
        return ResponseEntity.ok(completed);
    }

    @GetMapping("/task/{name}")
    public ResponseEntity<Task> getTaskByName(@PathVariable String name){
        return ResponseEntity.ok(taskService.getTaskByName(name));
    }
}