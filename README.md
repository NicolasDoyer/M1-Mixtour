# Mixtour

## Prérequis
* php > 7.2
* npm, node

## Pour lancer

```bash
    git clone https://github.com/NicolasDoyer/M1-Mixtour
    cd M1-Mixtour
    cd htdocs
    cp .env.test .env
    vim .env # modifier connectionString et JWT_PASSPHRASE
    mkdir -p config/jwt
    openssl genrsa -out config/jwt/private.pem -aes256 4096  
    openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem
    composer install
    php bin/console doctrine:database:create
    php bin/console doctrine:migrations:migrate
    php bin/console s:r

    # Dans un autre terminal
    cd GameEngine
    npm install
    # pour les tests
    npm run test
    # pour lancer le websockets
    npm run start
```

## Liens utiles
[Users stories](https://drive.google.com/openid=1pVHTe9V02Mw-7iQ8DfbwN2XnPXo0VEcwH6T3nyANlrs)

[Présentation](https://drive.google.com/open?id=17_ik3Aiqxp28KjVqm7ADkCeuyJDFb9Kkz-zV0r7O4Oo)

[Trello](https://drive.google.com/open?id=17_ik3Aiqxp28KjVqm7ADkCeuyJDFb9Kkz-zV0r7O4Oo)