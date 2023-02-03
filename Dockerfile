FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN rm ./node_modules/@types/express/index.d.ts
COPY node_modules/@types/express/index.d.ts ./node_modules/@types/express/
RUN rm ./src/swagger/swagger.json
COPY src/swagger/swagger.json ./src/swagger/
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY src/swagger/swagger.json ./src/swagger/
RUN npm install --omit=dev
COPY --from=0 /usr/dist/src .
RUN npm install pm2 -g
EXPOSE 4444
CMD ["pm2-runtime","app.js"]