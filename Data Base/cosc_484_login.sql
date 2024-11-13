-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: cosc_484
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `user_name` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `cid` varchar(50) NOT NULL,
  PRIMARY KEY (`user_name`),
  KEY `cid` (`cid`),
  CONSTRAINT `login_ibfk_1` FOREIGN KEY (`cid`) REFERENCES `customers` (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES ('1234name@gmail.com','123abc','SccO1wbG5K0'),('amandajackson321@inbox.com','123abc','gmf9wsm0di'),('andrewrobinson654@elude.in','123abc','4oqkx8b1u3'),('ashleyevans456@riseup.net','123abc','mnb5cttozi'),('chriscarter789@live.com','123abc','11erxq8sv1'),('christopherroberts123@hushmail.com','123abc','sjlz5cdrs3'),('dianagarcia321@tutanota.com','123abc','78va3hxwe5'),('elizabethmartin321@safe-mail.net','123abc','fdi4bt5za2'),('ericphillips789@mail2tor.com','123abc','hr8nw5xlb4'),('jamesharris789@startmail.com','123abc','8f68dwjy9m'),('jenniferlee456@protonmail.com','123abc','jv9r3cuiq7'),('kevinanderson789@rocketmail.com','123abc','2xgo7uli3f'),('kimberlytaylor987@countermail.com','123abc','wwva336ldo'),('laurasmith987@anonymousspeech.com','123abc','i8pl5de4sf'),('laurawhite987@zoho.com','123abc','bx8fevv062'),('lindajackson456@protonmail.ch','123abc','bfwihf82ec'),('lisawilson987@pm.com','123abc','l1ch6kdlv7'),('marysmith456@gmail.com','123abc','r4ldg1zbwb'),('matthewmartinez123@mail.com','123abc','pl1kmzuale'),('michaelthomas123@icloud.com','123abc','jmn4fwnex1'),('michelleking321@privatdemail.net','123abc','ffjnpe601r'),('patrickthompson123@guerrillamail.com','123abc','o4zs5kz11n'),('robertrodriguez654@yandex.com','123abc','ex9copzumc'),('ryanrivera654@mailfence.com','123abc','veycfc0bpd'),('sandrajohnson456@fastmail.com','123abc','e03ozecb03'),('stevenbrown654@mailinator.com','123abc','pmcyv7nlr5');
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 21:41:10
