FROM node:18.16-alpine3.17
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN echo "MONGODB_URL=mongodb://visor-mongo-1:27017/visor" > .env
COPY . .
CMD ["npm", "start"]