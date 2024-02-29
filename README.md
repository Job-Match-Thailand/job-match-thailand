# job-match-thailand

1. Run database via `docker-compose -f docker-compose.database.yml`
2. Run database migration tool (Liquibase) `docker-compose -f docker-compose.liquibase.yml up`
3. Run migration `docker exec -it <4prefix-liquibase-container-id> bash && liquibase update`