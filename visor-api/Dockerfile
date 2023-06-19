FROM node:18.16-alpine3.17
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN echo "MONGODB_URL=mongodb://localhost:27018/visor" > .env
COPY . .
CMD ["npm", "start"]