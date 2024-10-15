Steps Taken
1. initialize knex and change to ts file then
2. migration script to create model and migrate -  npx knex migrate:make create_users_table --knexfile src/knexfile.ts
3. npx knex migrate:latest --knexfile src/knexfile.ts
4. 