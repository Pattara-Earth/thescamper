FROM mysql:latest

WORKDIR /app

ENV MYSQL_DATABASE inpatient
ENV MYSQL_ROOT_PASSWORD 1150
ENV MYSQL_USER thescamper
ENV MYSQL_PASSWORD 1150
ADD inpatient.sql /docker-entrypoint-initdb.d

EXPOSE 3306