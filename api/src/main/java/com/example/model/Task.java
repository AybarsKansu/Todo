package com.example.model;

import jakarta.persistence.*;

import java.util.Date;


@Entity
@Table(name = "t_task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    private String description;

    @Column(name="entry_date")
    private Date entryDate;
    @Column(name="due_date")
    private Date dueDate;
    private boolean isDone;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    public Task() {
    }

    public Task(String name, String description, Date entryDate, Date dueDate, boolean isDone, User user) {
        this.name = name;
        this.description = description;
        this.entryDate = entryDate;
        this.dueDate = dueDate;
        this.isDone = isDone;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
