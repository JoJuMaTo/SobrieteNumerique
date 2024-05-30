installez et configurez mariadb
dans le dossier du backend, en ligne de commande, tappez
composer install

changer dans .env (à la racine) les logins de la bdd, le port, la version de mariadb: 
DATABASE_URL="mysql://TonUserMariadb:TonMotDePasse@127.0.0.1:3306/sobnum?serverVersion=10.6.16-mariadb&charset=utf8mb4"

php bin/console doctrine:database:create
php bin/console make:migration
php bin/console doctrine:migrations:migrate
et symfony server:start
