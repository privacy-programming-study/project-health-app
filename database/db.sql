CREATE DATABASE `health-app`;

CREATE TABLE `health-app`.`user_doctor`
(`id`INT NOT NULL AUTO_INCREMENT,
`firstname`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`lastname`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`email`  VARCHAR(255)  NOT  NULL,  
`password`  VARCHAR(255)  NOT  NULL,
`gender`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`birthdate` DATE NULL DEFAULT NULL,
`specialization_type`  VARCHAR(255)  NULL  DEFAULT  NULL, 
`work_address`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`work_city`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`work_zip`  INT  NULL  DEFAULT  NULL,
`role`  VARCHAR(255)  NULL  DEFAULT  NULL,  
PRIMARY  KEY  (`id`))  ENGINE  =  InnoDB;

CREATE  TABLE  `health-app`.`user_patient`  
(  `id`  INT  NOT  NULL  AUTO_INCREMENT,  
`firstname`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`lastname`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`email`  VARCHAR(255)  NOT  NULL,
`password`  VARCHAR(255)  NOT  NULL,  
`gender`  VARCHAR(255)  NULL  DEFAULT  NULL,
`birthdate` DATE NULL DEFAULT NULL,
`address`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`city`  VARCHAR(255)  NULL  DEFAULT  NULL,  
`zip`  INT  NULL  DEFAULT  NULL,  
`insurance_type`  VARCHAR(255)  NULL  DEFAULT  NULL,
`role`  VARCHAR(255)  NULL  DEFAULT  NULL,  
PRIMARY  KEY  (`id`))  ENGINE  =  InnoDB;

CREATE TABLE `health-app`.`appointments` 
( `id` INT NOT NULL AUTO_INCREMENT, 
`user_patient_id` INT NULL DEFAULT NULL, 
`appointment_date` DATE NULL DEFAULT NULL, 
`appointment_time` TIME NULL DEFAULT NULL, 
`appointment_doctor_type` VARCHAR(255) NULL DEFAULT NULL, 
`appointment_doctor_id` INT NULL DEFAULT NULL, 
`appointment_reason` TEXT NULL DEFAULT NULL, 
`appointment_status` VARCHAR(255) NULL DEFAULT NULL,
`patient_name` VARCHAR(255) NULL DEFAULT NULL, 
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`personal_info`
(`id` INT NOT NULL AUTO_INCREMENT,
`patient_id` INT NOT NULL,
`firstname` VARCHAR(255) NULL DEFAULT NULL ,
`lastname` VARCHAR(255) NULL DEFAULT NULL ,
`patient_identifier` VARCHAR(255) NULL DEFAULT NULL ,
`gender` VARCHAR(255) NULL DEFAULT NULL ,
`birthdate` VARCHAR(255) NULL DEFAULT NULL ,
`bloodType` VARCHAR(255) NULL DEFAULT NULL ,
`lastUpdated` VARCHAR(255) NULL DEFAULT NULL ,
`address` VARCHAR(255) NULL DEFAULT NULL ,
`city` VARCHAR(255) NULL DEFAULT NULL ,
`zip` VARCHAR(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`emergency_contact`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`fullname` VARCHAR(255) NULL DEFAULT NULL ,
`relationship` VARCHAR(255) NULL DEFAULT NULL ,
`contactNumber` VARCHAR(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`insurance_info`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`insuranceCarrier` VARCHAR(255) NULL DEFAULT NULL ,
`insurancePlan` VARCHAR(255) NULL DEFAULT NULL ,
`contactNumber` VARCHAR(255) NULL DEFAULT NULL ,
`policyNumber` VARCHAR(255) NULL DEFAULT NULL ,
`groupNumber` VARCHAR(255) NULL DEFAULT NULL ,
`socialSecurityNumber` VARCHAR(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`physician_info`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`name` TEXT NULL DEFAULT NULL ,
`speciality` TEXT NULL DEFAULT NULL ,
`phone` TEXT NULL DEFAULT NULL ,
`address` TEXT NULL DEFAULT NULL ,
`notes` TEXT NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`medical_condition`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`medicalCondition` TEXT NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`allergies`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`allergies` TEXT NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`medication`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`name` VARCHAR(255) NULL DEFAULT NULL ,
`dose` VARCHAR(255) NULL DEFAULT NULL ,
`frequency` VARCHAR(255) NULL DEFAULT NULL ,
`indication` VARCHAR(255) NULL DEFAULT NULL ,
`note` VARCHAR(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`vaccination`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`vaccination` VARCHAR(255) NULL DEFAULT NULL ,
`type` VARCHAR(255) NULL DEFAULT NULL ,
`dateReceived` VARCHAR(255) NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`additional_notes`
(`id` INT NOT NULL AUTO_INCREMENT ,
`patient_id` INT NULL DEFAULT NULL ,
`notes` TEXT NULL DEFAULT NULL ,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE `health-app`.`health_records_permission`
(`id` INT NOT NULL AUTO_INCREMENT ,
`doctor_id` INT NULL DEFAULT NULL ,
`patient_id` INT NULL DEFAULT NULL ,
`permission` BOOLEAN NULL DEFAULT NULL ,
`status`  VARCHAR(255)  NULL  DEFAULT  NULL,
PRIMARY KEY (`id`)) ENGINE = InnoDB;

USE `health-app`;

ALTER TABLE `appointments`
ADD CONSTRAINT `fk_foreign_user_patient_id`
FOREIGN KEY (`user_patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `appointments`
ADD CONSTRAINT `fk_foreign_appointment_doctor_id`
FOREIGN KEY (`appointment_doctor_id`)
REFERENCES `user_doctor`(`id`);

ALTER TABLE `personal_info`
ADD CONSTRAINT `fk_foreign_personal_info_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `emergency_contact`
ADD CONSTRAINT `fk_foreign_emergency_contact_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `insurance_info`
ADD CONSTRAINT `fk_foreign_insurance_info_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `physician_info`
ADD CONSTRAINT `fk_foreign_physician_info_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `medical_condition`
ADD CONSTRAINT `fk_foreign_medical_condition_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `allergies`
ADD CONSTRAINT `fk_foreign_allergies_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `medication`
ADD CONSTRAINT `fk_foreign_medication_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `vaccination`
ADD CONSTRAINT `fk_foreign_vaccination_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `additional_notes`
ADD CONSTRAINT `fk_foreign_additional_notes_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `health_records_permission`
ADD CONSTRAINT `fk_foreign_health_records_permission_patient_id`
FOREIGN KEY (`patient_id`)
REFERENCES `user_patient`(`id`);

ALTER TABLE `health_records_permission`
ADD CONSTRAINT `fk_foreign_health_records_permission_doctor_id`
FOREIGN KEY (`doctor_id`)
REFERENCES `user_doctor`(`id`);

INSERT INTO `user_patient` 
(`id`,
`firstname`,
`lastname`,
`email`,
`password`,
`gender`,
`birthdate`,
`address`,
`city`,
`zip`,
`insurance_type`,
`role`)
VALUES (NULL, NULL, NULL, 'admin@admin.com', '$2a$12$7IYzbaQUp0vxargWU4cMl.tkohpGWgRc4mdV0j7eKpwUwvEYz8uly', NULL, NULL, NULL, NULL, NULL, NULL, 'ADMIN');
