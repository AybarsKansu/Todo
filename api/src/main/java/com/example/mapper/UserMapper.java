package com.example.mapper;

import com.example.dto.UserDTO;
import com.example.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    // entity to dto
    UserDTO toUserDTO(User user);

    // dto to entity
    User toUser(UserDTO userResponseDto);

    // list of entities to list of dto
    List<UserDTO> toUserResponseDtoList(List<User> userList);
}
