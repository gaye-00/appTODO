package com.gaye.dotoApp;

import java.time.LocalDateTime;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.gaye.dotoApp.authentication.AuthenticationService;
import com.gaye.dotoApp.dto.AdminRequest;
import com.gaye.dotoApp.dto.DeveloperRequest;
import com.gaye.dotoApp.dto.ProjetRequest;
import com.gaye.dotoApp.dto.TacheRequest;
import com.gaye.dotoApp.model.ETAT;
import com.gaye.dotoApp.model.PRIORITY;
import com.gaye.dotoApp.model.SPECIALITY;
import com.gaye.dotoApp.service.ProjetService;
import com.gaye.dotoApp.service.TacheService;
import com.github.javafaker.Faker;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InitiatorTODOApp implements CommandLineRunner {

    private final AuthenticationService authenticationService;
    private final ProjetService projetService;
    private final TacheService tacheService;
    @Override
    public void run(String... args) throws Exception {
        // authenticationService.register(new AdminRequest("Abdoulaye", "Gaye", "gayeab@gmail.com", "passer123"));
        // authenticationService.register(new DeveloperRequest(SPECIALITY.BACKEND ,"Abdoulaye", "Gaye", "passer", "gaye@gmail.com"));
        // authenticationService.register(new DeveloperRequest(SPECIALITY.FRONTEND, "Mamadou", "Diallo", "passer", "diallo@gmail.com"));

        // Faker faker = new Faker();

        // for (int i = 0; i < 10; i++) {
        //     projetService.create(new ProjetRequest(
        //         faker.name().firstName(),
        //         faker.lorem().sentence(),
        //         2
        //     ));
        // }

        // for (int i = 0; i < 50; i++) {
        //     tacheService.create(new TacheRequest(faker.lorem().word(),
        //         faker.lorem().sentence(),
        //         ETAT.values()[faker.number().numberBetween(0, ETAT.values().length)],
        //         PRIORITY.values()[faker.number().numberBetween(0, PRIORITY.values().length)],
        //         LocalDateTime.now().plusDays(faker.number().numberBetween(1, 30)),
        //         faker.number().numberBetween(1, 10)
        //     ));
        // }

        // // Initialisation des projets et des tâches pour le developpeur 1
        // for (int i = 0; i < 10; i++) {
        //     projetService.create(new ProjetRequest(
        //         faker.name().firstName(),
        //         faker.lorem().sentence(),
        //         2 // ID du développeur 1
        //     ));

        //     tacheService.create(new TacheRequest(faker.lorem().word(),
        //         faker.lorem().sentence(),
        //         ETAT.values()[faker.number().numberBetween(0, ETAT.values().length)],
        //         PRIORITY.values()[faker.number().numberBetween(0, PRIORITY.values().length)],
        //         LocalDateTime.now().plusDays(faker.number().numberBetween(1, 30)),
        //         2 // ID du projet créé
        //     ));
        // }
        
        System.out.println("\nInitialisation de l'application TODO terminée.\n");
    }
    
}
