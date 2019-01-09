# Mixtour

## Pour lancer

```bash
    cd htdocs
    cp .env.test .env
    php bin/console doctrine:database:create
    php bin/console doctrine:migrations:migrate
    php bin/console s:r

    # Dans un autre terminal
    cd GameEngine
    npm install
    npm run start
```
