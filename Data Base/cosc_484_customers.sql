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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `cid` varchar(50) NOT NULL,
  `age` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(150) NOT NULL,
  `street` varchar(150) NOT NULL,
  `city` varchar(150) NOT NULL,
  `state` char(2) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `fname` varchar(50) NOT NULL,
  PRIMARY KEY (`cid`),
  CONSTRAINT `phonemin` CHECK ((char_length(`phone`) >= 10)),
  CONSTRAINT `state_name` CHECK ((`state` in (_utf8mb4'AK',_utf8mb4'AL',_utf8mb4'AR',_utf8mb4'AS',_utf8mb4'AZ',_utf8mb4'CA',_utf8mb4'CO',_utf8mb4'CT',_utf8mb4'DC',_utf8mb4'DE',_utf8mb4'FL',_utf8mb4'GA',_utf8mb4'GU',_utf8mb4'HI',_utf8mb4'IA',_utf8mb4'ID',_utf8mb4'IL',_utf8mb4'IN',_utf8mb4'KS',_utf8mb4'KY',_utf8mb4'LA',_utf8mb4'MA',_utf8mb4'MD',_utf8mb4'ME',_utf8mb4'MI',_utf8mb4'MN',_utf8mb4'MO',_utf8mb4'MP',_utf8mb4'MS',_utf8mb4'MT',_utf8mb4'NC',_utf8mb4'ND',_utf8mb4'NE',_utf8mb4'NH',_utf8mb4'NJ',_utf8mb4'NM',_utf8mb4'NV',_utf8mb4'NY',_utf8mb4'OH',_utf8mb4'OK',_utf8mb4'OR',_utf8mb4'PA',_utf8mb4'PR',_utf8mb4'RI',_utf8mb4'SC',_utf8mb4'SD',_utf8mb4'TN',_utf8mb4'TX',_utf8mb4'UM',_utf8mb4'UT',_utf8mb4'VA',_utf8mb4'VI',_utf8mb4'VT',_utf8mb4'WA',_utf8mb4'WI',_utf8mb4'WV',_utf8mb4'WY'))),
  CONSTRAINT `zipmin` CHECK ((char_length(`zipcode`) >= 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('11111111111','18','555-789-0123','1234@anonymousspeech.com','3031 Orange Street','Lakeview','AR','78901','Young','    Gregory'),('11erxq8sv1','61','555-678-9012','chriscarter789@live.com','222 Cherry Avenue','Sycamore','VA','56789','Rodriguez','    Cannon'),('2xgo7uli3f','56','555-234-5678','kevinanderson789@rocketmail.com','888 Poplar Lane','Brookside','IL','90123','Anderson','    Hugo'),('4oqkx8b1u3','35','555-678-9012','andrewrobinson654@elude.in','2829 Grape Lane','Harborview','LA','56789','Hall','Makayla'),('78va3hxwe5','46','555-345-6789','dianagarcia321@tutanota.com','999 Hemlock Street','Woodland','MI','34567','Thomas','    Killian'),('8f68dwjy9m','35','555-890-1234','jamesharris789@startmail.com','1213 Laurel Boulevard','Pinehurst','SC','23456','Harris','    Alex'),('bfwihf82ec','60','555-789-0123','lindajackson456@protonmail.ch','1011 Fir Lane','Riverside','MO','78901','White','    Cristofer'),('bx8fevv062','44','555-901-2345','laurawhite987@zoho.com','555 Sycamore Court','Sunnyside','MA','12345','Lopez','    Reagan'),('e03ozecb03','52','555-123-4567','sandrajohnson456@fastmail.com','777 Cypress Drive','Meadowbrook','NC','23456','Wilson','    Eric'),('ex9copzumc','24','555-890-1234','robertrodriguez654@yandex.com','444 Aspen Street','Greenfield','NJ','67890','Hernandez','    Mohammad'),('fdi4bt5za2','39','555-901-2345','elizabethmartin321@safe-mail.net','1415 Pineapple Street','Oakdale','NV','45678','Martin','    Destinee'),('ffjnpe601r','46','555-567-8901','michelleking321@privatdemail.net','2627 Banana Circle','Rosewood','KY','34567','Walker','    Darrell'),('gmf9wsm0di','53','555-789-0123','amandajackson321@inbox.com','333 Magnolia Lane','Riverdale','OH','10234','Martinez','    Junior'),('hr8nw5xlb4','48','555-456-7890','ericphillips789@mail2tor.com','2425 Plum Road','Highland Park','OK','12345','Robinson','    Summer'),('i8pl5de4sf','18','555-789-0123','laurasmith987@anonymousspeech.com','3031 Orange Street','Lakeview','AR','78901','Young','    Gregory'),('jmn4fwnex1','60','555-456-7890','michaelthomas123@icloud.com','890 Willow Circle','Birchwood','CO','45678','Miller','    Jayda'),('jv9r3cuiq7','54','555-567-8901','jenniferlee456@protonmail.com','111 Spruce Boulevard','Ashland','AZ','90123','Davis','    Abdullah'),('l1ch6kdlv7','61','555-567-8901','lisawilson987@pm.com','4560 Chestnut Circle',' Lakeside','PA','56789','Moore','    Ian'),('mnb5cttozi','53','555-345-6789','ashleyevans456@riseup.net','2223 Peach Avenue','Mountainview','UT','61234','Lewis','    April'),('o4zs5kz11n','52','555-678-9012','patrickthompson123@guerrillamail.com','7890 Alder Avenue','Hillcrest','MD','21234','    Jackson','    Anna'),('pl1kmzuale','43','555-012-3456','matthewmartinez123@mail.com','666 Walnut Avenue','Clearwater','TN','89012','Gonzalez','    Zaniyah'),('pmcyv7nlr5','45','555-456-7890','stevenbrown654@mailinator.com','1230 Juniper Road','Springvale','OR','45678','Taylor','    Camila'),('r4ldg1zbwb','18','555-456-2345','marysmith456@gmail.com','456 Oak Avenue','Cedar Grove','FL','67890','Johnson','Joey'),('SccO1wbG5K0','18','757-757-7575','1234name@gmail.com','111 main','lancaster','VA','12345','roell','john'),('sjlz5cdrs3','48','555-234-5678','christopherroberts123@hushmail.com','2021 Kiwi Lane','Valleyview','IN','90123','Clark','    Tatum'),('veycfc0bpd','57','555-012-3456','ryanrivera654@mailfence.com','617 Mango Drive','Forestville','AL','67890','Thompson','    Hana'),('wwva336ldo','48','555-123-4567','kimberlytaylor987@countermail.com','1819 Papaya Court','Sunset Hills','WI','89012','Garcia','    Haven');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 21:41:11
