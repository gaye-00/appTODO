package com.gaye.dotoApp.model;

import java.time.LocalDateTime;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntity {

     @Id
     @GeneratedValue(strategy =  GenerationType.AUTO)
     private Integer id;

     private LocalDateTime creatAt;
     private LocalDateTime lastModifiedAt;
     private String createdBy;
     private String lastModifiedBy;
}
