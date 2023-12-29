# Flyway Migration

### 確認MySql連線位置 (預設localhost:3306)
```sh
cat ./conf/flyway.conf 
# flyway.url=jdbc:mysql://host.docker.internal:3306?createDatabaseIfNotExist=true&useSSL=false
```

### INFO
```sh
docker compose run --rm flyway info
```

### MIGRATE
```sh
docker compose run --rm flyway migrate
```

### REPAIR
```sh
docker compose run --rm flyway repair
```

