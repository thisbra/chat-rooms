FROM node:18.16-alpine3.17
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN echo "NEXT_PUBLIC_API_URL=http://localhost:3005/api" > .env
RUN echo "NEXT_PUBLIC_SOCK_URL=http://localhost:3005" >> .env
COPY . .
RUN npm install && npm run build
CMD ["npm", "start"]
