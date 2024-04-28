# Dockerfile
FROM mysql:latest

# Copy the SQL script to initialize the database
COPY ./db.sql /docker-entrypoint-initdb.d/

# Copy the generated dummy data SQL script into the image
COPY ./dummy_data.sql /docker-entrypoint-initdb.d/
