# BFProj
Breakfast Project



What is our spec of our AWS server?
1. distribution: ubuntu 14.04
2. kernel version: 3.13.0-74-generic 

reference: http://www.liquidweb.com/kb/how-to-check-the-kernel-version-in-linux-ubuntu-centos/

How to enable curl on php?
1. sudo apt-get install php5-curl
2. /etc/init.d/apache2 restart
3. sudo reboot

How to change http to https?
1. sudo apt-get update
2. sudo a2enmod ssl #Activate the SSL Module
3. sudo service apache2 restart
4. sudo mkdir /etc/apache2/ssl
5. sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/apache2/ssl/apache.key -out /etc/apache2/ssl/apache.crt
6. sudo vim /etc/apache2/sites-available/default-ssl.conf #edit config file. For more detailed, see the following reference.
7. sudo a2ensite default-ssl.conf
8. sudo service apache2 restart

Please see the reference here: https://www.digitalocean.com/community/tutorials/how-to-create-a-ssl-certificate-on-apache-for-ubuntu-14-04




 
