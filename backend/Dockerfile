FROM node:alpine
RUN mkdir -p /backend
WORKDIR /backend
COPY  . /backend
# COPY ../frontend /backend/
RUN npm install
EXPOSE 3001
CMD ["npm","start"]