# ! Please ensure you call 'npm run pack' before docker build
FROM node:8-alpine
RUN npm install -g pm2
RUN mkdir app
WORKDIR app
ARG APP_NAME
COPY pkg/${APP_NAME}*.tgz .
RUN npm install ${APP_NAME}*.tgz --only=prod
RUN rm ${APP_NAME}*.tgz && \
	rm package-lock.json

WORKDIR /app/node_modules/${APP_NAME}
CMD [ "pm2-runtime", "start", "deployment/ecosystem.config.json", "-i", "max" ]
