-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema sip_dms
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sip_dms
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sip_dms` DEFAULT CHARACTER SET utf8 ;
USE `sip_dms` ;

-- -----------------------------------------------------
-- Table `sip_dms`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sip_dms`.`role` ;

CREATE TABLE IF NOT EXISTS `sip_dms`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(500) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sip_dms`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sip_dms`.`user` ;

CREATE TABLE IF NOT EXISTS `sip_dms`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role_id` INT NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_user_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `sip_dms`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `sip_dms`.`drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sip_dms`.`drink` ;

CREATE TABLE IF NOT EXISTS `sip_dms`.`drink` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sip_dms`.`user_has_drink`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sip_dms`.`user_has_drink` ;

CREATE TABLE IF NOT EXISTS `sip_dms`.`user_has_drink` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `drink_id` INT NOT NULL,
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP NULL,
  `is_deleted` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `fk_user_has_drink_user_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_has_drink_drink1_idx` (`drink_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_drink_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `sip_dms`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_drink_drink1`
    FOREIGN KEY (`drink_id`)
    REFERENCES `sip_dms`.`drink` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `sip_dms`.`role`
-- -----------------------------------------------------
START TRANSACTION;
USE `sip_dms`;
INSERT INTO `sip_dms`.`role` (`id`, `name`, `description`) VALUES (1, 'user', NULL);
INSERT INTO `sip_dms`.`role` (`id`, `name`, `description`) VALUES (2, 'admin', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `sip_dms`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `sip_dms`;
INSERT INTO `sip_dms`.`user` (`id`, `role_id`, `email`, `password`, `create_time`, `update_time`, `is_deleted`) VALUES (1, 1, 'shozib.abbas@siparadigm.com', 'test123', DEFAULT, NULL, DEFAULT);
INSERT INTO `sip_dms`.`user` (`id`, `role_id`, `email`, `password`, `create_time`, `update_time`, `is_deleted`) VALUES (2, 2, 'muhammad.nawaz@siparadigm.com', 'test123', DEFAULT, NULL, DEFAULT);

COMMIT;


-- -----------------------------------------------------
-- Data for table `sip_dms`.`drink`
-- -----------------------------------------------------
START TRANSACTION;
USE `sip_dms`;
INSERT INTO `sip_dms`.`drink` (`id`, `name`) VALUES (1, 'Regular Tea');
INSERT INTO `sip_dms`.`drink` (`id`, `name`) VALUES (2, 'Nestea Cardamom Chai');
INSERT INTO `sip_dms`.`drink` (`id`, `name`) VALUES (3, 'Latté');
INSERT INTO `sip_dms`.`drink` (`id`, `name`) VALUES (4, 'Cappuccino');
INSERT INTO `sip_dms`.`drink` (`id`, `name`) VALUES (5, 'Long Black');
INSERT INTO `sip_dms`.`drink` (`id`, `name`) VALUES (6, 'Espresso');

COMMIT;

