FROM node
WORKDIR .
COPY package*.json ./
RUN npm install
EXPOSE 4000
CMD ["nodemon", "index"]