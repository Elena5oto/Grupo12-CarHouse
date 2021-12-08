-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema eduardo_roldan_database
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema eduardo_roldan_database
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `eduardo_roldan_database` DEFAULT CHARACTER SET utf8 ;
USE `eduardo_roldan_database` ;

-- -----------------------------------------------------
-- Table `eduardo_roldan_database`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eduardo_roldan_database`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `password` CHAR(60) NOT NULL,
  `image` VARCHAR(255) NULL DEFAULT 'default-user.png',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduardo_roldan_database`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eduardo_roldan_database`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `price` INT NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `eduardo_roldan_database`.`purchases`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `eduardo_roldan_database`.`purchases` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `id_product` INT NOT NULL,
  `event_date` DATE NOT NULL,
  `purchase_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user_idx` (`id_user` ASC) VISIBLE,
  INDEX `id_product_idx` (`id_product` ASC) VISIBLE,
  UNIQUE INDEX `event_date_UNIQUE` (`event_date` ASC) VISIBLE,
  CONSTRAINT `id_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `eduardo_roldan_database`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `id_product`
    FOREIGN KEY (`id_product`)
    REFERENCES `eduardo_roldan_database`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
