FROM nginx:stable-alpine

# generate a ssl certificate 
RUN apk add --no-cache openssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=api.stateflix.com"

# remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/*

# copy the custom configuration file from the current directory
COPY ./default.conf /etc/nginx/conf.d/

# expose port 80 and 443
EXPOSE 80 443

# run nginx
CMD [ "nginx", "-g", "daemon off;" ]