package com.example.mapper;
import com.example.dto.TaskDTO;
import com.example.model.Task;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface TaskMapper {
    TaskMapper INSTANCE = Mappers.getMapper(TaskMapper.class);

    @Mappings({
            @Mapping(target = "entryDate", source = "entryDate", dateFormat = "yyyy-MM-dd"),
            @Mapping(target = "dueDate", source = "dueDate", dateFormat = "yyyy-MM-dd")
    })
    TaskDTO toTaskDTO (Task task);

    Task toTask(TaskDTO taskDTO);

    List<TaskDTO> toUserResponseDtoList(List<Task> taskList);
}
