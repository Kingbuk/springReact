package com.jiraynor.board_back.provider;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

//java been으로 등록
@Component
public class JwtProvider {

    // application propertys
    @Value("${secret-key}")
    public String secretKey;

    // 키 생성
    public String create(String email) {
        // 한시간짜리 객체 생성?
        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        // JWT 생성 빌터 객체 반환
        String jwt = Jwts.builder()
                // 토큰에 서명 추가 (ES256방식, 비밀키추가)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                // id설정 , 토큰 발행시간, 토큰 만료시간설정 jwt 문자열 생성
                .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate).compact();

        return jwt;
    }

    public String validate(String jwt) {

        Claims claims = null;

        try {
            claims = Jwts.parser().setSigningKey(secretKey)
                    .parseClaimsJws(jwt).getBody();
        } catch (Exception exception) {
            return null;
        }

        return claims.getSubject();

    }
}
