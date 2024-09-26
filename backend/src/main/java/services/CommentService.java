package services;

import data.entities.CommentEntity;
import data.repositories.CommentRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import web.dtos.CommentDto;
import web.mappers.CommentMapper;

import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class CommentService {
        @Inject
        CommentRepository  commentRepository;
        @Inject
        CommentMapper commentMapper;

        public CommentDto createComment(CommentDto commentDto){
            CommentEntity commentEntity= commentMapper.toEntity(commentDto);
            commentRepository.persist(commentEntity);
            return commentMapper.toDto(commentEntity);
        }
        public List<CommentDto> getAllComments(){
            List<CommentEntity> entities = commentRepository.listAll();
            return entities.stream()
                    .map(commentMapper::toDto)
                    .collect(Collectors.toList());

        }


}
