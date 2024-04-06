FROM node:latest

COPY package*.json ./app/

COPY . ./app/

WORKDIR /app

RUN npm install

EXPOSE 8000

CMD ["npm", "run", "serve"]