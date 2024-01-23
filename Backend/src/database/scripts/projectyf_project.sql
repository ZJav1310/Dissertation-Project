CREATE DATABASE  IF NOT EXISTS `projectyf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `projectyf`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: projectyf
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_title` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL,
  `project_content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `max_capacity` int NOT NULL DEFAULT '1',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime(3) DEFAULT NULL,
  `application_deadline` datetime(3) DEFAULT NULL,
  `author_id` int NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `Project_authorId_fkey` (`authorId`),
  CONSTRAINT `Project_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (21,'Project 1','This is the content for Project 1',3,'2022-01-01 07:35:22',NULL,'2022-02-01 18:45:10.000',2),(22,'Project 2','This is the content for Project 2',5,'2022-01-02 13:12:55',NULL,'2022-02-02 10:22:48.000',2),(23,'Project 3','This is the content for Project 3',2,'2022-01-03 21:08:02',NULL,'2022-02-03 23:59:59.000',2),(24,'Project 4','This is the content for Project 4',4,'2022-01-04 17:14:03',NULL,'2022-02-04 01:59:59.000',3),(25,'Project 5','This is the content for Project 5',6,'2022-01-05 05:02:34',NULL,'2022-02-05 14:21:56.000',3),(26,'Project 6','This is the content for Project 6',3,'2022-01-06 22:59:59',NULL,'2022-02-06 11:11:11.000',4),(27,'Project 7','This is the content for Project 7',2,'2022-01-07 10:45:01',NULL,'2022-02-07 21:37:49.000',4),(28,'Project 8','This is the content for Project 8',5,'2022-01-08 16:28:59',NULL,'2022-02-08 03:15:37.000',4),(29,'Project 9','This is the content for Project 9',3,'2022-01-09 04:19:20',NULL,'2022-02-09 09:59:59.000',5),(30,'Project 10','This is the content for Project 10',4,'2022-01-10 23:59:59',NULL,'2022-02-10 15:44:32.000',5);
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-15 15:28:48
