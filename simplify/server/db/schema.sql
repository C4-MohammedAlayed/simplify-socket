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
    senderName VARCHAR(255),
    sender_id INT,
    FOREIGN KEY (sender_id) REFERENCES user(userId),
    receiver_id INT,
    FOREIGN KEY (receiver_id) REFERENCES user(userId),
    message VARCHAR(500),
    sendingTime DATETIME,
    is_Read TINYINT DEFAULT 0,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY(messageId)

);
CREATE TABLE notifications(
 notificationId INT AUTO_INCREMENT Not NULL,
 receiver_id INT,
 FOREIGN KEY (receiver_id) REFERENCES user(userId),
 sender_id INT,
 FOREIGN KEY (sender_id) REFERENCES user(userId),
 PRIMARY KEY(notificationId)
);