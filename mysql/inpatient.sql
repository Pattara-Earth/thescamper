# MySQL-Front Dump 2.5

# Host: inpatient_db Database: inpatient
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
    provider_id VARCHAR(4) NOT NULL PRIMARY KEY,
    fname TEXT DEFAULT NULL,
    lname TEXT DEFAULT NULL,
    provider_role VARCHAR(30) DEFAULT NULL
);

#
# Dumping data for table 'providers'
#

INSERT INTO providers VALUES('0001', 'ศุภณัฐ', 'วงศานุพัทธ์', 'แพทย์');
INSERT INTO providers VALUES('0002', 'พฤทธิ์', 'เสาวพฤทธิ์', 'แพทย์');
INSERT INTO providers VALUES('0003', 'ศศิกานต์', 'เลิศพิพัฒน์กิจ', 'พยาบาล');
INSERT INTO providers VALUES('0004', 'พิมพ์มาดา', 'จิระวัธน์', 'พยาบาล');

#
# Table structure for table 'users'
#

CREATE TABLE users (
    user_id VARCHAR(4) NOT NULL PRIMARY KEY,
    email VARCHAR(100) DEFAULT NULL,
    pass VARCHAR(100) DEFAULT NULL,
    user_role VARCHAR(30) DEFAULT NULL
);

#
# Dumping data for table 'users'
#

INSERT INTO users VALUES('0001', 'suphanat.wong@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'แพทย์');
INSERT INTO users VALUES('0002', 'upsaowaprut@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'แพทย์');
INSERT INTO users VALUES('0003', 'sasapipat@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'พยาบาล');
INSERT INTO users VALUES('0004', 'pimmada1415@gmail.com', '$2b$10$wEZDSW3BvJpNIijwP8kKvehiqVcNj5Rg71QqnStsk7udITiRNEIOq', 'พยาบาล');

#
# Table structure for table 'patient'
#

CREATE TABLE patient (
    patient_id VARCHAR(4) NOT NULL PRIMARY KEY,
    fname TEXT DEFAULT NULL,
    lname TEXT DEFAULT NULL,
    dob DATE DEFAULT NULL,
    sex VARCHAR(10) DEFAULT NULL,
    drug_allergy VARCHAR(255) DEFAULT NULL
);

#
# Dumping data for table 'patient'
#

INSERT INTO patient VALUES('0001', 'เร็น', 'โยเนฮะนะ', '2001-09-24', 'ชาย', 'Amoxycillin (rash)'); 
INSERT INTO patient VALUES('0002', 'เร็น', 'โยเนฮะนะ', '2001-09-24', 'หญิง', '-'); 
INSERT INTO patient VALUES('0003', 'เร็น', 'โยเนฮะนะ', '2001-09-24', 'ชาย', 'Paracetamol (rash)'); 
INSERT INTO patient VALUES('0004', 'เร็น', 'โยเนฮะนะ', '2001-09-24', 'หญิง', 'Dicloxacillin (dyspnea)'); 


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
    admit_id VARCHAR(4) NOT NULL PRIMARY KEY,
    admit_date DATETIME DEFAULT NULL,
    room_num VARCHAR(5) DEFAULT NULL,
    admit_status VARCHAR(50) DEFAULT NULL,
    diagnosis TEXT DEFAULT NULL,
    icd10_id VARCHAR(10),
    patient_id VARCHAR(4),
    FOREIGN KEY (icd10_id) REFERENCES icd10(icd10_id),
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id)
);

#
# Dumping data for table 'admission'
#

INSERT INTO admission VALUES('0001', '2023-10-28 19:30:35', 'A001', 'Admit','Covid-19 with Stroke on Tracheostomy','I63','0001'); 
INSERT INTO admission VALUES('0002', '2023-10-28 19:30:35', 'A001', 'Admit','Dengue Fever with Stroke ','I63','0003'); 
INSERT INTO admission VALUES('0003', '2023-10-28 19:30:35', 'A001', 'Discharge','Pneumonia','J18','0002'); 
INSERT INTO admission VALUES('0004', '2023-10-28 19:30:35', 'A001', 'Admit','Cancer of Esophagus on Tracheostomy','C15','0004'); 

#
# Table structure for table 'services'
#

CREATE TABLE services (
    service_id VARCHAR(4) NOT NULL PRIMARY KEY,
    service_time DATETIME DEFAULT NULL,
    service_type VARCHAR(50) DEFAULT NULL,
    servive_name VARCHAR(255) DEFAULT NULL,
    detail TEXT DEFAULT NULL,
    service_status VARCHAR(50),
    provider_id VARCHAR(4), 
    FOREIGN KEY (provider_id) REFERENCES providers(provider_id)
);

#
# Dumping data for table 'services'
#

INSERT INTO services VALUES('0001', '2023-10-28 19:30:35', 'Medical','Call for Help', '','On Process','0003'); 
INSERT INTO services VALUES('0002', '2023-10-28 19:30:35', 'Medical','Request for Patient Control Analgesia', 'Morphine (4mg)','Done','0001'); 
INSERT INTO services VALUES('0003', '2023-10-28 19:30:35', 'Medical', 'Call for Help', 'Chest Pain', 'Done', '0004'); 
INSERT INTO services VALUES('0004', '2023-10-28 19:30:35', 'Medical', 'Request for Patient Control Analgesia', 'Tramol (50mg)', 'Done', '0003'); 

#
# Table structure for table 'actions'
#
CREATE TABLE actions (
    action_id VARCHAR(4) NOT NULL PRIMARY KEY,
    action_time DATETIME DEFAULT NULL,
    action_type VARCHAR(50) DEFAULT NULL,
    action_name VARCHAR(255) DEFAULT NULL,
    action_status VARCHAR(50),
    admit_id VARCHAR(4),
    FOREIGN KEY (admit_id) REFERENCES admission(admit_id)

);

#
# Dumping data for table 'actions'
#

INSERT INTO actions VALUES('0001', '2023-10-28 19:30:35', 'Environment', 'Turn off light', 'Done', '0001'); 
INSERT INTO actions VALUES('0002', '2023-10-28 19:30:35', 'Environment', 'Turn on light', 'On Process', '0003'); 

#
# Table structure for table 'api_log'
#

CREATE TABLE api_log (
    api_log_id VARCHAR(4) NOT NULL PRIMARY KEY,
    log_time DATETIME DEFAULT NULL, 
    method VARCHAR(10) DEFAULT NULL,
    url_endpoint VARCHAR(255) DEFAULT NULL,
    log_status VARCHAR(7) DEFAULT NULL,
    response VARCHAR(255) DEFAULT NULL,
    user_id VARCHAR(4),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

#
# Table structure for table 'prediction_log'
#

CREATE TABLE prediction_log (
    pred_log_id VARCHAR(4) NOT NULL PRIMARY KEY,
    log_time DATETIME DEFAULT NULL,
    inference_time FLOAT DEFAULT NULL,
    logit VARCHAR(50) DEFAULT NULL,
    log_status VARCHAR(7) DEFAULT NULL,
    response VARCHAR(255) DEFAULT NULL,
    user_id VARCHAR(4),
    admit_id VARCHAR(4),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (admit_id) REFERENCES admission(admit_id)
);

#
# Table structure for table 'admit_service'
#

CREATE TABLE admit_service (
    admit_service_id VARCHAR(4) NOT NULL PRIMARY KEY,
    admit_id VARCHAR(4), 
    service_id VARCHAR(4),
    FOREIGN KEY (admit_id) REFERENCES admission(admit_id),
    FOREIGN KEY (service_id) REFERENCES services(service_id)
);

