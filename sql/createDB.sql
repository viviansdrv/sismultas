-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: testetrabalhomultas
-- ------------------------------------------------------
-- Server version	8.0.26-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `gestor`
--
USE testetrabalhomultas;

DROP TABLE IF EXISTS `gestor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gestor` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `cod_orgao` int NOT NULL,
  PRIMARY KEY (`cod`),
  KEY `cod_orgao` (`cod_orgao`),
  CONSTRAINT `gestor_ibfk_1` FOREIGN KEY (`cod_orgao`) REFERENCES `orgao` (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gestor`
--

LOCK TABLES `gestor` WRITE;
/*!40000 ALTER TABLE `gestor` DISABLE KEYS */;
INSERT INTO `gestor` VALUES (1,'Vivian Menezes','79856670011',4),(2,'Clarissa Ferreira de Carvalho','74854496300',9),(3,'Ana Vitoria Gandra','23005614258',5),(4,'Helton de Oliveira Rodrigues','56233590123',7),(5,'Rodrigo Rodrigues de Oliveira','45892356012',6),(6,'Raphael de Santana Pereira','14227895203',9),(7,'Lilian Macedo Guimaraes','63302969808',10),(8,'Fernando Braga Goncalves','41512037852',2),(9,'Izabela Fernanda de Araujo','14256003592',1),(10,'Raisa Larissa de Aguiar','99520013784',10),(11,'Suellen de Lima Silva','00214635982',9);
/*!40000 ALTER TABLE `gestor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motivo`
--

DROP TABLE IF EXISTS `motivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivo` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `causa` varchar(60) NOT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motivo`
--

LOCK TABLES `motivo` WRITE;
/*!40000 ALTER TABLE `motivo` DISABLE KEYS */;
INSERT INTO `motivo` VALUES (1,'Má administração'),(2,'Dano causado ao patrimônio público'),(3,'Enriquecimento ilícito'),(4,'Atos que atentam contra os pricípios da Adm Pública'),(5,'Negligência na arrecadação de tributo');
/*!40000 ALTER TABLE `motivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `multa`
--

DROP TABLE IF EXISTS `multa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `multa` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `cod_gestor` int NOT NULL,
  `cod_motivo` int NOT NULL,
  `valor_total` decimal(6,2) NOT NULL,
  `qtd_parcelas` int NOT NULL,
  `pago` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cod`),
  KEY `cod_gestor` (`cod_gestor`),
  KEY `cod_motivo` (`cod_motivo`),
  CONSTRAINT `multa_ibfk_1` FOREIGN KEY (`cod_gestor`) REFERENCES `gestor` (`cod`),
  CONSTRAINT `multa_ibfk_2` FOREIGN KEY (`cod_motivo`) REFERENCES `motivo` (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `multa`
--

LOCK TABLES `multa` WRITE;
/*!40000 ALTER TABLE `multa` DISABLE KEYS */;
INSERT INTO `multa` VALUES (7,11,4,1000.00,3,0),(8,5,1,500.00,2,0),(9,9,2,1200.00,6,0);
/*!40000 ALTER TABLE `multa` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `QTDPARC` AFTER INSERT ON `multa` FOR EACH ROW BEGIN
 set @codigo = 0;
 set @parcelas = 0;
 SELECT cod into @codigo FROM multa where cod = new.cod;
 SELECT qtd_parcelas into @parcelas FROM multa where cod = new.cod;
 INSERT INTO parc_multa (cod_multa, parc_restantes) VALUES (@codigo, @parcelas);
 END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `orgao`
--

DROP TABLE IF EXISTS `orgao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orgao` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orgao`
--

LOCK TABLES `orgao` WRITE;
/*!40000 ALTER TABLE `orgao` DISABLE KEYS */;
INSERT INTO `orgao` VALUES (1,'Tribunal de Contas do Estado de Pará'),(2,'Tribunal de Contas do Estado do Rio de Janeiro'),(3,'Conselho Nacional do Ministério Público'),(4,'Ministério Público do Pará'),(5,'Instituto Nacional do Seguro Social'),(6,'Secretaria Estadual do Meio Ambiente'),(7,'Secretaria Municipal de Meio Ambiente'),(8,'Instituto Brasileiro de Geografia e Estatística'),(9,'Advocacia Geral da União'),(10,'Agência Brasileira de Inteligência'),(11,'Fundação de Desenvolvimento da UNICAMP'),(12,'Secretaria da Fazenda do Estado do Pará'),(13,'Procuradoria Geral do Estado do Pará');
/*!40000 ALTER TABLE `orgao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parc_multa`
--

DROP TABLE IF EXISTS `parc_multa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parc_multa` (
  `cod` int NOT NULL AUTO_INCREMENT,
  `cod_multa` int NOT NULL,
  `parc_restantes` int NOT NULL,
  PRIMARY KEY (`cod`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parc_multa`
--

LOCK TABLES `parc_multa` WRITE;
/*!40000 ALTER TABLE `parc_multa` DISABLE KEYS */;
INSERT INTO `parc_multa` VALUES (1,5,0),(2,6,0),(3,7,3),(4,8,2),(5,9,6);
/*!40000 ALTER TABLE `parc_multa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-19 16:41:06
