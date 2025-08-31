package com.gaye.dotoApp.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Async
    public void sendEmail(String to, String subject, EmailTemplate template, Context context) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            helper.setTo(to);
            helper.setSubject(subject);

            // Génération du contenu HTML avec Thymeleaf
            String htmlContent = templateEngine.process(template.getTemplatePath(), context);
            helper.setText(htmlContent, true); // true pour indiquer que le contenu est HTML
            helper.setFrom(fromEmail);

            javaMailSender.send(message);

            logger.info("\n\nEmail sent to " + to + " successfully\n");
        } catch (Exception e) {
            logger.error("Failed to send email", e);
        }
    }
}
