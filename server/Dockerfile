FROM node:22-alpine3.18

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install 

COPY . .

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD ["node", "server.js"]