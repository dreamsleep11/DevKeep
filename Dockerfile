FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY ./project/package.json /app
COPY ./project/package-lock.json /app
RUN npm install --registry=https://registry.npm.taobao.org
COPY ./project /app
USER root
EXPOSE 8080