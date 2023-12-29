# tsoa express


## Prerequisite

* install npm & node
* mysql & redis server
> default mysql url mysql://root:123456@localhost:3306/tsoa_express
> default redis url redis://localhost:6379

## 1. Use flyway migrate database


```bash
cd ./flyway
docker compose run --rm flyway baseline
docker compose run --rm flyway migrate
```
## 2. Start tsoa express

```bash
cd ./app
npm i
npm run build
npm run start
```