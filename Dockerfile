FROM node:carbon

# ixo app directory
WORKDIR /usr/src/ixo

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 46656-46657

CMD [ "npm", "start" ]