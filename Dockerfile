
FROM node:17.4 as build-stage

#set current direc
WORKDIR /app

#copy all file to docker direc
COPY ./ ./
COPY package.json ./
COPY /node_modules/react-scripts/config/webpack.config.js ./tempwebpack.txt
#install  all dependencies
RUN npm i


#npm start
CMD ["npm","start"]

#docker build  -t client_numer .
#docker run -it -p 3000:3000 client_numer