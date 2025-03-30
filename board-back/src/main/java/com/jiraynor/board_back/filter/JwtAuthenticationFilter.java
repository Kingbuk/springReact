package com.jiraynor.board_back.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.jiraynor.board_back.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
// 필수 생성자 생성.
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String token = parseBearerToken(request);

            if (token == null) {
                filterChain.doFilter(request, response);
                return;
            }
            // 기간 만료 확인
            String email = jwtProvider.validate(token);

            if (email == null) {
                filterChain.doFilter(request, response);
                return;
            }

            AbstractAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, null,
                    AuthorityUtils.NO_AUTHORITIES);
            // 디테일 정보 구축
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // context 등록을 위한 콘텍스트 생성
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            // context 등록
            securityContext.setAuthentication(authenticationToken);

            // 외부에서 사용을 위한 셋팅
            SecurityContextHolder.setContext(securityContext);

        } catch (Exception ex) {
            // TODO: handle exception
            ex.printStackTrace();

        }

        filterChain.doFilter(request, response);

    }

    // 뽑아낸 토큰 반환
    private String parseBearerToken(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        // null이거나 공백으로 채워졌는지 확인
        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization)
            return null;

        // Bearer로 시작하는지
        boolean isBearer = authorization.startsWith("Bearer ");
        if (!isBearer)
            return null;

        String token = authorization.substring(7);
        return token;
    }

}