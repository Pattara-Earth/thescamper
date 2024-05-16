# MySQL-Front Dump 2.5

# Host: db Database: inpatient
# -------------------------------------------------------
# Server version: 4.0.11-gamma-nt

CREATE DATABASE IF NOT EXISTS `inpatient` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `inpatient`;

SET character_set_results=utf8;
SET character_set_client=utf8;
SET character_set_connection=utf8;

#
# Table structure for table 'providers'
#

CREATE TABLE providers (
    provider_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fname TEXT DEFAULT NULL,
    lname TEXT DEFAULT NULL,
    provider_role VARCHAR(30) DEFAULT NULL
);

#
# Dumping data for table 'providers'
#

INSERT INTO providers (fname, lname, provider_role) VALUES('ศุภณัฐ', 'วงศานุพัทธ์', 'แพทย์');
INSERT INTO providers (fname, lname, provider_role) VALUES('พฤทธิ์', 'เสาวพฤทธิ์', 'แพทย์');
INSERT INTO providers (fname, lname, provider_role) VALUES('ศศิกานต์', 'เลิศพิพัฒน์กิจ', 'พยาบาล');
INSERT INTO providers (fname, lname, provider_role) VALUES('พิมพ์มาดา', 'จิระวัธน์', 'พยาบาล');

#
# Table structure for table 'users'
#

CREATE TABLE users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(100) DEFAULT NULL,
    pass VARCHAR(100) DEFAULT NULL,
    user_role VARCHAR(30) DEFAULT NULL
);

#
# Dumping data for table 'users'
#

