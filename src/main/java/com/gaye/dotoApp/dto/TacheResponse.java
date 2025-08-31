package com.gaye.dotoApp.dto;

import java.time.LocalDateTime;

import com.gaye.dotoApp.model.ETAT;
import com.gaye.dotoApp.model.PRIORITY;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TacheResponse {
    
    private Integer id;
    private String title;
    private LocalDateTime creatAt;
    private LocalDateTime lastModifiedAt;
    private String description;
    private ETAT etat;
    private PRIORITY priority;
    private LocalDateTime dueDate;
    private Integer projetId;
}
