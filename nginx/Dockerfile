FROM nginx:stable-alpine

# generate a ssl certificate 
RUN apk add --no-cache openssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=api.stateflix.com"

# RUN openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
WORKDIR /
# generate ssl using certbot 
# RUN apk add certbot

# remove the default nginx configuration file
RUN rm /etc/nginx/conf.d/*

# copy the custom configuration file from the current directory
COPY ./default.conf /etc/nginx/conf.d/
# RUN certbot certonly --standalone -d api.stateflix.com --agree-tos --email divyanshukaushik44@gmail.com --no-eff-email --non-interactive --keep-until-expiring --expand 
# expose port 80 and 443
EXPOSE 80 443

# run nginx
CMD [ "nginx", "-g", "daemon off;" ]