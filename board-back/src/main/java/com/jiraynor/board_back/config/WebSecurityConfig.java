package com.jiraynor.board_back.config;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.jiraynor.board_back.filter.JwtAuthenticationFilter;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Configurable
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    private final JwtAuthenticationFilter JwtAuthenticationFilter;

    @Bean
    protected SecurityFilterChain configure(HttpSecurity httpSecurity) throws Exception {
        // httpSecurity
        // // 리소스 쉐어링 보안표준
        // // 교차 출처 리소스 공유
        // .cors().and()
        // // CSRF 보호기능 비활성화
        // .csrf().disable()
        // // HTTP 기본 인증 방식 비활성화
        // .httpBasic().disable()
        // // 세션 정책을 STATELESS로 설정 (JWT 사용시 세션 사용 X)
        // .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        // // 요청에 대한 권한설정
        // .authorizeRequests()
        // .antMatchers().permitAll() // 특정 URL은 모든 사용자 허용
        // .anyRequest().authenticated(); // 그 외 요청은 인증 필요

        // JwtAuthenticationFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
        // httpSecurity.addFilterBefore(JwtAuthenticationFilter,
        // UsernamePasswordAuthenticationFilter.class);
        // 시큐리티필터체인 반환
        // return httpSecurity.build();

        return httpSecurity
                // CORS 설정 적용
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // CSRF 보호 비활성화
                .csrf(csrf -> csrf.disable())

                // HTTP 기본 인증 비활성화
                .httpBasic(httpBasic -> httpBasic.disable())

                // 세션을 사용하지 않는 Stateless 정책 적용
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // 요청별 권한 설정
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/public/**").permitAll() // 공개 API는 인증 없이 접근 가능
                        .anyRequest().authenticated() // 나머지 요청은 인증 필요
                )

                // JWT 필터를 추가 (기존 필터 앞에 배치)
                .addFilterBefore(new JwtAuthenticationFilter(null), UsernamePasswordAuthenticationFilter.class)

                // SecurityFilterChain 반환
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // 허용할 도메인 설정 (보안상 특정 도메인만 허용하는 게 좋음)
        configuration.setAllowedOrigins(List.of("*")); // 모든 도메인 허용
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true); // 인증 정보 포함 허용 (JWT 사용 시 true)

        // CORS 설정을 적용할 URL 패턴 지정
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

// 인증 실패
class FaildAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException authException) throws IOException, ServletException {

        response.setContentType("application/json");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("{\"code\" : \"AF\", \"message\":\"Authorization Failed.\"}");

    }

}