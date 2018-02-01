FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json /app
COPY ./package-lock.json /app
RUN npm install --registry=https://registry.npm.taobao.org
COPY ./src /app
USER root
EXPOSE 8080