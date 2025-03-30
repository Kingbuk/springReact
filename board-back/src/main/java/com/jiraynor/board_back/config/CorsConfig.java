package com.jiraynor.board_back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {
        corsRegistry
                // 모든 매핑 처리
                .addMapping("/**")
                // 모든 메서드의 CORS 허용
                .allowedMethods("*")
                // 어쩐 출처에 대해서도 모든것을 허용
                .allowedOrigins("*");
    }

}
