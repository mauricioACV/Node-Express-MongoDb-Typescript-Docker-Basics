FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN rm ./node_modules/@types/express/index.d.ts
COPY node_modules/@types/express/index.d.ts ./node_modules/@types/express/
RUN npm run build

## this is stage two , where the app actually runs
FROM node:16-alpine
WORKDIR /usr
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/dist/src .
RUN npm install pm2 -g
EXPOSE 4444
CMD ["pm2-runtime","app.js"]