# Device Manager App

## Setup
- Install MySql in your system.
- Modify the `./config/config.json` file with the mysql connection parameters.
- Follow the below steps to setup the project
  ```
  npm install
  cd react && npm install
  npm run build && cd ..
  npx sequelize-cli db:create
  npx sequelize-cli db:migrate
  npm start
  ```

  You can access it with  http://localhost:8080