-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.41 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- board 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `board` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `board`;

-- 테이블 board.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `board_number` int NOT NULL AUTO_INCREMENT COMMENT '게시물 번호',
  `title` text NOT NULL COMMENT '게시물 제목 ',
  `content` text NOT NULL COMMENT '게시물 내용',
  `write_datetime` datetime NOT NULL COMMENT '게시물 작성 날짜 및 시간',
  `favorite_count` int DEFAULT '0' COMMENT '게시물의 좋아요 수',
  `comment_count` int DEFAULT '0' COMMENT '게시물 댓글 수',
  `view_count` int NOT NULL DEFAULT '0' COMMENT '게시물 조회 수',
  `writer_email` varchar(50) NOT NULL COMMENT '게시글 작성자 이메일',
  PRIMARY KEY (`board_number`),
  KEY `FK_user_TO_board` (`writer_email`),
  CONSTRAINT `FK_user_TO_board` FOREIGN KEY (`writer_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시물 테이블';

-- 테이블 데이터 board.board:~0 rows (대략적) 내보내기
INSERT INTO `board` (`board_number`, `title`, `content`, `write_datetime`, `favorite_count`, `comment_count`, `view_count`, `writer_email`) VALUES
	(1, '제목', '내용입니다', '2025-02-25 21:32:00', 0, 0, 0, 'email@email.com');

-- 테이블 board.comment 구조 내보내기
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_number` int NOT NULL AUTO_INCREMENT COMMENT '댓글 번호',
  `comment` text NOT NULL COMMENT '댓글 내용',
  `write_datetime` datetime NOT NULL COMMENT '작성 날짜 및 시간',
  `user_email` varchar(50) NOT NULL COMMENT '사용자이메일',
  `board_number` int NOT NULL COMMENT '게시물 번호',
  PRIMARY KEY (`comment_number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='댓글 테이블';

-- 테이블 데이터 board.comment:~0 rows (대략적) 내보내기
INSERT INTO `comment` (`comment_number`, `comment`, `write_datetime`, `user_email`, `board_number`) VALUES
	(1, '반갑습니다', '2025-02-25 21:32:00', 'email@email.com', 1);

-- 테이블 board.favorite 구조 내보내기
CREATE TABLE IF NOT EXISTS `favorite` (
  `user_email` varchar(50) NOT NULL COMMENT '사용자 이메일',
  `board_number` int NOT NULL COMMENT '게시물 번호',
  KEY `FK_user_TO_favorite` (`user_email`),
  KEY `FK_board_TO_favorite` (`board_number`),
  CONSTRAINT `FK_board_TO_favorite` FOREIGN KEY (`board_number`) REFERENCES `board` (`board_number`),
  CONSTRAINT `FK_user_TO_favorite` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='좋아요 테이블';

-- 테이블 데이터 board.favorite:~0 rows (대략적) 내보내기

-- 테이블 board.image 구조 내보내기
CREATE TABLE IF NOT EXISTS `image` (
  `board_number` int NOT NULL COMMENT '게시물 번호',
  `image` text COMMENT '게시물 이미지 URL',
  KEY `FK_board_TO_image` (`board_number`),
  CONSTRAINT `FK_board_TO_image` FOREIGN KEY (`board_number`) REFERENCES `board` (`board_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='게시물 이미지 테이블';

-- 테이블 데이터 board.image:~0 rows (대략적) 내보내기

-- 테이블 board.search_log 구조 내보내기
CREATE TABLE IF NOT EXISTS `search_log` (
  `sequence` int NOT NULL AUTO_INCREMENT COMMENT '시퀀스(순서)',
  `search` text NOT NULL COMMENT '검색어',
  `relation_word` text COMMENT '관련 검색어',
  `relation` tinyint(1) NOT NULL COMMENT '관련 검색어 여부',
  PRIMARY KEY (`sequence`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='검색기록 테이블';

-- 테이블 데이터 board.search_log:~0 rows (대략적) 내보내기

-- 테이블 board.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(50) NOT NULL COMMENT '사용자이메일',
  `password` varchar(100) NOT NULL COMMENT '사용자 비밀번호',
  `nickname` varchar(20) NOT NULL COMMENT '사용자 닉네임',
  `tel_number` varchar(15) NOT NULL COMMENT '사용자 휴대번호',
  `address` text NOT NULL COMMENT '사용자 주소',
  `address_detail` text COMMENT '상세주소',
  `profile_image` text COMMENT '사용자 프로필 사진',
  PRIMARY KEY (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='사용자 테이블';

-- 테이블 데이터 board.user:~0 rows (대략적) 내보내기
INSERT INTO `user` (`email`, `password`, `nickname`, `tel_number`, `address`, `address_detail`, `profile_image`) VALUES
	('email@email.com', 'P!ssw0rd', 'nickname', '01012345678', '서울특별시 은평구', '롯데백화점', NULL),
	('email2@email.com', 'P!ssw0rd', 'nick', '01012345678', '서울특별시 은평구', '롯데백화점', NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
