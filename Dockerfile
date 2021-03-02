FROM php:7.1-apache

RUN echo '<Directory "/var/www/html/app">' >> /etc/apache2/apache2.conf
RUN echo 'FallbackResource /index.php' >> /etc/apache2/apache2.conf
RUN echo '</Directory>' >> /etc/apache2/apache2.conf

ENV APACHE_DOCUMENT_ROOT /var/www/html/app

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
#RUN sed -ri -e 's!\b/var/www/\b!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

COPY . /var/www/html/app