ARG PHP_VERSION

FROM php:$PHP_VERSION as base

ENV PROJECT_DIRECTORY=.
ENV SERVER_DIRECTORY=/var/www/popularness

# Copy Whole Directory to the container
COPY ${PROJECT_DIRECTORY} ${SERVER_DIRECTORY}

# Set working directory
WORKDIR ${SERVER_DIRECTORY}

RUN chown -R www-data:www-data ${SERVER_DIRECTORY}
RUN chmod 777 ${SERVER_DIRECTORY}/.env
RUN chmod -R 777 ${SERVER_DIRECTORY}/storage/

# Install system dependencies
RUN apt update && apt upgrade -y && apt install htop -y

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Update APT & Clear cache
RUN apt clean && rm -rf /var/lib/apt/lists/* && apt update

# xdebug
# RUN pecl install xdebug && docker-php-ext-enable xdebug
# RUN cat ./docker/xdebug.ini >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
# RUN touch /var/log/xdebug.log
# RUN CHMOD 777 /var/log/xdebug.log

# RUN CHMOD +x /var/www/popularness/docker/entrypoint.sh

# ENTRYPOINT "docker/entrypoint.sh"
