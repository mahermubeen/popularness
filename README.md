## Setup Process

- git clone git@github.com:popularness/dev.git
- cd dev/
- sudo cp .env.example .env
- docker compose up -d --build nginx
- docker compose run --rm composer install
- docker compose run --rm artisan key:generate
- docker compose run --rm artisan migrate
- docker compose run --rm artisan db:seed
- docker compose run --rm npm install
- docker compose run --rm npm run watch (Watch Changes)