INSERT INTO users (email, pass, user_role) VALUES('suphanat.wong@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'แพทย์');
INSERT INTO users (email, pass, user_role) VALUES('upsaowaprut@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'แพทย์');
INSERT INTO users (email, pass, user_role) VALUES('sasapipat@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'พยาบาล');
INSERT INTO users (email, pass, user_role) VALUES('pimmada1415@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'พยาบาล');

#
# Table structure for table 'patient'
#

CREATE TABLE patient (
    patient_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fname TEXT DEFAULT NULL,
    lname TEXT DEFAULT NULL,
    dob DATE DEFAULT NULL,
    sex VARCHAR(10) DEFAULT NULL,
    drug_allergy VARCHAR(255) DEFAULT NULL
);

#
# Dumping data for table 'patient'
#

INSERT INTO patient (fname, lname, dob, sex, drug_allergy) VALUES('เร็น', 'โยเนฮะนะ', '2001-09-24', 'ชาย', 'Amoxycillin (rash)'); 
INSERT INTO patient (fname, lname, dob, sex, drug_allergy) VALUES('ธีรดนย์', 'แก้วนก', '2000-08-15', 'หญิง', '-'); 
INSERT INTO patient (fname, lname, dob, sex, drug_allergy) VALUES('อานนท์', 'แซ่อึ่ง', '1996-07-26', 'ชาย', 'Paracetamol (rash)'); 
INSERT INTO patient (fname, lname, dob, sex, drug_allergy) VALUES('สิรวิชญ์', 'ขันธรักษ์', '1994-05-12', 'หญิง', 'Dicloxacillin (dyspnea)'); 

#
# Table structure for table 'icd10'
#

CREATE TABLE icd10 (
    icd10_id VARCHAR(10) NOT NULL PRIMARY KEY,
    diagnosis VARCHAR(255) DEFAULT NULL
);

#
# Dumping data for table 'icd10'
#

INSERT INTO icd10 VALUES('A90', 'Dengue Fever'); 
INSERT INTO icd10 VALUES('E10', 'Hypertension'); 
INSERT INTO icd10 VALUES('I63', 'Cerebral Infraction (Stroke)'); 
INSERT INTO icd10 VALUES('C15', 'Cancer of Esophagus'); 
INSERT INTO icd10 VALUES('J18', 'Pneumonia'); 

#
# Table structure for table 'admission'
#

CREATE TABLE admission (
    admit_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admit_date DATETIME DEFAULT NULL,
    room_num VARCHAR(5) DEFAULT NULL,
    admit_status VARCHAR(50) DEFAULT NULL,
    diagnosis TEXT DEFAULT NULL,
    icd10_id VARCHAR(10),
    patient_id INT,
    FOREIGN KEY (icd10_id) REFERENCES icd10(icd10_id),
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id)
);

#
# Dumping data for table 'admission'
#

INSERT INTO admission (admit_date, room_num, admit_status, diagnosis, icd10_id, patient_id) VALUES('2024-04-01 19:10:34', 'A001', 'Admit','Covid-19 with Stroke on Tracheostomy','I63', 1); 
INSERT INTO admission (admit_date, room_num, admit_status, diagnosis, icd10_id, patient_id) VALUES('2024-04-02 20:30:20', 'A002', 'Admit','Dengue Fever with Stroke ','I63', 2); 
INSERT INTO admission (admit_date, room_num, admit_status, diagnosis, icd10_id, patient_id) VALUES('2024-04-03 21:21:35', 'A004', 'Discharge','Pneumonia','J18', 3); 
INSERT INTO admission (admit_date, room_num, admit_status, diagnosis, icd10_id, patient_id) VALUES('2024-04-04 22:37:45', 'A003', 'Admit','Cancer of Esophagus on Tracheostomy','C15', 4); 

#
# Table structure for table 'services'
#

CREATE TABLE services (
    service_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    service_time DATETIME DEFAULT NULL,
    service_type VARCHAR(50) DEFAULT NULL,
    servive_name VARCHAR(255) DEFAULT NULL,
    detail TEXT DEFAULT NULL,
    service_status VARCHAR(50),
    provider_id INT, 
    FOREIGN KEY (provider_id) REFERENCES providers(provider_id)
);

#
# Dumping data for table 'services'
#

INSERT INTO services (service_time, service_type, servive_name, detail, service_status, provider_id) VALUES('2024-04-01 19:10:34', 'Medical', 'Call for Help', '','On Process', 3); 
INSERT INTO services (service_time, service_type, servive_name, detail, service_status, provider_id) VALUES('2024-04-02 20:30:20', 'Medical', 'Request for Patient Control Analgesia', 'Morphine (4mg)', 'Done', 1); 
INSERT INTO services (service_time, service_type, servive_name, detail, service_status, provider_id) VALUES('2024-04-03 21:21:35', 'Medical', 'Call for Help', 'Chest Pain', 'Done', 4); 
INSERT INTO services (service_time, service_type, servive_name, detail, service_status, provider_id) VALUES('2024-04-04 22:37:45', 'Medical', 'Request for Patient Control Analgesia', 'Tramol (50mg)', 'Done', 3); 

#
# Table structure for table 'actions'
#
CREATE TABLE actions (
    action_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    action_time DATETIME DEFAULT NULL,
    action_type VARCHAR(50) DEFAULT NULL,
    action_name VARCHAR(255) DEFAULT NULL,
    action_status VARCHAR(50),
    admit_id INT,
    FOREIGN KEY (admit_id) REFERENCES admission(admit_id)
);

#
# Dumping data for table 'actions'
#

INSERT INTO actions (action_time, action_type, action_name, action_status, admit_id) VALUES('2024-04-01 19:10:34', 'Environment', 'Turn off light', 'Done', 1); 
INSERT INTO actions (action_time, action_type, action_name, action_status, admit_id) VALUES('2024-04-02 20:30:20', 'Environment', 'Turn on light', 'On Process', 3); 

#
# Table structure for table 'api_log'
#

CREATE TABLE api_log (
    api_log_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    log_time DATETIME DEFAULT NULL, 
    method VARCHAR(10) DEFAULT NULL,
    url_endpoint VARCHAR(255) DEFAULT NULL,
    log_status VARCHAR(7) DEFAULT NULL,
    response VARCHAR(255) DEFAULT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

#
# Table structure for table 'prediction_log'
#

CREATE TABLE prediction_log (
    pred_log_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    log_time DATETIME DEFAULT NULL,
    inference_time FLOAT DEFAULT NULL,
    logit VARCHAR(50) DEFAULT NULL,
    log_status VARCHAR(7) DEFAULT NULL,
    response VARCHAR(255) DEFAULT NULL,
    user_id INT,
    admit_id INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (admit_id) REFERENCES admission(admit_id)
);

#
# Table structure for table 'admit_service'
#

CREATE TABLE admit_service (
    admit_service_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    admit_id INT, 
    service_id INT,
    FOREIGN KEY (admit_id) REFERENCES admission(admit_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

