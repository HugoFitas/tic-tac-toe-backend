DROP DATABASE IF EXISTS tictactoe;

CREATE DATABASE tictactoe;

USE tictactoe;

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `high_score` int
);
