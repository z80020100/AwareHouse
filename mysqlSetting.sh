#!/bin/bash

if [[ $#==1 ]];then
	echo "you need to add a parameter to be the password of database,
it will replace for you in the general.php"
fi

cd ./includes
sed -i '' '/^$db/ s/""/"'${1}'"/g' general.php
