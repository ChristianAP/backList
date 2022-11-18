CREATE DATABASE  IF NOT EXISTS `syssales` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `syssales`;
-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: us-cdbr-east-04.cleardb.com    Database: syssales
-- ------------------------------------------------------
-- Server version	5.6.50-log

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
-- Table structure for table `sv_access`
--

DROP TABLE IF EXISTS `sv_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_access` (
  `ACC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACC_FATHER` int(11) DEFAULT NULL,
  `ACC_NAME` text,
  `ACC_DESCRIPTION` text,
  `ACC_URL` text,
  `ACC_ICON` text,
  `ACC_ALT` text,
  `ACC_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ACC_ID`),
  UNIQUE KEY `ACC_ID_UNIQUE` (`ACC_ID`),
  KEY `ACC_FATHER` (`ACC_FATHER`),
  CONSTRAINT `FK_sv_access_sv_access` FOREIGN KEY (`ACC_FATHER`) REFERENCES `sv_access` (`ACC_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=305 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_access`
--

LOCK TABLES `sv_access` WRITE;
/*!40000 ALTER TABLE `sv_access` DISABLE KEYS */;
INSERT INTO `sv_access` VALUES (1,NULL,'Ventas','Acceso 1','/ventas','access','access','1'),(2,NULL,'Producto','Acceso 2','/producto','access','access','1'),(3,NULL,'Compra','Acceso 3','/compra',NULL,NULL,'1'),(4,NULL,'Configuración','Acceso 4','/configuracion',NULL,NULL,'1'),(5,NULL,'Soporte','bla bla bla','/soporte',NULL,NULL,NULL),(15,1,'Realizar Venta','','/realizar-venta',NULL,NULL,NULL),(25,1,'Listar Venta','','/listar-venta',NULL,NULL,NULL),(35,1,'Comprobantes Electrónicos','','/comprobantes',NULL,NULL,NULL),(45,1,'Listar Clientes','','/listar-clientes',NULL,NULL,NULL),(55,1,'Listar Ventas Online','','/listar-ventas-online',NULL,NULL,NULL),(65,1,'Impresion','','/impresion',NULL,NULL,NULL),(75,2,'Registrar Producto',NULL,'/registrar-producto',NULL,NULL,NULL),(85,2,'Categoria',NULL,'/categoria',NULL,NULL,NULL),(95,2,'Marca',NULL,'/marca',NULL,NULL,NULL),(105,2,'Descuento',NULL,'/descuento',NULL,NULL,NULL),(115,2,'Lista de Precios',NULL,'/lista-precios',NULL,NULL,NULL),(125,2,'Promocion',NULL,'/promocion',NULL,NULL,NULL),(135,2,'Kardex Productos',NULL,'/kardex-productos',NULL,NULL,NULL),(145,3,'Registrar Compra',NULL,'/registrar-compra',NULL,NULL,NULL),(155,3,'Listar Proveedor',NULL,'/listar-proveedor',NULL,NULL,NULL),(165,4,'Usuarios',NULL,'/usuarios',NULL,NULL,NULL),(175,4,'Empresa',NULL,'/empresa',NULL,NULL,NULL),(245,5,'Informes',NULL,'/ticket',NULL,NULL,NULL),(255,5,'Tickets Nuevos',NULL,'/nuevos',NULL,NULL,NULL),(265,5,'Tickets Abiertos',NULL,'/abiertos',NULL,NULL,NULL),(275,5,'Tickets pendientes',NULL,'/pendientes',NULL,NULL,NULL),(285,5,'Tickets sin resolver',NULL,'/sinresolver',NULL,NULL,NULL),(295,4,'Impresora',NULL,'/impresora',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sv_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_access_rol`
--

DROP TABLE IF EXISTS `sv_access_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_access_rol` (
  `ARO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROL_ID` int(11) NOT NULL,
  `ACC_ID` int(11) NOT NULL,
  `ARO_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ARO_ID`),
  UNIQUE KEY `ARO_ID_UNIQUE` (`ARO_ID`),
  KEY `fk_sv_access_rol_sv_rol1_idx` (`ROL_ID`),
  KEY `fk_sv_access_rol_sv_access1_idx` (`ACC_ID`),
  CONSTRAINT `fk_sv_access_rol_sv_access1` FOREIGN KEY (`ACC_ID`) REFERENCES `sv_access` (`ACC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_access_rol_sv_rol1` FOREIGN KEY (`ROL_ID`) REFERENCES `sv_rol` (`ROL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_access_rol`
--

LOCK TABLES `sv_access_rol` WRITE;
/*!40000 ALTER TABLE `sv_access_rol` DISABLE KEYS */;
INSERT INTO `sv_access_rol` VALUES (6,1,15,'1'),(7,1,25,'1'),(8,1,35,'1'),(9,1,45,'1'),(10,1,55,'1'),(11,1,65,'1'),(12,1,75,'1'),(13,1,85,'1'),(15,1,95,'1'),(25,1,105,'1'),(35,1,115,'1'),(45,1,125,'1'),(55,1,135,'1'),(65,1,145,'1'),(75,1,155,'1'),(85,1,165,'1'),(95,1,175,'1'),(105,1,245,'1'),(115,1,255,'1'),(125,1,265,'1'),(135,1,275,'1'),(145,1,285,'1'),(155,1,295,'1');
/*!40000 ALTER TABLE `sv_access_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_business`
--

DROP TABLE IF EXISTS `sv_business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_business` (
  `BUS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `bus_ruc` varchar(22) DEFAULT '',
  `bus_razonSocial` varchar(50) DEFAULT '',
  `bus_nombreComer` varchar(50) DEFAULT '',
  `bus_ubigeo` varchar(50) DEFAULT '',
  `bus_departamento` varchar(50) DEFAULT '',
  `bus_provincia` varchar(50) DEFAULT '',
  `bus_distrito` varchar(50) DEFAULT '',
  `bus_urbanizacion` varchar(50) DEFAULT '',
  `bus_direccion` varchar(50) DEFAULT '',
  `bus_estado` varchar(50) DEFAULT '',
  PRIMARY KEY (`BUS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_business`
--

LOCK TABLES `sv_business` WRITE;
/*!40000 ALTER TABLE `sv_business` DISABLE KEYS */;
INSERT INTO `sv_business` VALUES (5,'1074372091','KEVIN ALEXANDER SORAS PICHIHUA','kevinCorpLasSirenas','LIMA','LIMA','LIMA','QUILMANA','LIMA','LIMA','1');
/*!40000 ALTER TABLE `sv_business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_category`
--

DROP TABLE IF EXISTS `sv_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_category` (
  `CAT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CAT_NAME` varchar(45) DEFAULT NULL,
  `CAT_DESCRIPTION` varchar(45) DEFAULT NULL,
  `CAT_IMAGE` text,
  `CAT_CREATE_DATE` varchar(45) DEFAULT NULL,
  `CAT_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`CAT_ID`),
  UNIQUE KEY `CAT_ID_UNIQUE` (`CAT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=935 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_category`
--

LOCK TABLES `sv_category` WRITE;
/*!40000 ALTER TABLE `sv_category` DISABLE KEYS */;
INSERT INTO `sv_category` VALUES (1,'Laptop','Laptop','https://ayjoe.engrave.site/img/default.jpg','2021-09-24T09:18','1'),(5,'Impresoras','Categoria de impresoras','https://ayjoe.engrave.site/img/default.jpg','2021-09-23T21:21','1'),(15,'Televisores','Categoria de televisores ','https://ayjoe.engrave.site/img/default.jpg','2021-09-01T11:19','1'),(825,'cc','cc','https://ayjoe.engrave.site/img/default.jpg','2021-09-02T23:12','2'),(865,'asd 11111','asd','https://ayjoe.engrave.site/img/default.jpg','2021-09-15T23:22','2'),(875,'fafa','adsad','https://ayjoe.engrave.site/img/default.jpg','2021-09-19T12:06','2'),(885,'Software free','Categoria de software free','','12/12/2021','2'),(895,'Prueba 2','Prueba 2','https://ayjoe.engrave.site/img/default.jpg','2021-10-15T15:32','2'),(915,'Prueba 6','Prueba 6','https://ayjoe.engrave.site/img/default.jpg','2021-10-18T23:28','2'),(925,'Audio y música','Audio y música','https://ayjoe.engrave.site/img/default.jpg','2021-11-14T16:36','1');
/*!40000 ALTER TABLE `sv_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_clasification`
--

DROP TABLE IF EXISTS `sv_clasification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_clasification` (
  `CLA_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLA_NAME` text,
  `CLA_DESCRIPTION` text,
  `CLA_DATE_CREATE` varchar(45) DEFAULT NULL,
  `CLA_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`CLA_ID`),
  UNIQUE KEY `CLA_ID_UNIQUE` (`CLA_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_clasification`
--

LOCK TABLES `sv_clasification` WRITE;
/*!40000 ALTER TABLE `sv_clasification` DISABLE KEYS */;
INSERT INTO `sv_clasification` VALUES (1,'GOLD','PERSONA QUE COMPRA SIEMPRE EN LA TIENDA, 10 A + COMPRAS','25/08/2021','1'),(2,'SILVER','PERSONA QUE COMPRA A VECES, DE 10  A 5 COMPRAS','25/08/2021','1'),(3,'BRONZE','PERSONA QUE COMPRA A VECES, MENOS DE 5 COMPRAS','25/08/2021','1');
/*!40000 ALTER TABLE `sv_clasification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_client`
--

DROP TABLE IF EXISTS `sv_client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_client` (
  `CLI_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PER_ID` int(11) DEFAULT NULL,
  `CLA_ID` int(11) DEFAULT NULL,
  `GRO_ID` int(11) DEFAULT NULL,
  `CLI_DATE_CREATE` varchar(45) DEFAULT NULL,
  `CLI_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`CLI_ID`),
  UNIQUE KEY `CLI_ID_UNIQUE` (`CLI_ID`),
  KEY `CLI_CLA_ID_idx` (`CLA_ID`),
  KEY `CLI_GRO_ID_idx` (`GRO_ID`),
  KEY `CLI_PER_ID_idx` (`PER_ID`),
  CONSTRAINT `CLI_CLA_ID` FOREIGN KEY (`CLA_ID`) REFERENCES `sv_clasification` (`CLA_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `CLI_GRO_ID` FOREIGN KEY (`GRO_ID`) REFERENCES `sv_group` (`GRO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `CLI_PER_ID` FOREIGN KEY (`PER_ID`) REFERENCES `sv_person` (`PER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_client`
--

LOCK TABLES `sv_client` WRITE;
/*!40000 ALTER TABLE `sv_client` DISABLE KEYS */;
INSERT INTO `sv_client` VALUES (1,2,1,2,'25/08/2021','1'),(7,9,1,1,'25/08/2021','1'),(8,10,1,1,'25/08/2021','1'),(9,11,1,1,'25/08/2021','1'),(15,75,1,1,'[object Promise]','1'),(45,125,1,1,'[object Promise]','1'),(55,135,1,1,'[object Promise]','1'),(65,145,1,1,'[object Promise]','1'),(75,155,1,1,'[object Promise]','1'),(85,165,1,1,'[object Promise]','1'),(95,175,1,1,'[object Promise]','1'),(105,185,1,1,'[object Promise]','1'),(125,205,1,1,'[object Promise]','1'),(135,215,1,1,'[object Promise]','1'),(145,225,1,1,'2021-09-08T19:52:14.210Z','1'),(155,235,1,1,'2021-09-10T00:57:56.404Z','1'),(175,275,1,2,'15/10/2021 15:36:47','1'),(185,285,1,1,'17/10/2021 17:41:24','1'),(195,305,1,1,'18/10/2021 23:44:38','1'),(205,315,1,1,'18/10/2021 23:58:01','1'),(215,325,1,1,'23/10/2021 21:46:47','1'),(225,335,3,1,'24/10/2021 17:58:15','1'),(245,395,3,1,'2/11/2021 19:09:12','1'),(255,405,3,1,'2/11/2021 19:12:24','1'),(285,445,3,1,'2/11/2021 22:04:38','1'),(295,465,3,1,'3/11/2021 17:48:15','1'),(305,7,3,1,'3/11/2021 17:50:23','1'),(315,485,3,1,'4/11/2021 13:42:17','1'),(325,495,3,1,'4/11/2021 13:43:03','1'),(335,505,3,1,'4/11/2021 13:44:12','1'),(345,515,3,1,'4/11/2021 13:58:59','1'),(355,525,3,1,'4/11/2021 14:03:56','1'),(365,535,3,1,'4/11/2021 14:08:16','1');
/*!40000 ALTER TABLE `sv_client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_company`
--

DROP TABLE IF EXISTS `sv_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_company` (
  `COM_ID` int(11) NOT NULL AUTO_INCREMENT,
  `BUS_ID` int(11) DEFAULT NULL,
  `COM_ORGANIZATION_LOGO` text,
  `COM_COMPANY_NAME` text,
  `COM_ORGANIZATION_SECTOR` text,
  `COM_ORGANIZATION_RUC` text,
  `COM_ORGANIZATION_TYPE` text,
  `COM_CONSTITUTION_YEAR` text,
  `COM_ORGANIZATION_DIRECTION` text,
  `COM_ORGANIZATION_WEB_PAGE` text,
  `COM_ORGANIZATION_EMAIL` text,
  `COM_ORGANIZATION_PHONE_ONE` text,
  `COM_ORGANIZATION_PHONE_TWO` text,
  `COM_ORGANIZATION_PHONE_THREE` text,
  `COM_REPRESENTATIVE_LEGAL` text,
  `COM_REPRESENTATIVE_EMAIL` text,
  `COM_REPRESENTATIVE_PHONE` text,
  `COM_REPRESENTATIVE_DIRECTION` text,
  `COM_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`COM_ID`),
  UNIQUE KEY `COM_ID_UNIQUE` (`COM_ID`),
  KEY `BUS_ID_COMPANY_ID_idx` (`BUS_ID`),
  CONSTRAINT `BUS_ID_COMPANY_ID` FOREIGN KEY (`BUS_ID`) REFERENCES `sv_business` (`BUS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_company`
--

LOCK TABLES `sv_company` WRITE;
/*!40000 ALTER TABLE `sv_company` DISABLE KEYS */;
INSERT INTO `sv_company` VALUES (2,5,'https://cudesi.com.pe/wp-content/uploads/2021/08/cropped-CUDESI-SAC-LOGO-PNG-1536x969.png','CUDESI','TECNOLOGIA','12345678911','Industrial','2017-03-03','Lima, Ñaña, K19, San juan de lurigancho','cudesi.com.pe','cudesi@cudesi.com.pe','925887500','925887501','925887502','Brain Albornoz','bbalbornoz@cudesi.com.pe','123456789','Lima','1');
/*!40000 ALTER TABLE `sv_company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_config`
--

DROP TABLE IF EXISTS `sv_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_config` (
  `CON_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEM_ID` int(11) NOT NULL,
  `USR_ID` int(11) DEFAULT NULL,
  `DCT_ID` int(11) NOT NULL,
  PRIMARY KEY (`CON_ID`),
  KEY `TEM_ID` (`TEM_ID`),
  KEY `USR_ID` (`USR_ID`),
  KEY `DOT_ID` (`DCT_ID`),
  CONSTRAINT `FK__sv_document_type` FOREIGN KEY (`DCT_ID`) REFERENCES `sv_document_type` (`DCT_ID`),
  CONSTRAINT `FK__sv_user` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`),
  CONSTRAINT `FK_sv_config_sv_template` FOREIGN KEY (`TEM_ID`) REFERENCES `sv_template` (`TEM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_config`
--

LOCK TABLES `sv_config` WRITE;
/*!40000 ALTER TABLE `sv_config` DISABLE KEYS */;
INSERT INTO `sv_config` VALUES (5,5,15,5),(15,5,15,15);
/*!40000 ALTER TABLE `sv_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_configuration`
--

DROP TABLE IF EXISTS `sv_configuration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_configuration` (
  `CNF_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CNF_COLOR` varchar(45) DEFAULT NULL,
  `CNF_NAME` varchar(45) DEFAULT NULL,
  `CNF_KIND` varchar(45) DEFAULT NULL,
  `CNF_DATE` varchar(45) DEFAULT NULL,
  `CNF_STATUS` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CNF_ID`),
  UNIQUE KEY `CNF_ID_UNIQUE` (`CNF_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_configuration`
--

LOCK TABLES `sv_configuration` WRITE;
/*!40000 ALTER TABLE `sv_configuration` DISABLE KEYS */;
/*!40000 ALTER TABLE `sv_configuration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_discount_detail`
--

DROP TABLE IF EXISTS `sv_discount_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_discount_detail` (
  `DSP_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DIS_ID` int(11) DEFAULT NULL,
  `PRO_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`DSP_ID`),
  KEY `FK_sv_discount_detail_sv_discounts` (`DIS_ID`),
  KEY `FK_sv_discount_detail_sv_product` (`PRO_ID`),
  CONSTRAINT `FK_sv_discount_detail_sv_discounts` FOREIGN KEY (`DIS_ID`) REFERENCES `sv_discounts` (`DIS_ID`) ON DELETE CASCADE,
  CONSTRAINT `FK_sv_discount_detail_sv_product` FOREIGN KEY (`PRO_ID`) REFERENCES `sv_product` (`PRO_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=205 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_discount_detail`
--

LOCK TABLES `sv_discount_detail` WRITE;
/*!40000 ALTER TABLE `sv_discount_detail` DISABLE KEYS */;
INSERT INTO `sv_discount_detail` VALUES (5,5,1),(125,155,5),(135,165,25),(145,165,35),(165,185,105),(175,185,35),(195,205,5);
/*!40000 ALTER TABLE `sv_discount_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_discounts`
--

DROP TABLE IF EXISTS `sv_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_discounts` (
  `DIS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DIS_NAME` varchar(45) DEFAULT NULL,
  `DIS_DESCRIPTION` varchar(45) DEFAULT NULL,
  `TDS_ID` int(11) NOT NULL,
  `DIS_PERCENTAGE` varchar(45) DEFAULT NULL,
  `DIS_AMOUNT` varchar(45) DEFAULT NULL,
  `DIS_START_DATE` varchar(45) DEFAULT NULL,
  `DIS_END_DATE` varchar(45) DEFAULT NULL,
  `DIS_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`DIS_ID`),
  UNIQUE KEY `DIS_ID_UNIQUE` (`DIS_ID`),
  KEY `fk_sv_discounts_sv_type_discount1_idx` (`TDS_ID`),
  CONSTRAINT `fk_sv_discounts_sv_type_discount1` FOREIGN KEY (`TDS_ID`) REFERENCES `sv_type_discount` (`TDS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_discounts`
--

LOCK TABLES `sv_discounts` WRITE;
/*!40000 ALTER TABLE `sv_discounts` DISABLE KEYS */;
INSERT INTO `sv_discounts` VALUES (5,'Primer descuento compra','Siuuu arriba perú',5,'5','1','17-08-2021','25-08-2021','1'),(155,'Nuevo Descuento','Nuevo Descuento',5,'50','2','string','string','2'),(165,'Nuevo Descuento','Nuevo Descuento',5,'5','2','string','string','1'),(185,'Nuevo Descuento','Nuevo Descuento',5,'35','2','string','string','2'),(205,'Nuevo Descuento','Nuevo Descuento',5,'20','2','string','string','1');
/*!40000 ALTER TABLE `sv_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_document`
--

DROP TABLE IF EXISTS `sv_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_document` (
  `DOC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PMT_ID` int(11) NOT NULL,
  `DCT_ID` int(11) NOT NULL,
  `SLT_ID` int(11) NOT NULL,
  `XCR_ID` int(11) NOT NULL,
  `BUS_ID` int(11) NOT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `DOC_ID_CLIENT` varchar(15) DEFAULT NULL,
  `DOC_BUSINESS_NAME` varchar(500) DEFAULT NULL,
  `DOC_DIRECTION_CLIENT` varchar(500) DEFAULT NULL,
  `DOC_NAME` varchar(45) DEFAULT NULL,
  `DOC_DOC_TYPE` varchar(15) DEFAULT NULL,
  `DOC_SERIE` varchar(45) DEFAULT NULL,
  `DOC_NUMBER` int(11) DEFAULT NULL,
  `DOC_SUB_SUBTOTAL` double DEFAULT NULL,
  `DOC_SUB_DISCOUNT` double DEFAULT NULL,
  `DOC_SUBTOTAL` double DEFAULT NULL,
  `DOC_DISCOUNT` double DEFAULT NULL,
  `DOC_TAXED` double DEFAULT NULL,
  `DOC_INAFECT` double DEFAULT NULL,
  `DOC_RELEASED` double DEFAULT NULL,
  `DOC_IGV` double DEFAULT NULL,
  `DOC_NETO` double DEFAULT NULL,
  `DOC_STATUS` varchar(40) DEFAULT NULL,
  `DOC_CURRENCY` varchar(45) DEFAULT NULL,
  `DOC_D_ISSUE` varchar(45) DEFAULT NULL,
  `DOC_D_EXPIRATION` varchar(45) DEFAULT NULL,
  `DOC_TAXABLE` varchar(45) DEFAULT NULL,
  `DOC_DETRACTION` varchar(45) DEFAULT NULL,
  `DOC_URLUBICATION` varchar(180) DEFAULT NULL,
  `DOC_ERROR` varchar(1200) DEFAULT NULL,
  `DOC_DATE` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`DOC_ID`),
  UNIQUE KEY `DOC_ID_UNIQUE` (`DOC_ID`),
  KEY `fk_sv_document_sv_payment_method_idx` (`PMT_ID`),
  KEY `fk_sv_document_sv_document_type1_idx` (`DCT_ID`),
  KEY `fk_sv_document_sv_sale_type1_idx` (`SLT_ID`),
  KEY `fk_sv_document_sv_exchange_rate1_idx` (`XCR_ID`),
  KEY `BUS_ID` (`BUS_ID`),
  KEY `fk_sv_document_sv_person_idx` (`PER_ID`),
  CONSTRAINT `FK_sv_document_sv_business` FOREIGN KEY (`BUS_ID`) REFERENCES `sv_business` (`BUS_ID`),
  CONSTRAINT `fk_sv_document_sv_document_type1` FOREIGN KEY (`DCT_ID`) REFERENCES `sv_document_type` (`DCT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_document_sv_exchange_rate1` FOREIGN KEY (`XCR_ID`) REFERENCES `sv_exchange_rate` (`XCR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_document_sv_payment_method` FOREIGN KEY (`PMT_ID`) REFERENCES `sv_payment_method` (`PMT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_document_sv_person1` FOREIGN KEY (`PER_ID`) REFERENCES `sv_person` (`PER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_document_sv_sale_type1` FOREIGN KEY (`SLT_ID`) REFERENCES `sv_sale_type` (`SLT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2675 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_document`
--

LOCK TABLES `sv_document` WRITE;
/*!40000 ALTER TABLE `sv_document` DISABLE KEYS */;
INSERT INTO `sv_document` VALUES (2435,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',1,NULL,NULL,67.79661016949153,0,67.79661016949153,0,0,2.592,80,'ACEPTADO',NULL,NULL,NULL,NULL,NULL,'facturas/20000000001-01-F001-1','',NULL),(2445,5,65,5,5,5,NULL,'00000000','CLIENTES VARIOS','',NULL,'COTIZACION','CE01',1,42.7542372881356,2.5,40.2542372881356,0,40.2542372881356,0,0,7.2457627118644075,47.5,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'24-10-2021'),(2455,5,5,5,5,5,NULL,'46245857','Brain Albornoz','Av. República de Colombia 791, Oficina 702, Lima - Lima - San Isidrio',NULL,'BOLETA','B001',2,25.423728813559322,0,25.423728813559322,0,25.423728813559322,0,0,4.576271186440677,30,'ANULADO',NULL,NULL,NULL,NULL,NULL,'boletas/20000000001-03-B001-2','','24-10-2021'),(2465,5,75,5,5,5,NULL,'46245857','Brain Albornoz','Av. República de Colombia 791, Oficina 702, Lima - Lima - San Isidrio',NULL,'NOTA DE CREDITO','BB01',1,NULL,NULL,25.423728813559322,0,25.423728813559322,0,0,4.576271186440677,30,'ACEPTADO',NULL,NULL,NULL,NULL,NULL,'notaCredito/20000000001-07-BB01-1',NULL,'24-10-2021'),(2475,5,65,5,5,5,NULL,'00000000','CLIENTES VARIOS','',NULL,'COTIZACION','CE01',2,85.66101694915254,5,80.66101694915254,1,79.66101694915254,0,0,14.338983050847457,94,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'27-10-2021'),(2485,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',3,NULL,NULL,38.13559322033898,0,38.13559322033898,0,0,1.467,45,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2495,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',4,NULL,NULL,-28.13559322033896,240,211.86440677966104,0,0,81.89999999999999,250,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2505,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',5,NULL,NULL,44.110169491525426,2.5,46.610169491525426,0,0,1.7909999999999997,55,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2515,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',6,NULL,NULL,-215.52542372881356,224,8.474576271186441,0,0,0.32399999999999995,10,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2525,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',7,NULL,NULL,44.110169491525426,2.5,46.610169491525426,0,0,1.7909999999999997,55,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2535,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',8,NULL,NULL,-21.525423728813557,30,8.474576271186441,0,0,0.32399999999999995,10,'ACEPTADO',NULL,NULL,NULL,NULL,NULL,'facturas/20000000001-01-F001-1','',NULL),(2545,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',9,NULL,NULL,-21.525423728813557,30,8.474576271186441,0,0,0.32399999999999995,10,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2555,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',10,NULL,NULL,3.8983050847457648,30,33.898305084745765,0,0,1.2959999999999998,40,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2565,5,5,5,5,5,335,'46245857','Brain Albornoz','Av. República de Colombia 791, Oficina 702, L',NULL,'BOLETA','B001',11,93.13559322033899,5,88.13559322033899,50,38.13559322033898,0,0,6.864406779661016,45,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2-11-2021'),(2575,5,5,15,5,5,2,'12345678','Nombre Generico 12','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',12,NULL,NULL,563.4618644067797,36.75,600.2118644067797,0,0,22.94739,708.25,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2585,5,5,15,5,5,7,'12345678912','Nombre Generico 8','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',13,NULL,NULL,19.165254237288135,0.75,19.915254237288135,0,0,0.7613999999999999,23.5,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2595,5,5,5,5,5,NULL,'00000000','CLIENTES VARIOS','',NULL,'BOLETA','B001',14,55.57627118644068,30,25.576271186440678,1,24.576271186440678,0,0,4.423728813559322,29,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'10-11-2021'),(2605,5,5,5,5,5,NULL,'00000000','CLIENTES VARIOS','',NULL,'BOLETA','B001',15,162.46610169491527,9.5,152.96610169491527,0,152.96610169491527,0,0,27.533898305084747,180.5,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'14-11-2021'),(2615,5,5,15,5,5,7,'12345678912','Nombre Generico 8','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',16,NULL,NULL,44.110169491525426,2.5,46.610169491525426,0,0,1.7909999999999997,55,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2625,5,5,15,5,5,7,'12345678912','Nombre Generico 8','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',17,NULL,NULL,36.983050847457626,2,38.983050847457626,0,0,1.4913,46,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2635,5,5,15,5,5,7,'12345678912','Nombre Generico 8','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',18,NULL,NULL,38.67796610169492,2,40.67796610169492,0,0,1.5560999999999998,48,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2645,5,5,15,5,5,7,'12345678912','Nombre Generico 8','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',19,NULL,NULL,31.1271186440678,1.5,32.6271186440678,0,0,1.2483,38.5,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2655,5,5,15,5,5,7,'12345678912','Nombre Generico 8','PRUEBA DE DIRECCION',NULL,'BOLETA','B001',20,NULL,NULL,31.1271186440678,1.5,32.6271186440678,0,0,1.2483,38.5,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),(2665,5,5,5,5,5,NULL,'00000000','CLIENTES VARIOS','',NULL,'BOLETA','B001',21,85.5084745762712,5,80.5084745762712,0,80.5084745762712,0,0,14.491525423728815,95,'CREADO',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'21-11-2021');
/*!40000 ALTER TABLE `sv_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_document_type`
--

DROP TABLE IF EXISTS `sv_document_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_document_type` (
  `DCT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DCT_NAME` varchar(45) DEFAULT NULL,
  `DCT_SERIE` varchar(10) DEFAULT NULL,
  `DCT_SEQUENCE` varchar(45) DEFAULT NULL,
  `DCT_VISIBLE` varchar(1) DEFAULT NULL,
  `DCT_ESTADO` varchar(1) DEFAULT NULL,
  `DCT_TYPE` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`DCT_ID`),
  UNIQUE KEY `DCT_ID_UNIQUE` (`DCT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_document_type`
--

LOCK TABLES `sv_document_type` WRITE;
/*!40000 ALTER TABLE `sv_document_type` DISABLE KEYS */;
INSERT INTO `sv_document_type` VALUES (5,'BOLETA','B001','21','1','1','01'),(15,'FACTURA','F001','0','1','1','03'),(45,'NOTA DE VENTA','NV01','0','1','1','04'),(55,'NOTA DE CREDITO','FF01','0','0','1','07'),(65,'COTIZACION','CE01','2','1','1','05'),(75,'NOTA DE CREDITO','BB01','1','0','1','07');
/*!40000 ALTER TABLE `sv_document_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_evidence`
--

DROP TABLE IF EXISTS `sv_evidence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_evidence` (
  `EVI_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TCK_ID` int(11) DEFAULT NULL,
  `EVI_IMAGE` text,
  `EVI_DATE` varchar(45) DEFAULT NULL,
  `EVI_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`EVI_ID`),
  UNIQUE KEY `EVI_ID_UNIQUE` (`EVI_ID`),
  KEY `fk_sv_evidence_sv_ticket1_idx` (`TCK_ID`),
  CONSTRAINT `fk_sv_evidence_sv_ticket1` FOREIGN KEY (`TCK_ID`) REFERENCES `sv_ticket` (`TCK_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_evidence`
--

LOCK TABLES `sv_evidence` WRITE;
/*!40000 ALTER TABLE `sv_evidence` DISABLE KEYS */;
INSERT INTO `sv_evidence` VALUES (1,NULL,'https://aeasa.com.mx/wp-content/uploads/2020/02/SIN-IMAGEN.jpg','2021-10-18','1'),(2,535,'https://bit.ly/naruto-sage','2021-10-18','1'),(5,705,'http://localhost:5000/upload\\1635978639682ticket.jpg','3/11/2021 17:30:40','1'),(15,775,'http://localhost:5000/upload\\1635978825322ticket.jpg','3/11/2021 17:33:45','1'),(25,815,'http://localhost:5000/upload\\1635995932545ticket.jpg','3/11/2021 22:18:52','1'),(35,825,'http://localhost:5000/upload\\1636410197304ticket.jpg','8/11/2021 17:23:17','1'),(45,835,'http://localhost:5000/upload\\1636410227429ticket.jpg','8/11/2021 17:23:47','1'),(55,845,'http://localhost:5000/upload\\1636924740245ticket.jpg','14/11/2021 16:19:00','1'),(65,855,'http://localhost:5000/upload\\1636925072829ticket.jpg','14/11/2021 16:24:32','1'),(75,1135,'http://localhost:5000/upload\\1637080319271ticket.jpg','16/11/2021 11:31:59','1'),(85,1145,'http://localhost:5000/upload\\1637083586183ticket.jpg','16/11/2021 12:26:26','1'),(95,1155,'http://localhost:5000/upload\\1637262948985ticket.jpg','18/11/2021 14:15:48','1'),(105,1175,'http://localhost:5000/upload\\1637453032392ticket.jpg','20/11/2021 19:03:52','1'),(115,1185,'http://localhost:5000/upload\\1637453417384ticket.jpg','20/11/2021 19:10:17','1');
/*!40000 ALTER TABLE `sv_evidence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_exchange_rate`
--

DROP TABLE IF EXISTS `sv_exchange_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_exchange_rate` (
  `XCR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `XCR_DATE` varchar(45) DEFAULT NULL,
  `XCR_BUY` varchar(45) DEFAULT NULL,
  `XCR_SALE` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`XCR_ID`),
  UNIQUE KEY `XCR_ID_UNIQUE` (`XCR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_exchange_rate`
--

LOCK TABLES `sv_exchange_rate` WRITE;
/*!40000 ALTER TABLE `sv_exchange_rate` DISABLE KEYS */;
INSERT INTO `sv_exchange_rate` VALUES (5,'0','4.1','4');
/*!40000 ALTER TABLE `sv_exchange_rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_group`
--

DROP TABLE IF EXISTS `sv_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_group` (
  `GRO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `GRO_NAME` text,
  `GRO_DESCRIPTION` text,
  `GRO_DATE_CREATE` text,
  `GRO_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`GRO_ID`),
  UNIQUE KEY `GRO_ID_UNIQUE` (`GRO_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_group`
--

LOCK TABLES `sv_group` WRITE;
/*!40000 ALTER TABLE `sv_group` DISABLE KEYS */;
INSERT INTO `sv_group` VALUES (1,'CONFIABLE','COMPRA Y NO HAY DEVOLUCIONES','25/08/2021','1'),(2,'NO TAN CONFIABLE','COMPRA Y DEVUELVE EL PRODUCTO','25/08/2021','1'),(3,'SIN CONFIANZA NINGUNA','COMPRA Y HACE UN CALVARIO LA VENTA','25/08/2021','1');
/*!40000 ALTER TABLE `sv_group` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `sv_kardex`
--

DROP TABLE IF EXISTS `sv_kardex`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_kardex` (
  `KRX_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRO_ID` int(11) NOT NULL DEFAULT '0',
  `KRX_INPUT` varchar(50) NOT NULL DEFAULT '0',
  `KRX_OUTPUT` varchar(50) NOT NULL DEFAULT '0',
  PRIMARY KEY (`KRX_ID`),
  KEY `PRO_ID` (`PRO_ID`),
  CONSTRAINT `FK__SV_PROduct` FOREIGN KEY (`PRO_ID`) REFERENCES `sv_product` (`PRO_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_kardex`
--

LOCK TABLES `sv_kardex` WRITE;
/*!40000 ALTER TABLE `sv_kardex` DISABLE KEYS */;
INSERT INTO `sv_kardex` VALUES (5,1,'1','');
/*!40000 ALTER TABLE `sv_kardex` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_logs`
--

DROP TABLE IF EXISTS `sv_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_logs` (
  `LGS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `LGS_USER` varchar(45) DEFAULT NULL,
  `LGS_ACTION` varchar(45) DEFAULT NULL,
  `LGS_TABLE` varchar(45) DEFAULT NULL,
  `LGS_DATE` varchar(100) DEFAULT NULL,
  `LGS_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`LGS_ID`),
  UNIQUE KEY `LGS_ID_UNIQUE` (`LGS_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_logs`
--

LOCK TABLES `sv_logs` WRITE;
/*!40000 ALTER TABLE `sv_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `sv_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_message`
--

DROP TABLE IF EXISTS `sv_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_message` (
  `MSS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TCK_ID` int(11) DEFAULT NULL,
  `USR_SEND` int(11) DEFAULT NULL,
  `USR_RECEIVER` int(11) DEFAULT NULL,
  `MSS_MESSAGE` text,
  `MSS_VIEWED` varchar(45) DEFAULT NULL,
  `MSS_SENT` varchar(45) DEFAULT NULL,
  `MSS_TIME` varchar(45) DEFAULT NULL,
  `MSS_DATE` varchar(45) DEFAULT NULL,
  `MSS_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`MSS_ID`),
  UNIQUE KEY `MES_ID_UNIQUE` (`MSS_ID`),
  KEY `MSS_TCK_ID_idx` (`TCK_ID`),
  CONSTRAINT `MSS_TCK_ID` FOREIGN KEY (`TCK_ID`) REFERENCES `sv_ticket` (`TCK_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1265 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_message`
--

LOCK TABLES `sv_message` WRITE;
/*!40000 ALTER TABLE `sv_message` DISABLE KEYS */;
INSERT INTO `sv_message` VALUES (1,1,1,NULL,'Hola, necesito su ayuda','1',NULL,'0:40:05','13/9/2021','1'),(2,1,NULL,1,'Si digame, que sera??',NULL,NULL,'0:41:05','13/9/2021','1'),(3,2,1,NULL,'Ayuda',NULL,NULL,'0:44:05','13/9/2021','1'),(4,1,1,NULL,'Mi compu se malogro',NULL,NULL,'0:45:05','13/9/2021','1'),(45,4,NULL,1,'SIN MENSAJES',NULL,NULL,'11:46:24','23/9/2021','1'),(55,4,NULL,1,'    console.log(sendmessages)',NULL,NULL,'11:48:07','23/9/2021','1'),(95,7,NULL,1,'asdasdasd',NULL,NULL,'12:14:38','15/10/2021','1'),(105,7,NULL,1,'nuevo mensaje',NULL,NULL,'12:15:13','15/10/2021','1'),(115,7,NULL,1,'asdasda',NULL,NULL,'12:18:01','15/10/2021','1'),(125,7,NULL,1,'nuevo nuevo',NULL,NULL,'12:18:52','15/10/2021','1'),(135,7,NULL,1,'asdasdasd',NULL,NULL,'12:19:18','15/10/2021','1'),(145,7,NULL,1,'nuevo',NULL,NULL,'12:19:27','15/10/2021','1'),(165,7,NULL,1,'dfsdfsf',NULL,NULL,'12:23:34','15/10/2021','1'),(185,7,NULL,1,'werwerwer',NULL,NULL,'12:24:50','15/10/2021','1'),(195,7,NULL,1,'asdasdas',NULL,NULL,'12:25:47','15/10/2021','1'),(205,375,NULL,1,'Hola',NULL,NULL,'22:09:07','15/10/2021','1'),(255,465,NULL,1,'Hola',NULL,NULL,'23:25:56','20/10/2021','1'),(265,465,1,NULL,'fdgdfg',NULL,NULL,'23:26:42','20/10/2021','1'),(275,1,NULL,1,'asdasda',NULL,NULL,'0:47:25','25/10/2021','1'),(285,615,NULL,1,'Hola',NULL,NULL,'16:51:17','25/10/2021','1'),(295,615,NULL,1,'Hola',NULL,NULL,'16:51:23','25/10/2021','1'),(305,615,NULL,1,'fghfh',NULL,NULL,'16:51:28','25/10/2021','1'),(315,625,NULL,1,'hola',NULL,NULL,'11:02:29','26/10/2021','1'),(325,625,1,NULL,'prueba 6 ',NULL,NULL,'11:02:46','26/10/2021','1'),(335,625,NULL,1,'hhhhh',NULL,NULL,'11:03:00','26/10/2021','1'),(345,625,1,NULL,'hhhhhhh',NULL,NULL,'11:03:04','26/10/2021','1'),(355,675,NULL,1,'hola',NULL,NULL,'23:54:38','27/10/2021','1'),(365,675,1,NULL,'q tal',NULL,NULL,'23:55:00','27/10/2021','1'),(375,1,NULL,1,'sdasdasd',NULL,NULL,'8:23:28','1/11/2021','1'),(385,1,NULL,1,'sadasdasd',NULL,NULL,'8:24:55','1/11/2021','1'),(395,1,NULL,1,'asdasdas',NULL,NULL,'8:27:17','1/11/2021','1'),(405,1,NULL,1,'1213123',NULL,NULL,'8:27:23','1/11/2021','1'),(415,1,NULL,1,'asda123',NULL,NULL,'8:49:25','1/11/2021','1'),(425,1,NULL,1,'123qwe',NULL,NULL,'8:51:32','1/11/2021','1'),(435,1,NULL,1,'123asd',NULL,NULL,'9:02:08','1/11/2021','1'),(445,2,NULL,1,'sadasd',NULL,NULL,'9:04:10','1/11/2021','1'),(455,1,NULL,1,'asdasd',NULL,NULL,'9:04:23','1/11/2021','1'),(465,1,NULL,1,'123124',NULL,NULL,'9:04:28','1/11/2021','1'),(475,1,NULL,1,'qw12',NULL,NULL,'9:04:46','1/11/2021','1'),(485,1,NULL,1,'llas 123',NULL,NULL,'9:06:14','1/11/2021','1'),(495,1,NULL,1,'aasd',NULL,NULL,'9:07:51','1/11/2021','1'),(505,2,NULL,1,'asdasdas',NULL,NULL,'9:17:03','1/11/2021','1'),(515,2,NULL,1,'asd',NULL,NULL,'9:17:28','1/11/2021','1'),(525,1,NULL,1,'asdasda',NULL,NULL,'10:22:50','1/11/2021','1'),(535,1,NULL,1,'lla',NULL,NULL,'11:37:01','1/11/2021','1'),(545,1,NULL,1,'ñña',NULL,NULL,'11:37:04','1/11/2021','1'),(555,1,NULL,1,'lllas',NULL,NULL,'11:38:09','1/11/2021','1'),(565,1,NULL,1,'asas',NULL,NULL,'11:38:13','1/11/2021','1'),(575,1,NULL,1,'lll123',NULL,NULL,'11:38:17','1/11/2021','1'),(585,1,NULL,1,'123',NULL,NULL,'11:38:21','1/11/2021','1'),(595,1,NULL,1,'1234',NULL,NULL,'11:41:32','1/11/2021','1'),(605,1,NULL,1,'123',NULL,NULL,'11:41:36','1/11/2021','1'),(615,1,NULL,1,'qwe123',NULL,NULL,'11:41:42','1/11/2021','1'),(625,1,NULL,1,'qwe1234',NULL,NULL,'11:41:45','1/11/2021','1'),(635,1,NULL,1,'hello',NULL,NULL,'12:32:13','1/11/2021','1'),(645,1,NULL,1,'aiuda',NULL,NULL,'12:32:19','1/11/2021','1'),(655,85,NULL,1,'hola',NULL,NULL,'14:32:10','1/11/2021','1'),(665,85,NULL,1,'que tl7',NULL,NULL,'14:32:26','1/11/2021','1'),(675,85,1,NULL,'hello',NULL,NULL,'14:35:40','1/11/2021','1'),(685,85,NULL,1,'hola',NULL,NULL,'14:38:03','1/11/2021','1'),(695,85,1,NULL,'hola',NULL,NULL,'14:38:08','1/11/2021','1'),(705,85,1,NULL,'hola',NULL,NULL,'14:38:12','1/11/2021','1'),(715,85,NULL,1,'hola',NULL,NULL,'14:38:27','1/11/2021','1'),(725,85,1,NULL,'hola',NULL,NULL,'14:38:44','1/11/2021','1'),(735,85,NULL,1,'hola',NULL,NULL,'14:38:49','1/11/2021','1'),(745,85,NULL,1,'hola',NULL,NULL,'14:38:55','1/11/2021','1'),(755,85,NULL,1,'hola',NULL,NULL,'14:42:13','1/11/2021','1'),(765,85,1,NULL,'holal',NULL,NULL,'14:43:50','1/11/2021','1'),(775,85,NULL,1,'hola desde el admin',NULL,NULL,'14:50:16','1/11/2021','1'),(785,85,1,NULL,'hola desde el cliente',NULL,NULL,'14:50:37','1/11/2021','1'),(795,85,1,NULL,'asdasd',NULL,NULL,'14:57:50','1/11/2021','1'),(805,85,1,NULL,'ls',NULL,NULL,'14:57:58','1/11/2021','1'),(815,85,NULL,1,'administrador',NULL,NULL,'14:59:31','1/11/2021','1'),(825,85,1,NULL,'hola',NULL,NULL,'14:59:38','1/11/2021','1'),(835,85,1,NULL,'asdas',NULL,NULL,'15:01:16','1/11/2021','1'),(845,85,1,NULL,'asdasd',NULL,NULL,'15:01:22','1/11/2021','1'),(855,85,NULL,1,'asdasds',NULL,NULL,'15:01:25','1/11/2021','1'),(865,85,NULL,1,'123456789',NULL,NULL,'15:01:33','1/11/2021','1'),(875,85,1,NULL,'cliente',NULL,NULL,'15:03:15','1/11/2021','1'),(885,85,1,NULL,'sa',NULL,NULL,'15:09:54','1/11/2021','1'),(895,85,1,NULL,'lla',NULL,NULL,'15:09:58','1/11/2021','1'),(905,85,1,NULL,'asdasdasd',NULL,NULL,'15:11:41','1/11/2021','1'),(915,85,1,NULL,'ssda123',NULL,NULL,'15:12:18','1/11/2021','1'),(925,85,NULL,1,'sdas',NULL,NULL,'15:12:24','1/11/2021','1'),(935,85,1,NULL,'123456789',NULL,NULL,'15:13:24','1/11/2021','1'),(945,85,1,NULL,'asdasd',NULL,NULL,'15:16:24','1/11/2021','1'),(955,85,1,NULL,'asdasd',NULL,NULL,'15:16:50','1/11/2021','1'),(965,85,1,NULL,'asdasd',NULL,NULL,'15:17:10','1/11/2021','1'),(975,85,1,NULL,'hola',NULL,NULL,'15:17:16','1/11/2021','1'),(985,85,1,NULL,'hola',NULL,NULL,'15:19:30','1/11/2021','1'),(995,85,1,NULL,'hola 123',NULL,NULL,'15:19:37','1/11/2021','1'),(1005,85,1,NULL,'cliente 123',NULL,NULL,'15:20:39','1/11/2021','1'),(1015,85,NULL,1,'admin 123',NULL,NULL,'15:20:44','1/11/2021','1'),(1025,675,1,NULL,'hola asd',NULL,NULL,'22:29:07','2/11/2021','1'),(1035,675,NULL,1,':))',NULL,NULL,'22:29:39','2/11/2021','1'),(1045,3,NULL,1,'hola',NULL,NULL,'16:34:40','11/11/2021','1'),(1055,1,NULL,1,'hol',NULL,NULL,'16:35:17','11/11/2021','1'),(1065,1,NULL,1,'loo',NULL,NULL,'16:35:22','11/11/2021','1'),(1075,1135,NULL,1,'geerer',NULL,NULL,'11:33:00','16/11/2021','1'),(1085,665,NULL,1,'asdasdasd',NULL,NULL,'11:33:16','16/11/2021','1'),(1095,1135,1,NULL,'sdfsdfsdf',NULL,NULL,'11:34:57','16/11/2021','1'),(1105,1135,1,NULL,'asdasdasdasd',NULL,NULL,'11:35:00','16/11/2021','1'),(1115,1135,1,NULL,'asdasdasd',NULL,NULL,'11:35:02','16/11/2021','1'),(1125,1135,1,NULL,'asdasdasd',NULL,NULL,'11:35:04','16/11/2021','1'),(1135,1135,1,NULL,'sdasdasdasdasdasd',NULL,NULL,'11:35:06','16/11/2021','1'),(1145,1135,1,NULL,'asdasdasdasdasdasd',NULL,NULL,'11:35:08','16/11/2021','1'),(1155,1135,1,NULL,'asdasdasdasdasd',NULL,NULL,'11:35:12','16/11/2021','1'),(1165,1135,1,NULL,'1231234567',NULL,NULL,'11:35:15','16/11/2021','1'),(1175,1,NULL,1,'sadasda',NULL,NULL,'11:52:10','16/11/2021','1'),(1185,1,NULL,1,'123123123123',NULL,NULL,'11:52:15','16/11/2021','1'),(1195,665,NULL,1,'asdasda',NULL,NULL,'11:52:30','16/11/2021','1'),(1205,1135,NULL,1,'123123',NULL,NULL,'11:52:41','16/11/2021','1'),(1215,1145,NULL,1,'hola',NULL,NULL,'12:27:03','16/11/2021','1'),(1225,1145,NULL,1,'Hola Persona, detállame tu error',NULL,NULL,'12:29:17','16/11/2021','1'),(1235,1145,1,NULL,'El disco al conectarse no es detectado',NULL,NULL,'12:29:55','16/11/2021','1'),(1245,1145,NULL,1,'Por favor traer su disco a tienda y no se olvide su boleta de pago para hacer uso de la garantía',NULL,NULL,'12:30:28','16/11/2021','1'),(1255,1,NULL,1,'174',NULL,NULL,'17:36:51','19/11/2021','1');
/*!40000 ALTER TABLE `sv_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_order_details`
--

DROP TABLE IF EXISTS `sv_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_order_details` (
  `ODT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DIS_ID` int(11) DEFAULT NULL,
  `ORD_ID` int(11) DEFAULT NULL,
  `SLT_ID` int(11) DEFAULT NULL,
  `PRO_ID` int(11) NOT NULL DEFAULT '0',
  `ODT_DAYS_TO_SENDE` varchar(45) DEFAULT NULL,
  `ODT_AMOUNT` varchar(45) DEFAULT NULL,
  `ODT_SUBTOTAL` varchar(45) DEFAULT NULL,
  `ODT_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ODT_ID`),
  KEY `DIS_ID` (`DIS_ID`),
  KEY `ORD_ID` (`ORD_ID`),
  KEY `SLT_ID` (`SLT_ID`),
  KEY `PRO_ID` (`PRO_ID`),
  CONSTRAINT `FK_sv_order_details_sv_product` FOREIGN KEY (`PRO_ID`) REFERENCES `sv_product` (`PRO_ID`),
  CONSTRAINT `sv_order_details_ibfk_1` FOREIGN KEY (`DIS_ID`) REFERENCES `sv_discounts` (`DIS_ID`),
  CONSTRAINT `sv_order_details_ibfk_2` FOREIGN KEY (`ORD_ID`) REFERENCES `sv_orders` (`ORD_ID`),
  CONSTRAINT `sv_order_details_ibfk_3` FOREIGN KEY (`SLT_ID`) REFERENCES `sv_sale_type` (`SLT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1995 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_order_details`
--

LOCK TABLES `sv_order_details` WRITE;
/*!40000 ALTER TABLE `sv_order_details` DISABLE KEYS */;
INSERT INTO `sv_order_details` VALUES (955,NULL,1265,15,1,'0','1','50','1'),(965,NULL,1595,15,1,'0','2','70','1'),(975,NULL,1605,15,1,'0','1','35','1'),(985,NULL,1615,15,1,'0','1','35','1'),(995,NULL,1625,15,5,'0','2','null','1'),(1005,NULL,1635,15,1,'0','2','null','1'),(1015,NULL,1645,15,25,'0','2','null','1'),(1025,NULL,1655,15,1,'0','1','35','1'),(1035,NULL,1665,15,1,'0','1','35','1'),(1045,NULL,1675,15,1,'0','3','105','1'),(1055,NULL,1685,15,1,'0','2','105','1'),(1065,NULL,1695,15,1,'0','10','336','1'),(1075,NULL,1705,15,1,'0','10','350','1'),(1085,NULL,1715,15,1,'0','2','70','1'),(1095,NULL,1725,15,1,'0','4','134.4','1'),(1105,NULL,1735,15,1,'0','10','336','1'),(1115,NULL,1745,15,1,'0','2','null','1'),(1125,NULL,1755,15,1,'0','2','70','1'),(1135,NULL,1765,15,1,'0','1','35','1'),(1145,NULL,1775,15,1,'0','8','268.8','1'),(1155,NULL,1785,15,1,'0','3','105','1'),(1165,NULL,1795,15,1,'0','1','35','1'),(1175,NULL,1805,15,1,'0','100','4560','1'),(1185,NULL,1815,15,1,'0','5','47.5','1'),(1195,NULL,1825,15,1,'0','1','47.5','1'),(1205,NULL,1835,15,1,'0','1','47.5','1'),(1215,NULL,1845,15,1,'0','3','142.5','1'),(1225,NULL,1855,15,1,'0','2','95','1'),(1235,NULL,1865,15,1,'0','15','684','1'),(1245,NULL,1875,15,1,'0','1','47.5','1'),(1255,NULL,1885,15,1,'0','1','47.5','1'),(1265,NULL,1895,15,35,'0','2','30','1'),(1275,NULL,1905,15,1,'0','1','47.5','1'),(1285,NULL,1905,15,35,'0','2','30','1'),(1295,NULL,1915,15,1,'0','2','95','1'),(1305,NULL,1935,15,1,'0','1','47.5','1'),(1315,NULL,1945,15,1,'0','1','47.5','1'),(1325,NULL,1985,15,1,'0','1','47.5','1'),(1335,NULL,1995,15,1,'0','1','47.5','1'),(1345,NULL,2005,15,1,'0','1','47.5','1'),(1355,NULL,2025,15,1,'0','2','47.5','1'),(1365,NULL,2035,15,1,'0','2','47.5','1'),(1375,NULL,2045,15,5,'0','1','30','1'),(1385,NULL,2055,15,1,'0','1','47.5','1'),(1395,NULL,2065,15,1,'0','1','47.5','1'),(1405,NULL,2085,15,5,'0','2','60','1'),(1415,NULL,2095,15,5,'0','1','30','1'),(1425,NULL,2115,15,5,'0','1','30','1'),(1435,NULL,2125,15,5,'0','50','30','1'),(1445,NULL,2135,15,5,'0','63','30','1'),(1455,NULL,2145,15,1,'0','9','410.40000000000003','1'),(1465,NULL,2155,15,1,'0','1','47.5','1'),(1475,NULL,2165,15,5,'0','1','30','1'),(1485,NULL,2175,15,5,'0','8','224','1'),(1495,NULL,2185,15,5,'0','8','30','1'),(1505,NULL,2195,15,1,'0','1','47.5','1'),(1515,NULL,2205,15,1,'0','1','47.5','1'),(1525,NULL,2215,15,1,'0','1','47.5','1'),(1535,NULL,2225,15,1,'0','1','47.5','1'),(1545,NULL,2235,15,1,'0','1','47.5','1'),(1555,NULL,2245,15,5,'0','1','30','1'),(1565,NULL,2255,15,5,'0','1','30','1'),(1575,NULL,2265,15,5,'0','1','30','1'),(1585,NULL,2275,15,5,'0','1','30','1'),(1595,NULL,2285,15,5,'0','4','90','1'),(1605,NULL,2285,15,25,'0','1','28.5','1'),(1615,NULL,2295,15,35,'0','1','28.5','1'),(1625,NULL,2295,15,25,'0','1','28.5','1'),(1635,NULL,2305,15,35,'0','1','14.25','1'),(1645,NULL,2315,15,25,'0','1','28.5','1'),(1655,NULL,2325,15,35,'0','1','14.25','1'),(1665,NULL,2335,15,35,'0','49','14.25','1'),(1675,NULL,2345,15,35,'0','1','14.25','1'),(1685,NULL,2355,15,25,'0','1','28.5','1'),(1695,NULL,2365,15,1,'0','1','47.5','1'),(1705,NULL,2375,15,1,'0','1','47.5','1'),(1715,NULL,2385,15,1,'0','1','47.5','1'),(1725,NULL,2395,15,1,'0','1','47.5','1'),(1735,NULL,2405,15,1,'0','1','47.5','1'),(1745,NULL,2415,15,1,'0','1','47.5','1'),(1755,NULL,2425,15,25,'0','1','28.5','1'),(1765,NULL,2435,15,25,'0','1','28.5','1'),(1775,NULL,2445,15,1,'0','2','95','1'),(1785,NULL,2445,15,35,'0','1','14.25','1'),(1795,NULL,2455,15,25,'0','70','28.5','1'),(1805,NULL,2465,15,35,'0','8','76','1'),(1815,NULL,2475,15,35,'0','1','14.25','1'),(1825,NULL,2485,15,35,'0','5','14.25','1'),(1835,NULL,2485,15,1,'0','1','47.5','1'),(1845,NULL,2485,15,25,'0','1','28.5','1'),(1855,NULL,2495,15,25,'0','2','57','1'),(1865,NULL,2495,15,35,'0','1','14.25','1'),(1875,NULL,2505,15,1,'0','8','47.5','1'),(1885,NULL,2525,15,105,'0','1','850','1'),(1895,NULL,2535,15,1,'0','1','47.5','1'),(1905,NULL,2545,15,25,'0','1','28.5','1'),(1915,NULL,2555,15,35,'0','2','38','1'),(1925,NULL,2565,15,5,'0','2','56','1'),(1935,NULL,2565,15,1,'0','5','57','1'),(1945,NULL,2575,15,1,'0','1','57','1'),(1955,NULL,2585,15,25,'0','1','38','1'),(1965,NULL,2595,15,25,'0','1','28.5','1'),(1975,NULL,2605,15,25,'0','1','28.5','1'),(1985,NULL,2615,15,25,'0','5','28.5','1');
/*!40000 ALTER TABLE `sv_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_order_type`
--

DROP TABLE IF EXISTS `sv_order_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_order_type` (
  `ORT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ORT_NAME` varchar(45) DEFAULT NULL,
  `ORT_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ORT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_order_type`
--

LOCK TABLES `sv_order_type` WRITE;
/*!40000 ALTER TABLE `sv_order_type` DISABLE KEYS */;
INSERT INTO `sv_order_type` VALUES (5,'Delivery','1'),(15,'Recojo en Tienda','1');
/*!40000 ALTER TABLE `sv_order_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_orders`
--

DROP TABLE IF EXISTS `sv_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_orders` (
  `ORD_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CLI_ID` int(11) DEFAULT NULL,
  `USR_ID` int(11) DEFAULT NULL,
  `ORT_ID` int(11) DEFAULT NULL,
  `ORD_DATE_ORDER` varchar(45) DEFAULT NULL,
  `ORD_TOTAL_PRICE` varchar(45) DEFAULT NULL,
  `ORD_DISCOUNT_PRICE` varchar(45) DEFAULT NULL,
  `ORD_UNDISCOUNTED_PRICE` varchar(45) DEFAULT NULL,
  `ORD_IGV` varchar(45) DEFAULT NULL,
  `ORD_VOUCHER` text,
  `ORD_APPROVAL` varchar(1) DEFAULT NULL,
  `ORD_APPROVAL_USER` int(11) DEFAULT NULL,
  `ORD_DISPATCHED` varchar(4) DEFAULT NULL,
  `ORD_STATUS` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ORD_ID`),
  KEY `CLI_ID` (`CLI_ID`),
  KEY `USR_ID` (`USR_ID`),
  KEY `ORT_ID` (`ORT_ID`),
  CONSTRAINT `sv_orders_ibfk_1` FOREIGN KEY (`CLI_ID`) REFERENCES `sv_client` (`CLI_ID`),
  CONSTRAINT `sv_orders_ibfk_2` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`),
  CONSTRAINT `sv_orders_ibfk_3` FOREIGN KEY (`ORT_ID`) REFERENCES `sv_order_type` (`ORT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2625 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_orders`
--

LOCK TABLES `sv_orders` WRITE;
/*!40000 ALTER TABLE `sv_orders` DISABLE KEYS */;
INSERT INTO `sv_orders` VALUES (1265,1,NULL,NULL,'10/14/2021','60','0','60','10.7999999999999995','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1595,1,NULL,NULL,'10/15/2021','80','0','80','14.3999999999999995','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg','1',5,NULL,'1'),(1605,1,NULL,NULL,'10/15/2021','45','0','45','8.15','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg','1',5,NULL,'1'),(1615,1,NULL,NULL,'10/15/2021','45','0','45','8.15','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1625,1,NULL,NULL,'10/15/2021','10','0','10','1.79999999999999985','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'2'),(1635,1,NULL,NULL,'10/15/2021','10','0','10','1.79999999999999985','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1645,1,NULL,NULL,'10/15/2021','10','0','10','1.79999999999999985','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1655,1,NULL,NULL,'10/15/2021','45','0','45','8.15','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1665,1,NULL,NULL,'10/15/2021','45','0','45','8.15','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1675,1,NULL,NULL,'10/15/2021','115','0','115','20.75','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1685,1,NULL,NULL,'10/15/2021','10','0','10','1.79999999999999985','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg','1',5,NULL,'1'),(1695,1,NULL,NULL,'10/15/2021','346','0','346','62.285','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1705,1,NULL,NULL,'10/15/2021','360','0','360','64.85','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'1'),(1715,1,NULL,NULL,'10/17/2021','80','0','80','14.3999999999999995','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg','1',5,NULL,'0'),(1725,1,NULL,NULL,'10/17/2021','144.4','0','144.4','25.9925','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'0'),(1735,1,NULL,NULL,'10/17/2021','346','0','346','62.285','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'0'),(1745,1,NULL,NULL,'10/17/2021','10','0','10','1.79999999999999985','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'0'),(1755,1,NULL,NULL,'10/17/2021','80','0','80','14.3999999999999995','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg',NULL,NULL,NULL,'0'),(1765,1,NULL,NULL,'10/17/2021','45','0','45','8.15','https://larepublica.pe/resizer/OmZqyBcV4OFnytXLpNxNUSxotUc=/538x0/top/larepublica.pe/resizer/PD59GmkVpH92FwOCR7E65I9dBeQ=/538x0/top/smart/cloudfront-us-east-1.images.arcpublishing.com/gruporepublica/BF5FMJA6BBB65B67VN2WWHUUZU.jpg','1',5,NULL,'0'),(1775,1,NULL,NULL,'10/18/2021','278.8','0','278.8','50.1845',NULL,NULL,NULL,NULL,'0'),(1785,1,NULL,NULL,'10/18/2021','115','0','115','20.75',NULL,NULL,NULL,NULL,'0'),(1795,1,NULL,NULL,'10/18/2021','45','0','45','8.15',NULL,NULL,NULL,NULL,'0'),(1805,1,NULL,NULL,'10/18/2021','4570','0','4570','822.65',NULL,NULL,NULL,NULL,'0'),(1815,1,NULL,NULL,'10/19/2021','247.5','0','247.5','44.555',NULL,NULL,NULL,NULL,'0'),(1825,1,NULL,NULL,'10/19/2021','57.5','0','57.5','10.355',NULL,NULL,NULL,NULL,'0'),(1835,1,NULL,NULL,'10/20/2021','57.5','0','57.5','10.355',NULL,NULL,NULL,NULL,'0'),(1845,1,NULL,NULL,'10/20/2021','145','7.5','152.5','26.0999999999999985',NULL,NULL,NULL,NULL,'0'),(1855,1,NULL,NULL,'10/20/2021','100','5','105','185',NULL,NULL,NULL,NULL,'0'),(1865,1,NULL,NULL,'10/20/2021','658','36','694','118.445',NULL,NULL,NULL,NULL,'0'),(1875,1,NULL,NULL,'10/20/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(1885,1,NULL,NULL,'10/20/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(1895,1,NULL,NULL,'10/23/2021','40','0','40','7.1999999999999995',NULL,NULL,NULL,NULL,'0'),(1905,1,NULL,NULL,'10/23/2021','85','2.5','87.5','15.2999999999999995',NULL,NULL,NULL,NULL,'0'),(1915,1,NULL,NULL,'10/24/2021','100','5','105','185',NULL,NULL,NULL,NULL,'0'),(1925,1,NULL,NULL,'10/24/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(1935,1,NULL,NULL,'10/24/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(1945,1,NULL,NULL,'10/24/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(1955,1,NULL,NULL,'10/24/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(1965,1,NULL,NULL,'10/24/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(1975,1,NULL,NULL,'10/24/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(1985,1,NULL,NULL,'10/25/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(1995,1,NULL,NULL,'10/25/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2005,1,NULL,NULL,'10/26/2021','55','2.5','57.5','9.95','http://localhost:5000/upload\\1635317868135order.jpg','n',0,'1','4'),(2015,1,NULL,NULL,'10/27/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2025,1,NULL,NULL,'10/27/2021','100','5','105','185',NULL,NULL,NULL,NULL,'0'),(2035,1,NULL,NULL,'10/27/2021','105','5','110','18.95',NULL,NULL,NULL,NULL,'0'),(2045,1,NULL,NULL,'10/27/2021','10','30','40','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2055,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2065,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95','http://localhost:5000/upload\\1635378386335order.jpg','n',0,'null','0'),(2075,1,NULL,NULL,'10/27/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2085,1,NULL,NULL,'10/27/2021','70','60','130','12.65',NULL,NULL,NULL,NULL,'0'),(2095,1,NULL,NULL,'10/27/2021','10','30','40','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2105,1,NULL,NULL,'10/27/2021','10','0','10','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2115,1,NULL,NULL,'10/27/2021','10','30','40','1.79999999999999985','http://localhost:5000/upload\\1635392769216order.jpg','n',0,'null','0'),(2125,1,NULL,NULL,'10/27/2021','1510','1500','3010','271.85','http://localhost:5000/upload\\1635392930050order.jpg','n',0,'null','2'),(2135,1,NULL,NULL,'10/27/2021','1900','1890','3790','3425',NULL,NULL,NULL,NULL,'0'),(2145,1,NULL,NULL,'10/27/2021','398.8','21.599999999999998','420.40000000000003','71.7845',NULL,NULL,NULL,NULL,'0'),(2155,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2165,1,NULL,NULL,'10/27/2021','10','30','40','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2175,1,NULL,NULL,'10/27/2021','10','224','234','1.79999999999999985','http://localhost:5000/upload\\1635394707101order.jpg','1',5,NULL,'0'),(2185,1,NULL,NULL,'10/27/2021','250','240','490','455','http://localhost:5000/upload\\1635394743902order.jpg','1',5,NULL,'0'),(2195,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95','http://localhost:5000/upload\\1635394797298order.jpg','1',5,NULL,'0'),(2205,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2215,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95','http://localhost:5000/upload\\1635395435755order.jpg','1',5,NULL,'1'),(2225,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2235,1,NULL,NULL,'10/27/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2245,1,NULL,NULL,'10/27/2021','10','30','40','1.79999999999999985','http://localhost:5000/upload\\1635396618197order.jpg','1',5,NULL,'1'),(2255,1,NULL,NULL,'10/28/2021','10','30','40','1.79999999999999985',NULL,NULL,NULL,NULL,'0'),(2265,1,NULL,NULL,'10/28/2021','10','30','40','1.79999999999999985','http://localhost:5000/upload\\1635457061376order.jpg','1',5,NULL,'1'),(2275,1,NULL,NULL,'10/28/2021','40','30','70','7.1999999999999995','http://localhost:5000/upload\\1635480760337order.jpg','1',5,NULL,'1'),(2285,1,NULL,NULL,'11/02/2021','37','121.5','158.5','6.665',NULL,NULL,NULL,NULL,'0'),(2295,1,NULL,NULL,'11/02/2021','50.5','2.25','52.75','9.095',NULL,NULL,NULL,NULL,'0'),(2305,1,NULL,NULL,'11/02/2021','23.5','0.75','24.25','4.22999999999999955',NULL,NULL,NULL,NULL,'1'),(2315,1,NULL,NULL,'11/02/2021','37','1.5','38.5','6.665',NULL,NULL,NULL,NULL,'0'),(2325,1,NULL,NULL,'11/02/2021','23.5','0.75','24.25','4.22999999999999955','http://localhost:5000/upload\\1635912174988order.jpg',NULL,NULL,NULL,'2'),(2335,1,NULL,NULL,'11/02/2021','708.25','36.75','745','127.4855','http://localhost:5000/upload\\1635912777711order.jpg','1',5,NULL,'3'),(2345,1,NULL,NULL,'11/03/2021','23.5','0.75','24.25','4.22999999999999955',NULL,NULL,NULL,NULL,'0'),(2355,1,NULL,NULL,'11/03/2021','37','1.5','38.5','6.665',NULL,NULL,NULL,NULL,'0'),(2365,1,NULL,NULL,'11/04/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2375,1,NULL,NULL,'11/04/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2385,1,NULL,NULL,'11/04/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2395,1,NULL,NULL,'11/04/2021','55','2.5','57.5','9.95',NULL,NULL,NULL,NULL,'0'),(2405,1,NULL,NULL,'11/05/2021','55','2.5','57.5','9.95','http://localhost:5000/upload\\1636093544017order.jpg',NULL,NULL,NULL,'0'),(2415,1,NULL,NULL,'11/05/2021','57.5','2.5','60','10.355','http://localhost:5000/upload\\1636094637158order.jpg',NULL,NULL,NULL,'0'),(2425,NULL,NULL,NULL,'11/05/2021','38.5','1.5','40','6.935','http://localhost:5000/upload\\1636094977439order.jpg',NULL,NULL,NULL,'0'),(2435,305,NULL,NULL,'11/05/2021','38.5','1.5','40','6.935','http://localhost:5000/upload\\1636095459994order.jpg','0',0,'0','2'),(2445,NULL,NULL,NULL,'11/08/2021','113.5','5.75','119.25','20.435','http://localhost:5000/upload\\1636410154414order.jpg','0',0,'0','1'),(2455,NULL,NULL,NULL,'11/08/2021','2005','105','2110','360.95','http://localhost:5000/upload\\1636411298010order.jpg','0',0,'0','1'),(2465,NULL,NULL,NULL,'11/08/2021','86','4','90','15.4799999999999995','http://localhost:5000/upload\\1636411885293order.jpg','0',0,'0','1'),(2475,305,NULL,NULL,'11/08/2021','23.5','0.75','24.25','4.22999999999999955','http://localhost:5000/upload\\1636430004822order.jpg','1',5,'1','2'),(2485,305,NULL,NULL,'11/10/2021','149.5','7.75','157.25','26.915','http://localhost:5000/upload\\1636602024929order.jpg','0',0,'0','1'),(2495,305,NULL,NULL,'11/14/2021','77.5','3.75','81.25','13.955','http://localhost:5000/upload\\1636924931939order.jpg','0',0,'0','1'),(2505,305,NULL,NULL,'11/14/2021','390','20','410','70.25','http://localhost:5000/upload\\1636925007433order.jpg','0',0,'0','1'),(2515,305,NULL,NULL,'11/14/2021','0','0','0','05',NULL,'0',0,'0','1'),(2525,305,NULL,NULL,'11/16/2021','710','150','860','127.85',NULL,'0',0,'0','4'),(2535,305,NULL,NULL,'11/16/2021','55','2.5','57.5','9.95','http://localhost:5000/upload\\1637082135731order.jpg','1',5,'1','2'),(2545,305,NULL,NULL,'11/18/2021','38.5','1.5','40','6.935','http://localhost:5000/upload\\1637256452960order.jpg','0',0,'0','1'),(2555,305,NULL,NULL,'11/18/2021','46','2','48','8.285','http://localhost:5000/upload\\1637256924315order.jpg','1',5,'1','3'),(2565,305,NULL,NULL,'11/18/2021','407','43','450','73.259999999999995','http://localhost:5000/upload\\1637262741660order.jpg','0',0,'0','2'),(2575,305,NULL,NULL,'11/19/2021','67','3','70','12.0599999999999995','http://localhost:5000/upload\\1637342745511order.jpg','0',0,'0','3'),(2585,305,NULL,NULL,'11/21/2021','48','2','50','8.645','http://localhost:5000/upload\\1637512345298order.jpg','1',5,'1','1'),(2595,305,NULL,NULL,'11/21/2021','38.5','1.5','40','6.935','http://localhost:5000/upload\\1637517189609order.jpg','1',5,'1','1'),(2605,305,NULL,NULL,'11/21/2021','38.5','1.5','40','6.935','http://localhost:5000/upload\\1637517329961order.jpg','1',5,'5','1'),(2615,305,NULL,NULL,'11/21/2021','152.5','7.5','160','27.455','http://localhost:5000/upload\\1637517510672order.jpg','0',0,'0','1');
/*!40000 ALTER TABLE `sv_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_payment_method`
--

DROP TABLE IF EXISTS `sv_payment_method`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_payment_method` (
  `PMT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PMT_NAME` varchar(45) DEFAULT NULL,
  `PMT_DESCRIPTION` varchar(45) DEFAULT NULL,
  `PMT_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`PMT_ID`),
  UNIQUE KEY `PMT_ID_UNIQUE` (`PMT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_payment_method`
--

LOCK TABLES `sv_payment_method` WRITE;
/*!40000 ALTER TABLE `sv_payment_method` DISABLE KEYS */;
INSERT INTO `sv_payment_method` VALUES (5,'AL CONTANDO','PAGO AL CONTADO P CAUSA,QUE MAS QUIERES SABER','1'),(15,'FIADO ','HOY NO FIO ,MAÑANA SI','1');
/*!40000 ALTER TABLE `sv_payment_method` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_person`
--

DROP TABLE IF EXISTS `sv_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_person` (
  `PER_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PET_ID` int(11) DEFAULT NULL,
  `USR_ID` int(11) DEFAULT NULL,
  `PER_NAME` varchar(45) DEFAULT NULL,
  `PER_LASTNAME` varchar(45) DEFAULT NULL,
  `PER_CLIENT` varchar(1) DEFAULT NULL,
  `PER_DNI` varchar(45) DEFAULT NULL,
  `PER_RUC` varchar(45) DEFAULT NULL,
  `PER_EMAIL` varchar(45) DEFAULT NULL,
  `PER_N_PHONE` varchar(45) DEFAULT NULL,
  `PER_TRADENAME` varchar(45) DEFAULT NULL,
  `PER_DIRECTION` varchar(45) DEFAULT NULL,
  `PER_DEPARTMENT` varchar(45) DEFAULT NULL,
  `PER_PROVINCE` varchar(45) DEFAULT NULL,
  `PER_DISTRIC` varchar(45) DEFAULT NULL,
  `PER_COUNTRY` varchar(45) DEFAULT NULL,
  `PER_PHOTO` text,
  `PER_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`PER_ID`),
  UNIQUE KEY `PER_ID_UNIQUE` (`PER_ID`),
  KEY `PERSON_PERSON_TYPE_idx` (`PET_ID`),
  KEY `PERSON_USER_FK_idx` (`USR_ID`),
  CONSTRAINT `PERSON_PERSON_TYPE` FOREIGN KEY (`PET_ID`) REFERENCES `sv_person_type` (`PET_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `PERSON_USER_FK` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=545 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_person`
--

LOCK TABLES `sv_person` WRITE;
/*!40000 ALTER TABLE `sv_person` DISABLE KEYS */;
INSERT INTO `sv_person` VALUES (1,1,15,'NOSE','NOSE APELLIDO','0','1234567',NULL,'nose@email.com','925877508',NULL,'PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(2,2,5,'PERSON SA 1 asdasd','PERSON SA 1 asdasd','1','12345678','12345678912','gersonmalca@upeu.edu.pe','925877501','Nombre Generico 12','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(5,1,25,'NOSE','NOSE APELLIDO','0','1234567',NULL,'person@email.com','925877508',NULL,'PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(6,3,NULL,'PERSON SAC 2','PERSON SAC 2','1','','12345678912','person@email.com','925877508','Nombre Generico 9','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(7,4,75,'PERSON SRL 1','PERSON SRL 1','1','','12345678912','person@email.com','925877508','Nombre Generico 8','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(9,5,45,'PERSON EIRL 1','PERSON EIRL 1','1','','12345678912','person@email.com','925877508','Nombre Generico 6','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(10,5,NULL,'PERSON EIRL 2','PERSON EIRL 2','1','','12345678912','person@email.com','925877508','Nombre Generico 5','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(11,6,NULL,'PERSON SAA 1','PERSON SAA 1','1','','12345678912','person@email.com','925877508','Nombre Generico 4','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(12,6,NULL,'PERSON SAA 2','PERSON SAA 2','1','','12345678912','person@email.com','925877508','Nombre Generico 3','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(13,1,NULL,'PERSON SAA 3','PERSON SAA 3','1','','12345678912','person@email.com','925877508','Nombre Generico 2','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(15,1,NULL,'NOSE','NOSE APELLIDO','0','1234567',NULL,'person@email.com','925877508',NULL,'PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(16,1,NULL,'PERSONA NORMAL','PERSONA NORMAL','1','12345678',NULL,'person@email.com','925877508','','PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(25,1,NULL,'NOSE','NOSE APELLIDO',NULL,'1234567',NULL,NULL,'925877508',NULL,'PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(45,1,NULL,'Gerson','Bazan',NULL,'12345678','12345678978','gersonmalca@upeu.edu.pe','925877502','Persona de prueba','Carretera Central Km 19.5 Ñaña, Lurigancho, L','LIMA','Lima','Lima','Perú',NULL,'1'),(55,1,NULL,'Gerson','Bazan',NULL,'12345678','12345678978','gersonmalca@upeu.edu.pe','925877502','Persona de prueba','Carretera Central Km 19.5 Ñaña, Lurigancho, L','asdasd','Lima','asdasda','Perú',NULL,'1'),(65,1,NULL,'Gerson','Bazan',NULL,'12345678','12345678978','gersonmalca@upeu.edu.pe','925877502','Persona de prueba','Carretera Central Km 19.5 Ñaña, Lurigancho, L','asdasd ','Lima','Lima','Perú',NULL,'1'),(75,1,NULL,'Gerson','Bazan',NULL,'12345678','12345678978','gersonmalca@upeu.edu.pe','925877502','Persona de prueba','Carretera Central Km 19.5 Ñaña, Lurigancho, L','LIMA','Lima','Lima','Perú',NULL,'1'),(85,2,NULL,'Gerson','Bazan',NULL,'12345678','12345678978','gersonmalca@upeu.edu.pe','925877502','Persona de prueba','Carretera Central Km 19.5 Ñaña, Lurigancho, L','LIMA','Lima','Lima','Perú',NULL,'1'),(105,1,NULL,'NOSE','NOSE APELLIDO',NULL,'1234567',NULL,NULL,'925877508',NULL,'PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(115,NULL,NULL,'NOSE','NOSE APELLIDO',NULL,'1234567',NULL,NULL,'925877508',NULL,'PRUEBA DE DIRECCION','PRUEBA DEPARTAMENT','PRUEBA PROVINCIA','PRUEBA DISTRITO','PRUEBA COUNTRY',NULL,'1'),(125,1,NULL,'adasd','asdas',NULL,'asd','asda','dasd','sda','dasdas','asda','sdasd','asdasd','','asdasd',NULL,'1'),(135,1,NULL,'Probando UX','Probando UX',NULL,'Probando UX','Probando UX','Probando UX','Probando UX','Probando UX','Probando UX','Probando UX','Probando UX','','Probando UX',NULL,'1'),(145,7,NULL,'','',NULL,'','','','','','','','','','',NULL,'1'),(155,1,NULL,'mijares','navarro tito ',NULL,'78018541','','','','','jr tarapaca nro 484','','','','',NULL,'1'),(165,1,NULL,'teresa ','tito molina',NULL,'23560594','','','','','','','','','',NULL,'1'),(175,1,NULL,'simon','pedro navarro',NULL,'23563605','','','','','jr andres avelino caceres nro 1400','','','','',NULL,'1'),(185,1,NULL,'CARLOS','HUAMANNI HUILLCA',NULL,'12457889','','','','','JR URBANDO RAMOS NRO 45','','','','',NULL,'1'),(205,1,NULL,'JAIRO','RAMIREZ AJIOS',NULL,'12568956','','','','','LOS SAUCES MZ 4 LT 5','','','','',NULL,'1'),(215,7,NULL,'','',NULL,'','12568978457','','','BODEGA PACO PINTO ','DIRECCION 1 NRO 45','','','','',NULL,'1'),(225,1,NULL,'asdasd','asdasd',NULL,'asdasd','asda','asdasdasd','sdasdasd','asdasd','asdas','asdasd','asdasd','asdasd','asdasdsda',NULL,'1'),(235,1,225,'Probando Si funciona','Probando Si funciona',NULL,'Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona','Probando Si funciona',NULL,'1'),(275,1,NULL,'PERSONA 5','PERSONA 5 PERSONA 5',NULL,'789456123','78945612378','HCOMERCIAL@GMAIL.COM','961624859','HCOMERCIAL','Asoc. San Antonio','LIMA','','ATE','PERU',NULL,'1'),(285,7,NULL,'','',NULL,'','10235605941','','','TITO MOLINA TEREZA',NULL,'','','','',NULL,'1'),(305,1,NULL,'','',NULL,'06558616','','','','','','','','','',NULL,'1'),(315,1,NULL,'','',NULL,'06557894','','','','','','','','','',NULL,'1'),(325,1,NULL,'Andre ','Matos ',NULL,'70917756','','','','','','','','','',NULL,'1'),(335,1,NULL,'Brain','Albornoz',NULL,'46245857','','albornozcabrera@gmail.com','+51987865779','','Av. República de Colombia 791, Oficina 702, L','Lima','Lima','Lurigancho','Perú',NULL,'1'),(375,2,NULL,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(395,1,NULL,'Nick 2','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(405,1,NULL,'Nick 2','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(425,1,NULL,'Nick 2','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(435,1,355,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(445,1,365,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(455,1,375,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(465,1,385,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(475,1,395,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(485,1,405,'Desdela vista','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(495,1,415,'Desdela vista','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(505,1,425,'Desdela vista','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(515,1,435,'Nick Carlos Mesias','Meza Rivera',NULL,'asd','asd','nickmeza@upeu.edu.pe','asd','PapasNick','Ñaña Alameda 3 Mz D Lt 36','asd','asd','asd','Perú',NULL,'1'),(525,1,445,'asd','asd',NULL,'asd','asd','asd','asd','asd','asd','asd','asda','asd','asd',NULL,'1'),(535,1,455,'asd','asd',NULL,'asd','asd','asd','asd','asd','asd','asd','asda','asd','asd',NULL,'1');
/*!40000 ALTER TABLE `sv_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_person_type`
--

DROP TABLE IF EXISTS `sv_person_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_person_type` (
  `PET_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PET_NAME` text,
  `PET_DESCRIPTION` text,
  `PET_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`PET_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_person_type`
--

LOCK TABLES `sv_person_type` WRITE;
/*!40000 ALTER TABLE `sv_person_type` DISABLE KEYS */;
INSERT INTO `sv_person_type` VALUES (1,'Person Natural','PERSONA NATURAL','1'),(2,'Sociedad Anonima (S.A.)','Mínimo: 2 || Máximo: ilimitado','1'),(3,'Sociedad Anónima cerrada (S.A.C.)','Mínimo: 2 || Máximo: 20','1'),(4,'Sociedad Comercial de Responsabilidad Limitada (S.R.L.)','Mínimo: 2 || Máximo: 20','1'),(5,'Empresario Individual de Responsabilidad Limitada (E.I.R.L.)','Máximo: 1','1'),(6,'Sociedad Anónima Abierta (S.A.A.)','Mínimo: 750','1'),(7,'Persona Sin Definir','Persona por definir','1');
/*!40000 ALTER TABLE `sv_person_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_price_list`
--

DROP TABLE IF EXISTS `sv_price_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_price_list` (
  `PRL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRL_STATUS` char(1) NOT NULL DEFAULT '0',
  `PRL_CREATED` varchar(50) NOT NULL DEFAULT '0000-00-00 00:00:00',
  `PRL_UPDATED` varchar(50) NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`PRL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=225 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_price_list`
--

LOCK TABLES `sv_price_list` WRITE;
/*!40000 ALTER TABLE `sv_price_list` DISABLE KEYS */;
INSERT INTO `sv_price_list` VALUES (15,'1','14/10/2021 18:47:12','0000-00-00 00:00:00'),(25,'0','14/10/2021 18:47:12','0000-00-00 00:00:00'),(175,'0','14/10/2021 18:47:12','0000-00-00 00:00:00'),(185,'0','14/10/2021 18:52:54','0000-00-00 00:00:00'),(195,'0','15/10/2021 16:30:50','0000-00-00 00:00:00'),(205,'0','14/11/2021 17:16:50','0000-00-00 00:00:00'),(215,'0','16/11/2021 12:17:10','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `sv_price_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_product`
--

DROP TABLE IF EXISTS `sv_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_product` (
  `PRO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `CAT_ID` int(11) NOT NULL,
  `TDK_ID` int(11) DEFAULT NULL,
  `PRO_NAME` varchar(45) DEFAULT NULL,
  `PRO_DESCRIPTION` varchar(45) DEFAULT NULL,
  `PRO_BRAND` varchar(45) DEFAULT NULL,
  `PRO_CODE` varchar(45) DEFAULT NULL,
  `PRO_BARCODE` varchar(45) DEFAULT NULL,
  `PRO_IMAGE` text,
  `PRO_CREATE_DATE` varchar(45) DEFAULT NULL,
  `PRO_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`PRO_ID`),
  UNIQUE KEY `PRD_ID_UNIQUE` (`PRO_ID`),
  KEY `fk_sv_product_sv_category1_idx` (`CAT_ID`),
  KEY `PRD_ID_TDK_ID_idx` (`TDK_ID`),
  CONSTRAINT `PRD_ID_TDK_ID` FOREIGN KEY (`TDK_ID`) REFERENCES `sv_trademark` (`TDK_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_product_sv_category1` FOREIGN KEY (`CAT_ID`) REFERENCES `sv_category` (`CAT_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_product`
--

LOCK TABLES `sv_product` WRITE;
/*!40000 ALTER TABLE `sv_product` DISABLE KEYS */;
INSERT INTO `sv_product` VALUES (1,1,1,'USB 32GB',' USB kingston de 32gb - chino','','pr0001','1111','https://media.kingston.com/kingston/product/ktc-product-usb-dt100g3-dt100g332gb-3-sm.jpg','12/12/2021','1'),(5,1,1,'USB 8GB',' USB kingston de 8gb - chino','','pr0002','2222','https://http2.mlstatic.com/D_NQ_NP_846748-MPE25827603411_082017-O.jpg','12/12/2021','1'),(25,1,1,'USB 4GB','USB kingston de 8gb - chino',' ','pr0003','3333','https://media.kingston.com/kingston/product/ktc-product-usb-dt100g3-dt100g332gb-3-sm.jpg','12/12/2021','1'),(35,5,15,'Disco de Linux','Disco con Linux Server 20.18','','pr0004','4444','https://fututel.com/images/tutorials/almacenamiento-en-linux-dividir.jpg','12/12/2021','1'),(45,1,1,'zzzz','zzzz333','zzzz','pr0005','5555','https://ayjoe.engrave.site/img/default.jpg','2021-09-10T23:58','1'),(55,1,1,'zzz','no mas zzz','zzz','pr0008','4455','https://ayjoe.engrave.site/img/default.jpg','2021-09-14T23:58','1'),(85,1,4,'Laptop','Core i7','.','pr000901','1234','https://ayjoe.engrave.site/img/default.jpg','2021-10-23T22:15','1'),(95,885,15,'Probando imagen','probando imagen','Probando imagen','2011145','11144122','https://ayjoe.engrave.site/img/default.jpg','2021-09-17T14:27','1'),(105,885,4,'Laptop','Laptop  Laptop ','Prueba','pr0010','123456','https://ayjoe.engrave.site/img/default.jpg','8/11/2021 17:37:38','1');
/*!40000 ALTER TABLE `sv_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_product_details`
--

DROP TABLE IF EXISTS `sv_product_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_product_details` (
  `PRD_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRO_ID` int(11) NOT NULL,
  `PRL_ID` int(11) DEFAULT NULL,
  `DIS_ID` int(11) DEFAULT NULL,
  `PRD_UNIT_IGV` varchar(45) DEFAULT NULL,
  `PRD_PRICE_MINIMUM` varchar(45) DEFAULT NULL,
  `PRD_PRICE_MAXIMUM` varchar(45) DEFAULT NULL,
  `PRD_UNIT_PRICE` varchar(45) DEFAULT NULL,
  `PRD_PACKAGE_PRICE` varchar(50) DEFAULT NULL,
  `PRD_CREATE_DATE` varchar(45) DEFAULT NULL,
  `PRD_DATE_END` varchar(50) DEFAULT NULL,
  `PRD_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`PRD_ID`),
  UNIQUE KEY `PRD_ID_UNIQUE` (`PRD_ID`),
  KEY `fk_sv_product_details_sv_product1_idx` (`PRO_ID`),
  KEY `fk_sv_product_details_sv_discounts1_idx` (`DIS_ID`),
  KEY `FK_sv_product_details_sv_price_list` (`PRL_ID`),
  CONSTRAINT `FK_sv_product_details_sv_price_list` FOREIGN KEY (`PRL_ID`) REFERENCES `sv_price_list` (`PRL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_product_details_sv_discounts1` FOREIGN KEY (`DIS_ID`) REFERENCES `sv_discounts` (`DIS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_product_details_sv_product1` FOREIGN KEY (`PRO_ID`) REFERENCES `sv_product` (`PRO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=875 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_product_details`
--

LOCK TABLES `sv_product_details` WRITE;
/*!40000 ALTER TABLE `sv_product_details` DISABLE KEYS */;
INSERT INTO `sv_product_details` VALUES (15,1,15,5,'1','1','1','50','48','1','2021/11/02','1'),(25,5,15,5,'1','1','1','60','56','1','2021/11/02','1'),(35,25,15,5,'1','1','1','30','27','1','2021/11/03','1'),(55,35,15,NULL,'1','1','1','15','10','1','2021/11/03','1'),(245,5,25,NULL,NULL,NULL,NULL,'59','12','6/10/2021 21:39:58','2021/11/04','1'),(255,1,25,NULL,NULL,NULL,NULL,'12','12','11/10/2021 22:58:38','2021/11/04','1'),(265,55,15,NULL,NULL,NULL,NULL,'25','12','13/10/2021 21:21:17','2021/11/05','1'),(525,45,185,NULL,NULL,NULL,NULL,NULL,NULL,'14/10/2021 18:52:54','2021/11/05','1'),(535,1,185,NULL,NULL,NULL,NULL,'50','50','14/10/2021 18:52:54','2021/11/06','1'),(545,55,185,NULL,NULL,NULL,NULL,'25','25','14/10/2021 18:52:54','2021/11/06','1'),(555,5,185,NULL,NULL,NULL,NULL,'60','60','14/10/2021 18:52:54','2021/11/07','1'),(565,25,185,NULL,NULL,NULL,NULL,'30','30','14/10/2021 18:52:54','2021/11/07','1'),(585,25,25,NULL,NULL,NULL,NULL,'25','12','14/10/2021 19:01:42','2021/12/12','1'),(595,35,185,NULL,NULL,NULL,NULL,'50','12','15/10/2021 16:27:37','2021/12/12','1'),(605,55,195,NULL,NULL,NULL,NULL,'25','25','15/10/2021 16:30:50','2021/12/12','1'),(615,45,195,NULL,NULL,NULL,NULL,'20','20','15/10/2021 16:30:50','2021/12/12','1'),(625,5,195,NULL,NULL,NULL,NULL,'50','50','15/10/2021 16:30:50','2021/12/12','1'),(635,25,195,NULL,NULL,NULL,NULL,'30','30','15/10/2021 16:30:50','2021/12/12','1'),(645,1,195,NULL,NULL,NULL,NULL,'30','30','15/10/2021 16:30:50','2021/12/12','1'),(655,35,195,NULL,NULL,NULL,NULL,'15','15','15/10/2021 16:30:50','2021/12/12','1'),(665,85,15,NULL,NULL,NULL,NULL,'450','420','26/10/2021 11:16:20','2021/12/12','1'),(675,45,205,NULL,NULL,NULL,NULL,'50','50','14/11/2021 17:16:50',NULL,'1'),(685,95,205,NULL,NULL,NULL,NULL,'30','30','14/11/2021 17:16:50',NULL,'1'),(695,105,205,NULL,NULL,NULL,NULL,'1000','1000','14/11/2021 17:16:50',NULL,'1'),(705,25,205,NULL,NULL,NULL,NULL,'30','30','14/11/2021 17:16:50',NULL,'1'),(725,5,205,NULL,NULL,NULL,NULL,'60','60','14/11/2021 17:16:50',NULL,'1'),(735,35,205,NULL,NULL,NULL,NULL,'15','15','14/11/2021 17:16:51',NULL,'1'),(745,55,205,NULL,NULL,NULL,NULL,'25','25','14/11/2021 17:16:51',NULL,'1'),(755,85,205,NULL,NULL,NULL,NULL,'450','450','14/11/2021 17:16:51',NULL,'1'),(765,1,205,NULL,NULL,NULL,NULL,'50','45','14/11/2021 17:19:19',NULL,'1'),(775,95,15,NULL,NULL,NULL,NULL,'10','9','16/11/2021 12:15:55',NULL,'1'),(785,5,215,NULL,NULL,NULL,NULL,'70','70','16/11/2021 12:17:10',NULL,'1'),(795,1,215,NULL,NULL,NULL,NULL,'60','60','16/11/2021 12:17:10',NULL,'1'),(805,95,215,NULL,NULL,NULL,NULL,'40','40','16/11/2021 12:17:10',NULL,'1'),(815,85,215,NULL,NULL,NULL,NULL,'500','500','16/11/2021 12:17:10',NULL,'1'),(825,105,215,NULL,NULL,NULL,NULL,'1500','1500','16/11/2021 12:17:10',NULL,'1'),(835,35,215,NULL,NULL,NULL,NULL,'20','20','16/11/2021 12:17:10',NULL,'1'),(845,25,215,NULL,NULL,NULL,NULL,'40','40','16/11/2021 12:17:11',NULL,'1'),(855,45,215,NULL,NULL,NULL,NULL,'60','60','16/11/2021 12:17:11',NULL,'1'),(865,55,215,NULL,NULL,NULL,NULL,'30','30','16/11/2021 12:17:11',NULL,'1');
/*!40000 ALTER TABLE `sv_product_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_promotions`
--

DROP TABLE IF EXISTS `sv_promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_promotions` (
  `PRT_ID` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `PRT_IMAGE` varchar(150) DEFAULT NULL,
  `PRT_TITLE` varchar(20) DEFAULT NULL,
  `PRT_DESCRIPTION` varchar(150) DEFAULT NULL,
  `PRT_STATUS` varchar(1) DEFAULT NULL,
  `PRT_CREATED_AT` timestamp NULL DEFAULT NULL,
  `PRT_UPDATED_AT` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`PRT_ID`),
  UNIQUE KEY `PRT_TITLE` (`PRT_TITLE`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_promotions`
--

LOCK TABLES `sv_promotions` WRITE;
/*!40000 ALTER TABLE `sv_promotions` DISABLE KEYS */;
INSERT INTO `sv_promotions` VALUES (95,'http://localhost:5000/upload\\1635105935610promotion.jpg','Ofertas en todo','Se acaba','1','2021-10-24 20:04:00','0000-00-00 00:00:00'),(105,'https://ayjoe.engrave.site/img/default.jpg','Oferta','Oferta','1','2021-11-15 02:29:00','0000-00-00 00:00:00'),(135,'https://ayjoe.engrave.site/img/default.jpg','Oferta 3','Oferta 3.','1','2021-11-15 07:30:00','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `sv_promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_rol`
--

DROP TABLE IF EXISTS `sv_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_rol` (
  `ROL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ROL_NAME` varchar(45) DEFAULT NULL,
  `ROL_DESCRIPTION` varchar(45) DEFAULT NULL,
  `ROL_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`ROL_ID`),
  UNIQUE KEY `ROL_ID_UNIQUE` (`ROL_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_rol`
--

LOCK TABLES `sv_rol` WRITE;
/*!40000 ALTER TABLE `sv_rol` DISABLE KEYS */;
INSERT INTO `sv_rol` VALUES (1,'ADMINISTRADOR','ADMIN','1'),(2,'JEFE','JEFE','1'),(3,'VENDEDOR','VENDEDOR','1'),(4,'CLIENTE','CLIENTE','1');
/*!40000 ALTER TABLE `sv_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_sale_type`
--

DROP TABLE IF EXISTS `sv_sale_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_sale_type` (
  `SLT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `SLT_NAME` varchar(45) DEFAULT NULL,
  `SLT_DESCRIPTION` text,
  `SLT_SEND_TO_DAY` varchar(45) DEFAULT NULL,
  `SLT_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SLT_ID`),
  UNIQUE KEY `SLT_ID_UNIQUE` (`SLT_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_sale_type`
--

LOCK TABLES `sv_sale_type` WRITE;
/*!40000 ALTER TABLE `sv_sale_type` DISABLE KEYS */;
INSERT INTO `sv_sale_type` VALUES (5,'VENTA FISICA',NULL,NULL,'1'),(15,'VENTA ONLINE',NULL,NULL,'1');
/*!40000 ALTER TABLE `sv_sale_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_sales_description`
--

DROP TABLE IF EXISTS `sv_sales_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_sales_description` (
  `SDS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `DOC_ID` int(11) NOT NULL,
  `PRO_ID` int(11) NOT NULL,
  `DIS_ID` int(11) DEFAULT NULL,
  `SDT_CODE` varchar(45) DEFAULT NULL,
  `SDT_AMOUNT` double DEFAULT NULL,
  `SDT_DESCRIPTION` varchar(45) DEFAULT NULL,
  `SDT_PRICE` double DEFAULT NULL,
  `SDT_SUBTOTAL` double DEFAULT NULL,
  `SDT_DISCOUNT` double DEFAULT NULL,
  `SDT_TOTAL` double DEFAULT NULL,
  `SDS_DAYS_TO_SEND` varchar(45) DEFAULT NULL,
  `SDS_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`SDS_ID`),
  UNIQUE KEY `SDS_ID_UNIQUE` (`SDS_ID`),
  KEY `fk_sv_sales_description_sv_discounts1_idx` (`DIS_ID`),
  KEY `fk_sales_description_sv_document_idx` (`DOC_ID`),
  KEY `fk_sales_description_sv_product_idx` (`PRO_ID`),
  CONSTRAINT `fk_sales_description_product1` FOREIGN KEY (`PRO_ID`) REFERENCES `sv_product` (`PRO_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_sales_description_sv_discounts1` FOREIGN KEY (`DIS_ID`) REFERENCES `sv_discounts` (`DIS_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_sales_description_sv_document` FOREIGN KEY (`DOC_ID`) REFERENCES `sv_document` (`DOC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2045 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_sales_description`
--

LOCK TABLES `sv_sales_description` WRITE;
/*!40000 ALTER TABLE `sv_sales_description` DISABLE KEYS */;
INSERT INTO `sv_sales_description` VALUES (1835,2445,1,5,'pr0001',1,'USB 32GB',50,50,2.5,47.5,'24-10-2021','1'),(1845,2455,35,NULL,'pr0004',2,'Disco de Linux',15,30,0,30,'24-10-2021','1'),(1855,2465,35,NULL,'pr0004',2,'Disco de Linux',15,30,0,30,'24-10-2021','1'),(1865,2475,1,5,'pr0001',2,'USB 32GB',50,100,5,95,'27-10-2021','1'),(1875,2485,1,NULL,'pr0001',1,' USB kingston de 32gb - chino',50,35,0,35,'0','1'),(1885,2495,5,NULL,'pr0002',8,' USB kingston de 8gb - chino',60,30,0,30,'0','1'),(1895,2505,1,NULL,'pr0001',1,' USB kingston de 32gb - chino',50,47.5,0,47.5,'0','1'),(1905,2515,5,NULL,'pr0002',8,' USB kingston de 8gb - chino',60,224,0,224,'0','1'),(1915,2525,1,NULL,'pr0001',1,' USB kingston de 32gb - chino',50,47.5,0,47.5,'0','1'),(1925,2535,5,NULL,'pr0002',1,' USB kingston de 8gb - chino',60,30,0,30,'0','1'),(1935,2545,5,NULL,'pr0002',1,' USB kingston de 8gb - chino',60,30,0,30,'0','1'),(1945,2555,5,NULL,'pr0002',1,' USB kingston de 8gb - chino',60,30,0,30,'0','1'),(1955,2565,1,5,'pr0001',2,'USB 32GB',50,100,5,95,'2-11-2021','1'),(1965,2575,35,NULL,'pr0004',49,'Disco con Linux Server 20.18',15,14.25,0,14.25,'0','1'),(1975,2585,35,NULL,'pr0004',1,'Disco con Linux Server 20.18',15,14.25,0,14.25,'0','1'),(1985,2595,5,155,'pr0002',1,'USB 8GB',60,60,30,30,'10-11-2021','1'),(1995,2605,1,5,'pr0001',2,'USB 32GB',50,100,5,95,'14-11-2021','1'),(2005,2605,25,165,'pr0003',3,'USB 4GB',30,90,4.5,85.5,'14-11-2021','1'),(2015,2645,25,NULL,'pr0003',1,'USB kingston de 8gb - chino',30,28.5,0,28.5,'0','1'),(2025,2655,25,NULL,'pr0003',1,'USB kingston de 8gb - chino',30,28.5,0,28.5,'0','1'),(2035,2665,1,5,'pr0001',2,'USB 32GB',50,100,5,95,'21-11-2021','1');
/*!40000 ALTER TABLE `sv_sales_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_status_ticket`
--

DROP TABLE IF EXISTS `sv_status_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_status_ticket` (
  `STC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `STC_NAME` varchar(45) DEFAULT NULL,
  `STC_DESCRIPTION` text,
  `STC_COLOUR` varchar(45) DEFAULT NULL,
  `STC_CODE` text,
  `STC_EXPECTED_TIME` varchar(45) DEFAULT NULL,
  `STC_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`STC_ID`),
  UNIQUE KEY `STC_ID_UNIQUE` (`STC_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_status_ticket`
--

LOCK TABLES `sv_status_ticket` WRITE;
/*!40000 ALTER TABLE `sv_status_ticket` DISABLE KEYS */;
INSERT INTO `sv_status_ticket` VALUES (1,'NUEVO','El ticket a crear se registrara como una nueva petición','#FFB648',NULL,'01:00:00','1'),(2,'ABIERTO','El personal de soporte está trabajando en el ticket','#E34F32',NULL,'00:00:00','1'),(3,'PENDIENTE','El personal de soporte está esperando la respuesta del solicitante','#3091EC',NULL,'00:00:00','1'),(4,'CERRADO','El ticket a sido atendido con satisfacción','#87929D',NULL,'00:00:00','1');
/*!40000 ALTER TABLE `sv_status_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_stock`
--

DROP TABLE IF EXISTS `sv_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_stock` (
  `STK_ID` int(11) NOT NULL AUTO_INCREMENT,
  `PRD_ID` int(11) DEFAULT NULL,
  `STK_INITIAL_STOCK` varchar(45) DEFAULT NULL,
  `STK_TODAY` varchar(45) DEFAULT NULL,
  `STK_DATE_UPGRADE` varchar(45) DEFAULT NULL,
  `STK_STATUS` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`STK_ID`),
  UNIQUE KEY `STK_ID_UNIQUE` (`STK_ID`),
  KEY `STOCK_PRD_ID_idx` (`PRD_ID`),
  CONSTRAINT `STOCK_PRD_ID` FOREIGN KEY (`PRD_ID`) REFERENCES `sv_product_details` (`PRD_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_stock`
--

LOCK TABLES `sv_stock` WRITE;
/*!40000 ALTER TABLE `sv_stock` DISABLE KEYS */;
INSERT INTO `sv_stock` VALUES (5,255,'15','49','2021-09-02','1'),(15,15,'20','35','2021-11-21','1'),(25,25,'30','30','2021-11-11','1'),(35,35,'15','47','2021-11-14','1'),(45,55,'10','0','2021-11-09','1'),(55,265,'20','50','2021-10-14','1');
/*!40000 ALTER TABLE `sv_stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_template`
--

DROP TABLE IF EXISTS `sv_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_template` (
  `TEM_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEM_NAME` varchar(50) NOT NULL DEFAULT '',
  `TEM_DESCRIPTION` varchar(50) NOT NULL DEFAULT '',
  `TEM_URL` varchar(100) NOT NULL DEFAULT '',
  `TEM_IMG` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`TEM_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_template`
--

LOCK TABLES `sv_template` WRITE;
/*!40000 ALTER TABLE `sv_template` DISABLE KEYS */;
INSERT INTO `sv_template` VALUES (5,'Impresora','Plantilla para impresoras comunes para hojas A4','https://img.yumpu.com/6058939/1/500x640/comprobante-de-pago-nuevopdf-ceisladelosmilagros.jpg','https://img.yumpu.com/6058939/1/500x640/comprobante-de-pago-nuevopdf-ceisladelosmilagros.jpg'),(15,'Ticketera','Plantilla para Ticketeras en tamaño de la ticketer','https://help.loyverse.com/sites/default/files/users/user137/es/es-How-to-Print-Bill-4.png','https://help.loyverse.com/sites/default/files/users/user137/es/es-How-to-Print-Bill-4.png');
/*!40000 ALTER TABLE `sv_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_temporary_alerts`
--

DROP TABLE IF EXISTS `sv_temporary_alerts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_temporary_alerts` (
  `TEA_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TEA_TITLE` varchar(45) DEFAULT NULL,
  `TEA_DESCRIPTION` text,
  `TEA_CLIENT` text,
  `TEA_COLOR` varchar(45) DEFAULT NULL,
  `TEA_TOTAL` varchar(45) DEFAULT NULL,
  `TEA_DATE` varchar(45) DEFAULT NULL,
  `TEA_HOUR` varchar(45) DEFAULT NULL,
  `TEA_TYPE` varchar(45) DEFAULT NULL,
  `TEA_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`TEA_ID`),
  UNIQUE KEY `TEA_ID_UNIQUE` (`TEA_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=1045 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_temporary_alerts`
--

LOCK TABLES `sv_temporary_alerts` WRITE;
/*!40000 ALTER TABLE `sv_temporary_alerts` DISABLE KEYS */;
INSERT INTO `sv_temporary_alerts` VALUES (135,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','24/10/2021','17:44:36','AI','1'),(145,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','24/10/2021','18:04:01','AI','1'),(155,'Nuevo Ticket Creado','no prende mi laptop','Brain Albornoz','yellow.100',NULL,'24/10/2021','18:28:58','AI','1'),(165,'Nuevo Ticket Creado','sdasd','PERSON SAA 2 PERSON SAA 2','yellow.100',NULL,'24/10/2021','18:34:49','AI','1'),(175,'Nuevo Ticket Creado','asd','NOSE NOSE APELLIDO','yellow.100',NULL,'24/10/2021','18:36:30','AI','1'),(185,'Nuevo Ticket Creado','dasda','NOSE NOSE APELLIDO','yellow.100',NULL,'24/10/2021','18:40:32','AI','1'),(195,'Nuevo Ticket Creado','dasd','NOSE NOSE APELLIDO','yellow.100',NULL,'24/10/2021','18:48:25','AI','1'),(205,'Nuevo Ticket Creado','sdasda','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'24/10/2021','18:53:49','AI','1'),(215,'Nuevo Ticket Creado','asdas','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'24/10/2021','18:55:12','AI','1'),(225,'Nuevo Ticket Creado','asdasdas','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'24/10/2021','18:56:42','AI','1'),(235,'Nuevo Ticket Creado','sdasda','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'24/10/2021','19:18:33','AI','1'),(245,'Nuevo Ticket Creado','sdasdasdasd','NOSE NOSE APELLIDO','yellow.100',NULL,'24/10/2021','19:22:23','AI','1'),(255,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','25/10/2021','16:35:03','AI','1'),(265,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','25/10/2021','16:41:37','AI','1'),(275,'Nuevo Ticket Creado','Prueba 5','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'25/10/2021','16:43:45','AI','1'),(285,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','26/10/2021','10:52:10','AI','1'),(295,'Nuevo Ticket Creado','prueba 6 ','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'26/10/2021','11:01:58','AI','1'),(305,'Nuevo Ticket Creado','Prueba 10','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'26/10/2021','11:08:57','AI','1'),(315,'Nuevo Ticket Creado','probandolo','mijares navarro tito ','yellow.100',NULL,'27/10/2021','9:40:08','AI','1'),(325,'Nuevo Ticket Creado','probando subida de imagenes','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'27/10/2021','12:50:24','AI','1'),(335,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 105','27/10/2021','13:32:48','AI','1'),(345,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','14:23:51','AI','1'),(355,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 100','27/10/2021','14:38:12','AI','1'),(365,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 105','27/10/2021','14:42:39','AI','1'),(375,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','14:43:42','AI','1'),(385,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','18:19:52','AI','1'),(395,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','18:23:26','AI','1'),(405,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','20:18:08','AI','1'),(415,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 70','27/10/2021','21:34:53','AI','1'),(425,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','21:42:28','AI','1'),(435,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','22:37:14','AI','1'),(445,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','22:44:44','AI','1'),(455,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 1510','27/10/2021','22:48:29','AI','1'),(465,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 1900','27/10/2021','23:00:32','AI','1'),(475,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 398.8','27/10/2021','23:02:52','AI','1'),(485,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','23:05:36','AI','1'),(495,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','23:09:16','AI','1'),(505,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','23:18:07','AI','1'),(515,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 250','27/10/2021','23:18:58','AI','1'),(525,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','23:19:10','AI','1'),(535,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','23:28:18','AI','1'),(545,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','23:30:12','AI','1'),(555,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','23:36:08','AI','1'),(565,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','27/10/2021','23:36:54','AI','1'),(575,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','27/10/2021','23:50:18','AI','1'),(585,'Nuevo Ticket Creado','Prueba 150','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'27/10/2021','23:53:59','AI','1'),(595,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 10','28/10/2021','16:37:41','AI','1'),(605,'Nuevo Ticket Creado','asdasdasd','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'28/10/2021','23:09:17','AI','1'),(615,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 40','28/10/2021','23:12:40','AI','1'),(625,'Nuevo Ticket Creado','mijares navarro tito','mijares navarro tito ','yellow.100',NULL,'1/11/2021','16:38:39','AI','1'),(635,'Nuevo Ticket Creado','Nombre Generico 12','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'1/11/2021','16:45:18','AI','1'),(645,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 23.5','2/11/2021','23:02:54','AI','1'),(655,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 708.25','2/11/2021','23:12:57','AI','1'),(665,'Nuevo Ticket Creado','Probando el subir Foto','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'3/11/2021','16:55:33','AI','1'),(675,'Nuevo Ticket Creado','subiendo foto del front','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'3/11/2021','17:33:45','AI','1'),(685,'Nuevo Ticket Creado','subiendo foto del front','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'3/11/2021','17:35:16','AI','1'),(695,'Nuevo Ticket Creado','123','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'3/11/2021','22:18:52','AI','1'),(705,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 55','5/11/2021','01:25:43','AI','1'),(715,'Nueva Venta Relizada',NULL,'PERSON SA 1 asdasd PERSON SA 1 asdasd','green.100','TOTAL: s/. 57.5','5/11/2021','01:43:57','AI','1'),(725,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 38.5','5/11/2021','01:49:37','AI','1'),(735,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 38.5','5/11/2021','01:57:39','AI','1'),(745,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 113.5','8/11/2021','17:22:34','AI','1'),(755,'Nuevo Ticket Creado','Prueba 5000','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'8/11/2021','17:23:18','AI','1'),(765,'Nuevo Ticket Creado','Prueba 789','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'8/11/2021','17:23:47','AI','1'),(775,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 2005','8/11/2021','17:41:38','AI','1'),(785,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 86','8/11/2021','17:51:25','AI','1'),(795,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 23.5','8/11/2021','22:53:24','AI','1'),(805,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 149.5','10/11/2021','22:40:24','AI','1'),(815,'Nuevo Ticket Creado','prueba789','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:19:00','new','1'),(825,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 77.5','14/11/2021','16:22:11','new','1'),(835,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 390','14/11/2021','16:23:27','new','1'),(845,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 0','14/11/2021','16:23:51','new','1'),(855,'Nuevo Ticket Creado','Prueba 123','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:24:33','new','1'),(865,'Nuevo Ticket Creado','probando desde aqui','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:28:27','AI','1'),(875,'Nuevo Ticket Creado','asd asd asd','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:30:41','AI','0'),(885,'Nuevo Ticket Creado','','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:32:12','AI','0'),(895,'Nuevo Ticket Creado','','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:32:11','AI','0'),(905,'Nuevo Ticket Creado','asdasdas asdasdas dasdasdasdas','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:34:42','AI','0'),(915,'Nuevo Ticket Creado','asdasd asd asd asd','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:37:23','AI','0'),(925,'Nuevo Ticket Creado','sdasdasd','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:40:18','AI','0'),(935,'Nuevo Ticket Creado','asd asd asd asad asd asd asdsasda s','PERSON SA 1 asdasd PERSON SA 1 asdasd','yellow.100',NULL,'14/11/2021','16:44:27','AI','0'),(945,'Nuevo Ticket Creado','fsdfsdf','NOSE NOSE APELLIDO','yellow.100',NULL,'14/11/2021','18:33:48','AI','1'),(955,'Nuevo Ticket Creado','','NOSE NOSE APELLIDO','yellow.100',NULL,'14/11/2021','18:37:59','AI','0'),(965,'Nuevo Ticket Creado','asdad','NOSE NOSE APELLIDO','yellow.100',NULL,'14/11/2021','18:39:21','AI','0'),(975,'Nuevo Ticket Creado','Probando 123456789','PERSON SRL 1 PERSON SRL 1','yellow.100',NULL,'16/11/2021','11:30:41','AI','0'),(985,'Nuevo Ticket Creado','Probando 123456789 imagen','PERSON SRL 1 PERSON SRL 1','yellow.100',NULL,'16/11/2021','11:32:01','AI','0'),(995,'Nuevo Ticket Creado','ayuda con disco solido','PERSON SRL 1 PERSON SRL 1','yellow.100',NULL,'16/11/2021','12:26:27','AI','0'),(1005,'Nuevo Ticket Creado','Pruebaa','PERSON SRL 1 PERSON SRL 1','yellow.100',NULL,'18/11/2021','14:15:49','AI','0'),(1015,'Nueva Venta Relizada',NULL,'PERSON SRL 1 PERSON SRL 1','green.100','TOTAL: s/. 67','19/11/2021','12:25:45','new','0'),(1025,'Nuevo Ticket Creado','Ampletado','asd asd','yellow.100',NULL,'20/11/2021','19:03:52','AI','0'),(1035,'Nuevo Ticket Creado','asd','asd asd','yellow.100',NULL,'20/11/2021','19:10:17','AI','0');
/*!40000 ALTER TABLE `sv_temporary_alerts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_ticket`
--

DROP TABLE IF EXISTS `sv_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_ticket` (
  `TCK_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USR_ID` int(11) DEFAULT NULL,
  `PER_ID` int(11) NOT NULL,
  `TTC_ID` int(11) DEFAULT NULL,
  `STC_ID` int(11) NOT NULL,
  `TCK_PETITIONER` text,
  `TCK_DESCRIPTION` text,
  `TCK_TAG` varchar(50) DEFAULT NULL,
  `TCK_SUPPORT_TYPE` varchar(50) DEFAULT NULL,
  `TCK_FINAL_LOCATION` varchar(50) DEFAULT NULL,
  `TCK_VIEW_HOUR` varchar(45) DEFAULT NULL,
  `TCK_REQUEST_DATE` varchar(45) DEFAULT NULL,
  `TCK_REQUEST_HOUR` varchar(45) DEFAULT NULL,
  `TCK_END_HOUR` varchar(45) DEFAULT NULL,
  `TCK_END_DATE` varchar(45) DEFAULT NULL,
  `TCK_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`TCK_ID`),
  UNIQUE KEY `TCK_ID_UNIQUE` (`TCK_ID`),
  KEY `fk_sv_ticket_sv_user1_idx` (`USR_ID`),
  KEY `fk_sv_ticket_sv_person1_idx` (`PER_ID`),
  KEY `fk_sv_ticket_sv_type_ticket1_idx` (`TTC_ID`),
  KEY `fk_sv_ticket_sv_status_ticket1_idx` (`STC_ID`),
  CONSTRAINT `fk_sv_ticket_sv_person1` FOREIGN KEY (`PER_ID`) REFERENCES `sv_person` (`PER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_ticket_sv_status_ticket1` FOREIGN KEY (`STC_ID`) REFERENCES `sv_status_ticket` (`STC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_ticket_sv_type_ticket1` FOREIGN KEY (`TTC_ID`) REFERENCES `sv_type_ticket` (`TTC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_ticket_sv_user1` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1195 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_ticket`
--

LOCK TABLES `sv_ticket` WRITE;
/*!40000 ALTER TABLE `sv_ticket` DISABLE KEYS */;
INSERT INTO `sv_ticket` VALUES (1,NULL,1,NULL,2,'PETICION NUEVO 1','PETICION NUEVO 1',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-5 17:38:07','2021-10-13','0:17:41',NULL,NULL,'1'),(2,NULL,5,NULL,3,'PETICION NUEVO 2','PETICION NUEVO 2',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-5 17:39:51','2021-09-13','0:17:41',NULL,NULL,'1'),(3,NULL,15,NULL,3,'PETICION NUEVO 3','PETICION NUEVO 3',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-5 17:40:14','2021-9-13','0:17:41',NULL,NULL,'1'),(4,45,1,NULL,2,'PETICION ABIERTO 4','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-2 11:55:08','2021-9-13','0:17:41',NULL,NULL,'1'),(5,5,5,NULL,2,'PETICION ABIERTO 5','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-14 23:25:48','14/9/2021','0:17:41',NULL,NULL,'1'),(6,25,15,NULL,2,'PETICION ABIERTO 6','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-14 23:26:48','14/9/2021','0:17:41',NULL,NULL,'1'),(7,25,1,NULL,4,'PETICION PENDIENTE 7','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-14 23:40:48','14/9/2021','0:17:41',NULL,NULL,'1'),(8,15,5,NULL,3,'PETICION PENDIENTE 8','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-5 17:43:49','14/9/2021','0:17:41',NULL,NULL,'1'),(9,15,15,NULL,3,'PETICION PENDIENTE 9','PETICION PENDIENTE 9',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-14 23:37:48','15/9/2021','0:17:41',NULL,NULL,'1'),(10,5,1,NULL,4,'PETICION CERRADO 10','PETICION CERRADO 10',NULL,NULL,'CHEPÉN, LA LIBERTAD','2021-11-14 23:41:48','15/9/2021','0:17:41',NULL,NULL,'1'),(75,25,16,NULL,1,'Probando el crear ticket desde la vista','Probando el crear ticket desde la vista','Importante','Software','La libertad/Chepén/Chepén',NULL,'15/9/2021','0:17:41',NULL,NULL,'1'),(85,5,2,NULL,1,'asdasdas','dasdasdasd','dasdasd','sdasdas','asdasda','2021-11-5 17:44:58','15/9/2021','0:17:41',NULL,NULL,'1'),(95,5,5,NULL,1,'sdfsd','fsdfsdf','sdfsdf','fsdf','sdfsd',NULL,'15/9/2021','0:17:41',NULL,NULL,'1'),(105,5,5,NULL,2,'sdasdasd','sdasdas','asdadsd','sadas','dasd','2021-11-14 23:27:48','2021-9-13','0:17:41',NULL,NULL,'1'),(115,25,2,NULL,1,'PRUEBA NUEVO','asdasda','dasdsad','sadas','asdasdasd','2021-11-2 12:59:21','2021-9-13','0:17:41',NULL,NULL,'1'),(125,5,1,NULL,1,'PROBANDO HORA Y FECHA','PROBANDO HORA Y FECHA','Importante','Software','PROBANDO HORA Y FECHA',NULL,'2021-9-13','0:17:41',NULL,NULL,'1'),(135,5,1,NULL,2,'PROBANDO HORA Y FECHA','PROBANDO HORA Y FECHA','Importante','Software','PROBANDO HORA Y FECHA','2021-11-5 17:49:27','14/9/2021','0:17:41',NULL,NULL,'1'),(145,NULL,2,NULL,1,'Importante','Desde la Vista de cliente',NULL,NULL,'mi casita',NULL,'14/9/2021','0:17:41',NULL,NULL,'1'),(155,5,16,NULL,4,'PETICION CERRADO 10','PETICION CERRADO 10',NULL,NULL,'PETICION CERRADO 10','2021-11-14 23:42:48','15/9/2021','0:17:41',NULL,NULL,'1'),(165,NULL,2,NULL,1,'desde la vista cliente','problemas 0',NULL,NULL,'mi direccion',NULL,'16/9/2021','22:48:24',NULL,NULL,'1'),(175,5,2,NULL,1,'Probando el asunto','Probando el asunto de la hora y tiempo','asdasdsd','asdasd','asdasd',NULL,'17/9/2021','12:43:37',NULL,NULL,'1'),(185,5,9,NULL,1,'asdasd','asdasda','asdasd','asdasd','sdasdasd',NULL,'17/9/2021','12:44:45',NULL,NULL,'1'),(195,NULL,2,NULL,2,'Prueba 123','Prueba Prueba Prueba Prueba Prueba',NULL,NULL,'Lima','2021-11-5 17:44:22','2021-10-13','23:34:26',NULL,NULL,'1'),(205,NULL,2,NULL,1,'vc','bcvbcvb',NULL,NULL,'',NULL,'2021-10-13','23:38:06',NULL,NULL,'1'),(215,45,165,NULL,1,'','','','','',NULL,'2021-10-13','23:43:29',NULL,NULL,'1'),(225,45,5,NULL,1,'asdasd','asdasdasdasd','asd','asdasd','asd',NULL,'2021-10-10','22:46:20',NULL,NULL,'1'),(235,45,5,NULL,1,'asdasd','asdasdasdasd','asd','asdasd','asd',NULL,'2021-10-10','22:46:21',NULL,NULL,'1'),(245,45,5,NULL,1,'asdasd','asdasdasdasd','asd','asdasd','asd',NULL,'2021-10-14','22:48:47',NULL,NULL,'1'),(255,35,7,NULL,3,'Probando socket','Probando socket','asdasda','asdasd','asdasdasd','2021-11-2 12:31:57','14/10/2021','22:51:41',NULL,NULL,'1'),(265,45,2,NULL,1,'Probando Socket','Probando Socket','sdas','asda','asdasdasd',NULL,'14/10/2021','22:56:29',NULL,NULL,'1'),(285,35,5,NULL,1,'3 prueba de socket','3 prueba de socket','sadsdas','adsdasd','3 prueba de socket',NULL,'14/10/2021','23:01:05',NULL,NULL,'1'),(305,195,5,NULL,1,'Probando 4 vez','probando 4 vez','asdas','asd','asdasd',NULL,'14/10/2021','23:04:37',NULL,NULL,'1'),(335,NULL,2,NULL,1,'Prueba 1000','Prueba 1000 Prueba 1000 Prueba 1000',NULL,NULL,'Lima',NULL,'15/10/2021','15:19:50',NULL,NULL,'1'),(375,NULL,2,NULL,1,'Prueba 1000','Prueba 1000',NULL,NULL,'Prueba 1000',NULL,'15/10/2021','15:20:41',NULL,NULL,'1'),(385,NULL,2,NULL,1,'PRODUCTO EN MAL ESTADO','PRODUCTO EN MAL ESTADO',NULL,NULL,'Arequipa',NULL,'15/10/2021','22:10:50',NULL,NULL,'1'),(395,NULL,2,NULL,1,'Prueba 1001','Prueba 1001',NULL,NULL,'Lima',NULL,'17/10/2021','12:19:35',NULL,NULL,'1'),(405,NULL,2,NULL,1,'prueba 156','prueba 156',NULL,NULL,'Lima',NULL,'18/10/2021','21:36:38',NULL,NULL,'1'),(415,NULL,2,NULL,1,'prueba 157','prueba 157',NULL,NULL,'prueba 157',NULL,'18/10/2021','23:21:07',NULL,NULL,'1'),(425,5,2,NULL,1,'','','','','',NULL,'18/10/2021','23:24:34',NULL,NULL,'1'),(435,NULL,2,NULL,1,'prueba 158','prueba 158',NULL,NULL,'prueba 158',NULL,'18/10/2021','23:55:40',NULL,NULL,'1'),(445,NULL,2,NULL,1,'asd','asd',NULL,NULL,'LIMA',NULL,'20/10/2021','10:22:57',NULL,NULL,'1'),(455,NULL,2,NULL,1,'123','123',NULL,NULL,'123',NULL,'20/10/2021','22:35:37',NULL,NULL,'1'),(465,NULL,2,NULL,1,'prueba 1213','prueba 1213',NULL,NULL,'prueba 1213',NULL,'20/10/2021','23:25:24',NULL,NULL,'1'),(475,195,335,NULL,1,'arreglar laptop','no prende mi laptop','','hardware','tienda principal',NULL,'24/10/2021','18:28:57',NULL,NULL,'1'),(485,35,12,NULL,2,'asda','sdasd','sdfsdsdfsdf','dfsdf','asdasdasdasd','2021-11-14 23:28:48','24/10/2021','18:34:48',NULL,NULL,'1'),(505,35,5,NULL,2,'asdasd','asd','asdasdas','asdasd','asdasd','2021-11-14 23:29:48','24/10/2021','18:36:30',NULL,NULL,'1'),(535,205,5,NULL,1,'asdas','dasda','asdasd','asd','sdasd',NULL,'24/10/2021','18:40:31',NULL,NULL,'1'),(545,35,1,NULL,1,'asdas','dasd','sdasd','dasda','asdas',NULL,'24/10/2021','18:48:23',NULL,NULL,'1'),(555,35,2,NULL,1,'sda','sdasda','asdasd','asdasd','sdasd',NULL,'24/10/2021','18:53:48',NULL,NULL,'1'),(565,205,2,NULL,2,'asdasd','asdas','asdas','dasd','dasdas','2021-11-14 23:30:48','24/10/2021','18:55:11',NULL,NULL,'1'),(575,195,2,NULL,2,'sadasd','asdasdas','dasdasdas','asdas','dasd','2021-11-14 23:31:48','24/10/2021','18:56:40',NULL,NULL,'1'),(595,195,2,NULL,2,'asda','sdasda','asdasd','dasd','sdas','2021-11-14 23:32:48','24/10/2021','19:18:31',NULL,NULL,'1'),(605,45,1,NULL,2,'asdsda','sdasdasdasd','asdasd','asdasd','asdasdasd','2021-11-14 23:33:48','24/10/2021','19:22:21',NULL,NULL,'1'),(615,NULL,2,NULL,2,'Prueba 5','Prueba 5',NULL,NULL,'Prueba 5','2021-11-14 23:34:48','25/10/2021','16:43:44',NULL,NULL,'1'),(625,NULL,2,NULL,3,'prueba 6 ','prueba 6 ',NULL,NULL,'prueba 6 ','2021-11-14 23:39:48','26/10/2021','11:01:57',NULL,NULL,'1'),(635,NULL,2,NULL,2,'Prueba 10','Prueba 10',NULL,NULL,'Prueba 10','2021-11-14 23:35:48','26/10/2021','11:08:57',NULL,NULL,'1'),(655,195,155,NULL,1,'probando buscar','probandolo','asdasd','asdasd','asdasd',NULL,'27/10/2021','9:40:07',NULL,NULL,'1'),(665,NULL,2,NULL,3,'Probando subida de imagenes','probando subida de imagenes',NULL,NULL,'Lima Lima','2021-11-2 11:55:41','27/10/2021','12:50:23',NULL,NULL,'1'),(675,NULL,2,NULL,1,'Prueba 150','Prueba 150',NULL,'Software','Prueba 150',NULL,'27/10/2021','23:53:58',NULL,NULL,'1'),(685,NULL,2,NULL,1,'prueba','asdasdasd',NULL,NULL,'mi casa',NULL,'28/10/2021','23:09:16',NULL,NULL,'1'),(695,25,155,NULL,1,'mijares navarro tito','mijares navarro tito','mijares navarro tito','mijares navarro tito','mijares navarro tito',NULL,'2021-11-01','16:38:38',NULL,NULL,'1'),(705,35,2,NULL,1,'Nombre Generico 12','Nombre Generico 12','Nombre Generico 12','Nombre Generico 12','Nombre Generico 12',NULL,'2021-11-01','16:45:18',NULL,NULL,'1'),(775,NULL,2,NULL,1,'subiendo foto del front','subiendo foto del front',NULL,'Software','subiendo foto del front',NULL,'3/11/2021','17:33:44',NULL,NULL,'1'),(795,NULL,2,NULL,1,'subiendo foto del front','subiendo foto del front',NULL,'Hardware','subiendo foto del front',NULL,'3/11/2021','17:35:15',NULL,NULL,'1'),(815,NULL,2,NULL,1,'123','123',NULL,'Software','123',NULL,'3/11/2021','22:18:52',NULL,NULL,'1'),(825,NULL,2,NULL,1,'Prueba 5000','Prueba 5000',NULL,'Software','Prueba 5000',NULL,'8/11/2021','17:23:17',NULL,NULL,'1'),(835,NULL,2,NULL,1,'Prueba 789','Prueba 789',NULL,'Software','Prueba 789',NULL,'8/11/2021','17:23:47',NULL,NULL,'1'),(845,NULL,2,NULL,1,'prueba789','prueba789',NULL,'Software','Lima','2021-11-14 23:26:48','14/11/2021','16:18:59',NULL,NULL,'1'),(855,NULL,2,NULL,1,'Prueba 123','Prueba 123',NULL,'Software','Prueba 123',NULL,'14/11/2021','16:24:32',NULL,NULL,'1'),(865,NULL,2,NULL,1,'probando desde aqui','probando desde aqui',NULL,'Software','probando desde aqui',NULL,'14/11/2021','16:28:23',NULL,NULL,'1'),(875,NULL,2,NULL,1,'asd asd asd','asd asd asd',NULL,'Software','asd asd asd',NULL,'14/11/2021','16:30:39',NULL,NULL,'1'),(885,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','16:32:10',NULL,NULL,'1'),(895,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','16:32:11',NULL,NULL,'1'),(905,NULL,2,NULL,1,'asdasdas asdasdas dasdasdasdas','asdasdas asdasdas dasdasdasdas',NULL,'Software','asdasdas asdasdas dasdasdasdas',NULL,'14/11/2021','16:34:41',NULL,NULL,'1'),(915,NULL,2,NULL,1,'asdasd asd asd asd','asdasd asd asd asd',NULL,'Hardware','asdasd asd asd asd',NULL,'14/11/2021','16:37:21',NULL,NULL,'1'),(925,NULL,2,NULL,1,'asda','sdasdasd',NULL,'Software','asdasdasd',NULL,'14/11/2021','16:40:17',NULL,NULL,'1'),(935,NULL,2,NULL,1,'asd asd asd asad asd asd asdsasda s','asd asd asd asad asd asd asdsasda s',NULL,'Hardware','asd asd asd asad asd asd asdsasda s',NULL,'14/11/2021','16:44:27',NULL,NULL,'1'),(945,NULL,2,NULL,1,'sdfsdf','sdfsdfs',NULL,'Hardware','dfsdfsdf',NULL,'14/11/2021','16:49:10',NULL,NULL,'1'),(955,NULL,2,NULL,1,'asadaa asdasd 1233','asadaa asdasd 1233',NULL,'Software','asadaa asdasd 1233',NULL,'14/11/2021','16:51:15',NULL,NULL,'1'),(965,NULL,2,NULL,1,'asdasd','asda',NULL,'Software','sdasdasd',NULL,'14/11/2021','16:51:39',NULL,NULL,'1'),(975,NULL,2,NULL,1,'asda','sdasda',NULL,'Software','sdasdasds',NULL,'14/11/2021','16:53:05',NULL,NULL,'1'),(985,NULL,2,NULL,1,'asdas','dasdasd',NULL,'Software','asdasd',NULL,'14/11/2021','18:11:28',NULL,NULL,'1'),(995,NULL,2,NULL,1,'asdasd','asdasdasd',NULL,'Software','asdasdasd',NULL,'14/11/2021','18:12:59',NULL,NULL,'1'),(1005,NULL,2,NULL,1,'asda','sdasd',NULL,'Software','asdasdasd',NULL,'14/11/2021','18:14:39',NULL,NULL,'1'),(1015,NULL,2,NULL,1,'asda','sdasd',NULL,'Software','asdasd',NULL,'14/11/2021','18:15:51',NULL,NULL,'1'),(1025,NULL,2,NULL,1,'asdas','dasd',NULL,'Hardware','asdasd',NULL,'14/11/2021','18:17:18',NULL,NULL,'1'),(1035,NULL,2,NULL,1,'asdasd','asdasd',NULL,'Software','asdasdasd',NULL,'14/11/2021','18:19:39',NULL,NULL,'1'),(1045,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','18:20:20',NULL,NULL,'1'),(1055,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','18:21:20',NULL,NULL,'1'),(1065,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','18:26:06',NULL,NULL,'1'),(1075,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','18:27:36',NULL,NULL,'1'),(1085,NULL,2,NULL,1,'','',NULL,NULL,'',NULL,'14/11/2021','18:28:26',NULL,NULL,'1'),(1095,NULL,2,NULL,1,'sfsd','fsdfsdf',NULL,'Software','sdfsdfsdf',NULL,'14/11/2021','18:33:47',NULL,NULL,'1'),(1105,NULL,2,NULL,1,'','',NULL,NULL,'','2021-11-14 23:23:48','14/11/2021','18:37:58',NULL,NULL,'1'),(1115,NULL,2,NULL,1,'asdasdas','asdad',NULL,'Software','dasdasdasdasdas','2021-11-14 23:22:48','14/11/2021','18:39:20',NULL,NULL,'1'),(1125,NULL,2,NULL,1,'Probando 123456789','Probando 123456789',NULL,'Software','Probando 123456789','2021-11-2 11:30:58','2021-11-2','11:30:38',NULL,NULL,'1'),(1135,NULL,2,NULL,2,'Probando 123456789 imagen','Probando 123456789 imagen',NULL,'Software','Probando 123456789 imagen','2021-11-2 11:54:10','2021-11-2','11:31:56',NULL,NULL,'1'),(1145,NULL,2,NULL,3,'registro ticket','ayuda con disco solido',NULL,'Hardware','satipo','2021-11-2 12:30:53','2021-11-2','12:26:25',NULL,NULL,'1'),(1155,NULL,2,NULL,3,'Pruebaa','Pruebaa',NULL,'Software','Pruebaa','2021-11-5 17:39:15','2021-11-4','14:15:48',NULL,NULL,'1'),(1175,NULL,535,NULL,1,'Probando desde El fonrt al 100%','Ampletado',NULL,'Software','Micasa en cono norte',NULL,'2021-11-6','19:03:51',NULL,NULL,'1'),(1185,NULL,535,NULL,1,'Probando desde El fonrt al 100% 2','asd',NULL,'Hardware','asdasdasd',NULL,'2021-11-6','19:10:16',NULL,NULL,'1');
/*!40000 ALTER TABLE `sv_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_ticket_history`
--

DROP TABLE IF EXISTS `sv_ticket_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_ticket_history` (
  `TCH_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TCK_ID` int(11) DEFAULT NULL,
  `USR_ID` int(11) DEFAULT NULL,
  `PER_ID` int(11) DEFAULT NULL,
  `STC_ID` int(11) DEFAULT NULL,
  `TCH_HOUR` varchar(45) DEFAULT NULL,
  `TCH_DATE` varchar(45) DEFAULT NULL,
  `TCH_DESCRIPTION` text,
  `TCH_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`TCH_ID`),
  UNIQUE KEY `TCH_ID_UNIQUE` (`TCH_ID`),
  KEY `TCH_USR_ID_idx` (`USR_ID`),
  KEY `TCK_TCH_ID_idx` (`TCK_ID`),
  KEY `TCH_PER_ID_idx` (`PER_ID`),
  KEY `TCH_SCT_ID_idx` (`STC_ID`),
  CONSTRAINT `TCH_PER_ID` FOREIGN KEY (`PER_ID`) REFERENCES `sv_person` (`PER_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `TCH_SCT_ID` FOREIGN KEY (`STC_ID`) REFERENCES `sv_status_ticket` (`STC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `TCH_USR_ID` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `TCK_TCH_ID` FOREIGN KEY (`TCK_ID`) REFERENCES `sv_ticket` (`TCK_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_ticket_history`
--

LOCK TABLES `sv_ticket_history` WRITE;
/*!40000 ALTER TABLE `sv_ticket_history` DISABLE KEYS */;
INSERT INTO `sv_ticket_history` VALUES (5,545,35,1,1,'18:48:24','24/10/2021','Crear ticket','1'),(15,555,35,2,1,'18:53:49','24/10/2021','Crear ticket','1'),(25,565,205,2,2,'18:55:11','24/10/2021','Crear ticket','1'),(35,575,195,2,2,'18:56:40','24/10/2021','Crear ticket','1'),(45,595,195,2,1,'19:18:32','24/10/2021','Crear ticket','1'),(55,605,45,1,2,'19:22:21','24/10/2021','Crear ticket','1'),(65,655,195,155,1,'9:40:08','27/10/2021','Crear ticket','1'),(75,695,25,155,1,'16:38:38','1/11/2021','Crear ticket','1'),(85,705,35,2,1,'16:45:18','1/11/2021','Crear ticket','1');
/*!40000 ALTER TABLE `sv_ticket_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_trademark`
--

DROP TABLE IF EXISTS `sv_trademark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_trademark` (
  `TDK_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TDK_NAME` text,
  `TDK_DESCRIPTION` text,
  `TDK_CREATE_DATE` text,
  `TDK_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`TDK_ID`),
  UNIQUE KEY `TDK_ID_UNIQUE` (`TDK_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_trademark`
--

LOCK TABLES `sv_trademark` WRITE;
/*!40000 ALTER TABLE `sv_trademark` DISABLE KEYS */;
INSERT INTO `sv_trademark` VALUES (1,'Kingston','Kingston','2021-09-08T19:52:14.210Z','1'),(2,'Acer','Acer','2021-09-08T19:52:14.210Z','1'),(3,'HP','HP','2021-09-08T19:52:14.210Z','1'),(4,'Dell','Dell','2021-09-08T19:52:14.210Z','1'),(15,'mi marca','ASDASDSAD','2021-09-09T12:05','1'),(25,'Mi marca','ASDASDASD','2021-09-07T12:05','1'),(35,'Prueba 1 ','Prueba 1 ','23/10/2021 22:16:43','1'),(45,'Prueba 123','Prueba 123','2/11/2021 11:56:06','1'),(55,'Prueba 2','Prueba 2','8/11/2021 17:35:18','1');
/*!40000 ALTER TABLE `sv_trademark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_type_discount`
--

DROP TABLE IF EXISTS `sv_type_discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_type_discount` (
  `TDS_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TDS_NAME` varchar(45) DEFAULT NULL,
  `TDS_DESCRIPTION` varchar(45) DEFAULT NULL,
  `TDS_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`TDS_ID`),
  UNIQUE KEY `TDS_ID_UNIQUE` (`TDS_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_type_discount`
--

LOCK TABLES `sv_type_discount` WRITE;
/*!40000 ALTER TABLE `sv_type_discount` DISABLE KEYS */;
INSERT INTO `sv_type_discount` VALUES (5,'Descuento Primera Armada','Descuento siuu','1');
/*!40000 ALTER TABLE `sv_type_discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_type_ticket`
--

DROP TABLE IF EXISTS `sv_type_ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_type_ticket` (
  `TTC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `TTC_NAME` varchar(45) DEFAULT NULL,
  `TTC_DESCRIPTION` varchar(45) DEFAULT NULL,
  `TTC_DATE_CREATE` varchar(45) DEFAULT NULL,
  `TTC_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`TTC_ID`),
  UNIQUE KEY `TTC_ID_UNIQUE` (`TTC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_type_ticket`
--

LOCK TABLES `sv_type_ticket` WRITE;
/*!40000 ALTER TABLE `sv_type_ticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `sv_type_ticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_user`
--

DROP TABLE IF EXISTS `sv_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_user` (
  `USR_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USR_USER` varchar(45) DEFAULT NULL,
  `USR_PASSWORD` text,
  `USR_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`USR_ID`),
  UNIQUE KEY `LGN_ID_UNIQUE` (`USR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=655 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_user`
--

LOCK TABLES `sv_user` WRITE;
/*!40000 ALTER TABLE `sv_user` DISABLE KEYS */;
INSERT INTO `sv_user` VALUES (5,'user_prueba','123456','1'),(15,'gmalca','nico@1412','1'),(25,'jdiaz','$2b$10$i3vN1qmeEFa94yen7yPma.iUWlx0zRc9sx42cDoMMAI59g11smMsW','1'),(35,'balbornoz','cudesi@1412','1'),(45,'nmesias','cudesi@1412','1'),(55,'nmesias','cudesi@1412','1'),(65,'prueba','$2b$10$i3vN1qmeEFa94yen7yPma.iUWlx0zRc9sx42cDoMMAI59g11smMsW','1'),(75,'cliente','$2b$10$i3vN1qmeEFa94yen7yPma.iUWlx0zRc9sx42cDoMMAI59g11smMsW','1'),(85,'prueba','$2b$10$Zt2IAaFXkmpZA0HNIMdfSOoIXeILF5I75KBIALE9fLi6WbHuWGiFi','1'),(95,'pruebas','$2b$10$ibBhMCu8i7jKFDVkKNeTP.LAeNpPe0snrlsop1oOtuTpaiWaTNPAO','1'),(105,'probando','asdasdasdasdasdsad','1'),(115,'probando','wweweweghgh','1'),(125,'asdasdasd','adasdasdasdas','1'),(135,'PROBANDOUSUARIO','adasdasdasdasd','1'),(145,'asdasda','asdasdasdas','1'),(155,'asdasdas','asdasdasd','1'),(165,'probando','probandosifunciona','1'),(175,'probando','probandouser','1'),(185,'probando','ozxczxc','1'),(195,'probando','probando','1'),(205,'probando','probando','1'),(215,'','','1'),(225,'','','0'),(235,'','','1'),(245,'admin','12345','1'),(265,'admin','12345678','1'),(275,'prueba','cudesi@1412','1'),(285,'prueba','cudesi@1412','1'),(295,'prueba','cudesi@1412','1'),(305,'prueba','cudesi@1412','1'),(315,'prueba','cudesi@1412','1'),(325,'jdiaz','cudesi@1412','1'),(335,'jdiazasd','cudesi@1412','1'),(345,'nickmeza','cudesi@1412','1'),(355,'nickmeza','cudesi@1412','1'),(365,'jdiaz','cudesi@1412','1'),(375,'jdiaz','cudesi@1412','1'),(385,'jdiaz','cudesi@1412','1'),(395,'jdiaz','cudesi@1412','1'),(405,'jdiaz','cudesi@1412','1'),(415,'jdiaz','cudesi@1412','1'),(425,'jdiaz','cudesi@1412','1'),(435,'jdiaz','cudesi@1412','1'),(445,'Probando','asdasd','1'),(455,'nick','$2b$10$i3vN1qmeEFa94yen7yPma.iUWlx0zRc9sx42cDoMMAI59g11smMsW','1'),(465,'cliente','cudesi@1412','1'),(475,'','','1'),(485,'usuario_peru','123456789','1'),(495,'asdasdasd','dasdasdasd','1'),(505,'asdasdasd','asdasdasd','1'),(515,'asdasd','asdasdas','1'),(525,'asdasd','asdasd','1'),(535,'nick_12','123456789','1'),(545,'aasd','assd','1'),(555,'probando','dfdf','1'),(565,'asdasd','asdasd','1'),(575,'sadasd','asdasdas','1'),(585,'sadasd','asdasd','1'),(595,'prueba1','cudesi@1412','1'),(605,'prueba1','cudesi@1412','1'),(615,'prueba789','cudesi','1'),(625,'jdiaz','cudesi@1412','1'),(635,'jdiaz','cudesi@1412','1'),(645,'jdiaz','cudesi@1412','1');
/*!40000 ALTER TABLE `sv_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_user_access`
--

DROP TABLE IF EXISTS `sv_user_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_user_access` (
  `UAC_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ACC_ID` int(11) NOT NULL,
  `USR_ID` int(11) NOT NULL,
  `UAC_TITLE` text,
  `UAC_DESCRIPTION` text,
  `UAC_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`UAC_ID`),
  UNIQUE KEY `UAC_ID_UNIQUE` (`UAC_ID`),
  KEY `fk_sv_user_access_sv_access1_idx` (`ACC_ID`),
  KEY `fk_sv_user_access_sv_user1_idx` (`USR_ID`),
  CONSTRAINT `fk_sv_user_access_sv_access1` FOREIGN KEY (`ACC_ID`) REFERENCES `sv_access` (`ACC_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_user_access_sv_user1` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_user_access`
--

LOCK TABLES `sv_user_access` WRITE;
/*!40000 ALTER TABLE `sv_user_access` DISABLE KEYS */;
INSERT INTO `sv_user_access` VALUES (1,1,25,'TITLE','TITLE','1'),(2,2,25,'TITLE',NULL,'1'),(3,3,25,'TITLE',NULL,'1'),(4,1,15,'TITLE',NULL,'1'),(5,2,15,'TITLE',NULL,'1'),(6,3,15,'TITLE',NULL,'1');
/*!40000 ALTER TABLE `sv_user_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sv_user_rol`
--

DROP TABLE IF EXISTS `sv_user_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sv_user_rol` (
  `URO_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USR_ID` int(11) NOT NULL,
  `ROL_ID` int(11) NOT NULL,
  `URO_STATUS` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`URO_ID`),
  UNIQUE KEY `URO_ID_UNIQUE` (`URO_ID`),
  KEY `fk_sv_user_rol_sv_user1_idx` (`USR_ID`),
  KEY `fk_sv_user_rol_sv_rol1_idx` (`ROL_ID`),
  CONSTRAINT `fk_sv_user_rol_sv_rol1` FOREIGN KEY (`ROL_ID`) REFERENCES `sv_rol` (`ROL_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sv_user_rol_sv_user1` FOREIGN KEY (`USR_ID`) REFERENCES `sv_user` (`USR_ID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=435 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sv_user_rol`
--

LOCK TABLES `sv_user_rol` WRITE;
/*!40000 ALTER TABLE `sv_user_rol` DISABLE KEYS */;
INSERT INTO `sv_user_rol` VALUES (1,25,1,'1'),(2,35,2,'1'),(3,45,3,'1'),(4,15,1,'1'),(5,5,2,'1'),(6,75,4,'1'),(75,195,3,'1'),(85,195,4,'1'),(95,205,3,'1'),(105,205,4,'1'),(115,215,3,'1'),(125,215,4,'1'),(135,225,3,'1'),(145,225,4,'1'),(155,245,1,'1'),(165,355,4,'1'),(175,365,4,'1'),(185,375,4,'1'),(195,385,4,'1'),(205,395,4,'1'),(215,405,4,'1'),(225,415,4,'1'),(235,425,4,'1'),(245,435,4,'1'),(255,445,4,'1'),(265,455,4,'1'),(275,545,1,'1'),(285,545,2,'1'),(295,545,3,'1'),(305,555,1,'1'),(315,555,2,'1'),(325,555,1,'1'),(335,555,2,'1'),(345,565,1,'1'),(355,565,2,'1'),(365,575,1,'1'),(375,575,2,'1'),(385,585,2,'1'),(395,585,1,'1'),(405,585,4,'1'),(415,595,3,'1'),(425,605,3,'1');
/*!40000 ALTER TABLE `sv_user_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'syssales'
--

--
-- Dumping routines for database 'syssales'
--
/*!50003 DROP PROCEDURE IF EXISTS `PR_ALLCLIENTS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_ALLCLIENTS`()
BEGIN
SELECT PE.PER_ID, CL.CLI_ID, PT.PET_NAME, PE.PER_NAME, PE.PER_LASTNAME, PE.PER_TRADENAME, PE.PER_N_PHONE, PE.PER_EMAIL ,PE.PER_DIRECTION
FROM sv_person AS PE, sv_person_type AS PT, sv_client AS CL, sv_group AS GR, sv_clasification AS CA
WHERE CL.PER_ID = PE.PER_ID AND PE.PET_ID = PT.PET_ID AND CL.GRO_ID = GR.GRO_ID AND CL.CLA_ID = CA.CLA_ID ORDER BY CL.CLI_ID ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_CONFIGTEMPLATE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_CONFIGTEMPLATE`(

	IN `templateid` INT

)
BEGIN

UPDATE sv_config SET TEM_ID = templateid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_DETAILPRODUCTWITHDISCOUNT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_DETAILPRODUCTWITHDISCOUNT`(

	IN `cantidad` INT,

	IN `productid` INT





)
BEGIN

	SELECT p.*,if(cantidad<4,pd.PRD_UNIT_PRICE ,pd.PRD_PACKAGE_PRICE) AS PRO_PRICE,

	if(cantidad<4,(pd.PRD_UNIT_PRICE * d.DIS_PERCENTAGE/100),

	(pd.PRD_PACKAGE_PRICE * d.DIS_PERCENTAGE/100)) AS PRO_PRICE_DISCOUNT, pd.PRD_ID

	FROM sv_product_details pd

	INNER JOIN sv_product p ON p.PRO_ID = pd.PRO_ID

	INNER JOIN sv_price_list pl ON pl.PRL_ID = pd.PRL_ID

	LEFT JOIN sv_discount_detail dd ON p.PRO_ID = dd.PRO_ID

	LEFT JOIN sv_discounts d ON dd.DIS_ID = d.DIS_ID 

	WHERE p.PRO_ID=productid AND pl.PRL_STATUS="1" AND d.DIS_STATUS="1";

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_GETCLIENTDATA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_GETCLIENTDATA`(

	IN `iduser` INT

)
BEGIN

SELECT p.PER_ID,c.CLI_ID FROM sv_user u, sv_person p,sv_client c WHERE u.USR_ID= p.USR_ID AND c.PER_ID = p.PER_ID AND u.USR_ID=iduser;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_GETUSER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_GETUSER`(IN idUser INT)
BEGIN
SELECT USR_USER FROM sv_user WHERE USR_ID = idUser;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_GET_ACCESS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_GET_ACCESS`(in user_id int)
BEGIN
select ap.ACC_NAME as parent_name,ap.ACC_URL AS parent_url, a.ACC_NAME, a.ACC_URL FROM sv_user_rol as ur, sv_access_rol as ar, sv_access as a, sv_access as ap where ur.USR_ID = user_id AND ar.ROL_ID = ur.ROL_ID AND a.ACC_ID = ar.ACC_ID AND a.ACC_FATHER = ap.ACC_ID;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_INSERT_PRODUCTO_FROM_ORDER_TO_SALE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_INSERT_PRODUCTO_FROM_ORDER_TO_SALE`(IN ORD_ID_IN INT(11), SALE_ID INT(11))
BEGIN
INSERT INTO sv_sales_description (DIS_ID, SAL_ID, PRD_ID, TSL_ID, SDT_AMOUNT, SDT_SUBTOTAL, SDS_DAYS_TO_SEND, SDS_STATUS) 
SELECT DIS_ID, SALE_ID, PRD_ID, SLT_ID, ODT_AMOUNT, ODT_SUBTOTAL, ODT_DAYS_TO_SENDE, "1" FROM sv_order_details WHERE ORD_ID = ORD_ID_IN ORDER BY ODT_ID ASC ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_KARDEX` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_KARDEX`()
BEGIN



select * from sv_product p, sv_kardex k WHERE p.PRO_ID=k.PRO_ID;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_LASTDOCNUMBER` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_LASTDOCNUMBER`(IN DOC_SERIE_IN VARCHAR(50))
BEGIN

    SELECT  IFNULL((MAX(DOC_NUMBER)+1), 1)  AS DOC_NUMBER

    FROM sv_document

    WHERE DOC_SERIE = DOC_SERIE_IN;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_ONECLIENT` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_ONECLIENT`(IN idcliente INT)
BEGIN
  SELECT PE.PER_ID, CL.CLI_ID, PT.PET_ID, GR.GRO_ID, CA.CLA_ID, PE.PER_NAME, PE.PER_LASTNAME, PE.PER_TRADENAME, PE.PER_EMAIL, 
PE.PER_DNI, PE.PER_RUC, PE.PER_N_PHONE, PE.PER_DIRECTION, PE.PER_DEPARTMENT, PE.PER_PROVINCE, PE.PER_DISTRIC, PE.PER_COUNTRY
FROM sv_person AS PE, sv_person_type AS PT, sv_client AS CL, sv_group AS GR, sv_clasification AS CA
WHERE CL.PER_ID = PE.PER_ID AND PE.PET_ID = PT.PET_ID AND CL.GRO_ID = GR.GRO_ID AND CL.CLA_ID = CA.CLA_ID AND CL.CLI_ID = idcliente ORDER BY CL.CLI_ID ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_ONETICKET` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_ONETICKET`(IN idticket INT)
BEGIN
	SELECT CONCAT(PE.PER_NAME," ",PE.PER_LASTNAME) AS PERSON, TC.STC_ID, TC.TCK_PETITIONER, 
    TC.TCK_DESCRIPTION, TC.TCK_TAG, TC.TCK_SUPPORT_TYPE, TC.STC_ID, TC.USR_ID,
    TC.TCK_FINAL_LOCATION, TC.TCK_REQUEST_DATE, TC.TCK_VIEW_HOUR, TC.TCK_END_HOUR, TC.USR_ID, TC.STC_ID,
    (SELECT IF( (SELECT COUNT(*) FROM sv_evidence WHERE TCK_ID = idticket AND EVI_STATUS = 1) = 0,
    (SELECT EVI_IMAGE FROM sv_evidence WHERE EVI_ID = 1),
    (SELECT EVI_IMAGE FROM sv_evidence WHERE TCK_ID = idticket))) AS IMAGE
    FROM sv_ticket AS TC, sv_person AS PE
    WHERE TC.PER_ID = PE.PER_ID AND TC.TCK_ID = idticket;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_ORDERDETAIL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_ORDERDETAIL`(

	IN `orderid` INT



)
BEGIN

	SELECT p.*, od.*, if(od.ODT_AMOUNT<4,pd.PRD_UNIT_PRICE ,pd.PRD_PACKAGE_PRICE) AS PRO_PRICE,

	if(od.ODT_AMOUNT<4,(pd.PRD_UNIT_PRICE * d.DIS_PERCENTAGE/100),

	(pd.PRD_PACKAGE_PRICE * d.DIS_PERCENTAGE/100)) AS PRO_PRICE_DISCOUNT

	FROM SV_ORDER_DETAILS od

	INNER JOIN sv_product p ON p.PRO_ID = od.PRO_ID

	INNER JOIN sv_product_details pd ON pd.PRO_ID = p.PRO_ID 

	INNER JOIN sv_price_list pl ON pl.PRL_ID = pd.PRL_ID

	LEFT JOIN sv_discounts d ON pd.DIS_ID = d.DIS_ID

	WHERE pl.PRL_STATUS="1" AND od.ORD_ID = orderid;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_PRODUCTBYSEARCH` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_PRODUCTBYSEARCH`(

	IN `nombre` VARCHAR(50)

,

	IN `tipo` INT



)
BEGIN

IF tipo=1 THEN

   SELECT  P.*,pl.PRL_ID, pd.PRD_UNIT_PRICE AS PRO_PRICE,pd.PRD_ID 

FROM sv_product p, sv_product_details pd, sv_price_list pl 

WHERE p.PRO_ID = pd.PRO_ID AND (p.PRO_NAME LIKE CONCAT('%', nombre , '%') or p.PRO_DESCRIPTION LIKE CONCAT('%', nombre , '%') ) 

AND pl.PRL_ID=pd.PRL_ID AND pl.PRL_STATUS="1";

ELSE

SELECT  P.*,pl.PRL_ID, pd.PRD_UNIT_PRICE AS PRO_PRICE,pd.PRD_ID,(pd.PRD_UNIT_PRICE * d.DIS_PERCENTAGE/100) AS PRO_PRICE_DISCOUNT

FROM sv_product p, sv_product_details pd, sv_price_list pl , sv_discount_detail dd, sv_discounts d

WHERE p.PRO_ID = pd.PRO_ID AND (p.PRO_NAME LIKE CONCAT('%', nombre , '%') or p.PRO_DESCRIPTION LIKE CONCAT('%', nombre , '%') ) 

AND pl.PRL_ID=pd.PRL_ID AND pl.PRL_STATUS="1" AND dd.PRO_ID=p.PRO_ID AND d.DIS_ID=dd.DIS_ID AND d.DIS_STATUS="1";

END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_PRODUCTS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_PRODUCTS`(

	IN `idPedido` INT



)
BEGIN



SELECT PR.PRO_ID, PR.PRO_IMAGE AS IMAGE, PR.PRO_NAME AS PRODUCTO, PR.PRO_DESCRIPTION AS DESCRIPCION, 

PRD.PRD_UNIT_PRICE AS PRECIO, ODR.ODT_AMOUNT AS CANTIDAD, ODR.ODT_SUBTOTAL AS SUBTOTAL, 

PR.PRO_CODE, ODR.ODT_DAYS_TO_SENDE

FROM sv_orders AS OD, sv_order_details AS ODR, sv_product AS PR, sv_product_details AS PRD, 

sv_price_list AS PRL

WHERE OD.ORD_ID = ODR.ORD_ID AND ODR.PRO_ID = PR.PRO_ID AND ODR.ORD_ID = idPedido 

AND PRD.PRO_ID=PR.PRO_ID AND PRL.PRL_ID=PRD.PRL_ID  AND PRL.PRL_STATUS="1";



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_REPORT_FOR_WEEK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_REPORT_FOR_WEEK`()
BEGIN
	SELECT TCK_REQUEST_DATE AS NOMBRE,
	SUM(CASE WHEN STC_ID = 1 THEN TCK_STATUS ELSE 0 END) AS NUEVO,
	SUM(CASE WHEN STC_ID = 2 THEN TCK_STATUS ELSE 0 END) AS ABIERTO,
	SUM(CASE WHEN STC_ID = 3 THEN TCK_STATUS ELSE 0 END) AS PENDIENTE,
	SUM(CASE WHEN STC_ID = 4 THEN TCK_STATUS ELSE 0 END) AS CERRADO
	FROM sv_ticket GROUP BY TCK_REQUEST_DATE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_SALE_STATUS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_SALE_STATUS`(in ID_TC int(11),in NUM int(11))
BEGIN

declare  proceso int;
declare estado_venta int(11);
SELECT max(DOC_NUMBER) as MAXIMO INTO proceso FROM sv_document where DCT_ID=ID_TC;

if proceso is null then 
	set estado_venta=1;
else 
  if (num <= proceso) then 
	set estado_venta=proceso + 1;
else 
	set estado_venta = num;
end if;
end if;
select estado_venta;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_STATUSPRL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_STATUSPRL`()
BEGIN

	UPDATE sv_price_list

	SET PRL_STATUS=0;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_TIPONOTACREDITO` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_TIPONOTACREDITO`(in comp varchar(45))
BEGIN
if (comp="boleta") then 
select * from sv_document_type where DCT_ID=75;
else if (comp="factura") then 
select * from sv_document_type where DCT_ID=55;
end if;
end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `PR_UPDATE_STOCK` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`evaremote`@`%` PROCEDURE `PR_UPDATE_STOCK`(in id int,in valor INT, in comp varchar(45) )
BEGIN
declare cantidad int;
select STK_TODAY into cantidad from sv_stock where STK_ID=id;
if (comp="NOTA DE CREDITO") THEN 
set cantidad = cantidad + valor;
else
set cantidad = cantidad - valor;
end if;
update sv_stock set STK_TODAY = cantidad, STK_DATE_UPGRADE = CURDATE() where STK_ID=id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-21 21:33:01
