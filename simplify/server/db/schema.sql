DROP DATABASE  socket;
CREATE DATABASE socket;

USE socket;

CREATE TABLE roles(
    roleId int AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY(roleId)
);

CREATE TABLE user(
    userId INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    gender VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    roleId INT,
    FOREIGN KEY (roleId) REFERENCES roles(roleId),
    PRIMARY KEY(userId)
);

CREATE TABLE messages(
    messageId INT AUTO_INCREMENT Not Null,
    messageContent VARCHAR(255),
    messageSender VARCHAR(255),
    messageReceive INT,
    FOREIGN KEY (messageReceive) REFERENCES user(userId),
    sendingTime DATETIME,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY(messageId)

);