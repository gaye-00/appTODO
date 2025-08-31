package com.gaye.dotoApp.email;

import lombok.Getter;

public enum EmailTemplate {
    INSCRIPTION_CONFIRMATION("inscription-confirmation.html", "Inscription successfully processed"),
    ORDER_CONFIRMATION("order-confirmation.html", "Order confirmation processed");

    @Getter
    private final String templatePath;
    @Getter
    private final String description;

    EmailTemplate(String templatePath, String description) {
        this.templatePath = templatePath;
        this.description = description;
    }
}
