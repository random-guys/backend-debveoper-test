FROM alpine:3.10.1
WORKDIR /app
COPY package*.json ./
RUN apk add --update alpine-sdk nodejs npm python
RUN LD_LIBRARY_PATH=/usr/local/lib64/:$LD_LIBRARY_PATH && export LD_LIBRARY_PATH && npm ci
COPY . .
RUN npm run clean && npm run build
EXPOSE 3000
CMD ["npm", "start",]
