ARG PHP_VERSION

FROM php:$PHP_VERSION

# Install system dependencies
RUN apt update && apt upgrade -y

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Update APT & Clear cache
RUN apt clean && rm -rf /var/lib/apt/lists/* && apt update
