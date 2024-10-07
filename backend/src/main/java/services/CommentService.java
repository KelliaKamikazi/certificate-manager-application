package services;

import data.entities.CertificateEntity;
import data.entities.CommentEntity;
import data.entities.UserEntity;
import data.repositories.CertificateRepository;
import data.repositories.CommentRepository;
import data.repositories.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;
import web.dtos.CommentDto;
import web.mappers.CommentMapper;

@ApplicationScoped
@Transactional
public class CommentService {
  @Inject CommentRepository commentRepository;
  @Inject CommentMapper commentMapper;
  @Inject UserRepository userRepository;
  @Inject CertificateRepository certificateRepository;

  public CommentDto createComment(CommentDto commentDto) {
    UserEntity user = userRepository.findById(commentDto.getUserId());
    CertificateEntity certificate = certificateRepository.findById(commentDto.getCertificateId());

    CommentEntity commentEntity = new CommentEntity();
    commentEntity.setUser(user);
    commentEntity.setCertificate(certificate);
    commentEntity.setContent(commentDto.getContent());
    commentRepository.persist(commentEntity);
    return commentMapper.toDto(commentEntity);
  }

  public List<CommentDto> getAllComments() {
    List<CommentEntity> entities = commentRepository.listAll();
    return entities.stream().map(commentMapper::toDto).collect(Collectors.toList());
  }
}
