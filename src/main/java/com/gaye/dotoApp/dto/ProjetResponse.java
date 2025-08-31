package com.gaye.dotoApp.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.gaye.dotoApp.model.Tache;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProjetResponse {
    
    private Integer id;
    private LocalDateTime creatAt;
    private LocalDateTime lastModifiedAt;
    private String title;
    private String description;
    private Integer developerId;
    private List<Tache> taches; 
}
