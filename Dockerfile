FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

RUN npm install 
# RUN npm install -g sequelize-cli
# RUN npm run migrate
# RUN npm run seed
EXPOSE 8080
CMD ["npm", "run", "start"]