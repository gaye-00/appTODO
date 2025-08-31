package com.gaye.dotoApp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Ajoute un gestionnaire de ressources pour les images dans resources/img
        registry.addResourceHandler("/img/**")
                .addResourceLocations("classpath:/static/img/");
    }
}
