FROM node:18-alpine as build-stage

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
ADD nuxt-migration /usr/src/app
RUN npx pnpm@8 install --silent

RUN npx pnpm@8 --silent generate

# étape de production
FROM nginx:alpine as production-stage
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
COPY .nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
