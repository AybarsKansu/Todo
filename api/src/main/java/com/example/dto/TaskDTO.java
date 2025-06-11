package com.example.dto;

import java.util.Date;

public class TaskDTO {
    private Long id;
    private String name;
    private String description;
    private Date entryDate;
    private Date dueDate;
    private boolean isDone;

    // Default constructor
    public TaskDTO() {}

    // Constructor with fields
    public TaskDTO(Long id, String name, String description, Date entryDate, Date dueDate, boolean isDone) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.entryDate = entryDate;
        this.dueDate = dueDate;
        this.isDone = isDone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public boolean isDone() {
        return isDone;
    }

    public void setDone(boolean done) {
        isDone = done;
    }

    @Override
    public String toString() {
        return "TaskDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", entryDate=" + entryDate +
                ", dueDate=" + dueDate +
                ", isDone=" + isDone +
                '}';
    }
}
