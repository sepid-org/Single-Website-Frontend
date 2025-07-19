FROM node:18-alpine as build
WORKDIR /app

ARG REACT_APP_FILMBAZI_API_URL
ARG REACT_APP_ASHBARIA_API_URL
ARG SENTRY_AUTH_TOKEN
ARG REACT_APP_MEDIA_BASE_URL
ARG REACT_APP_CMS_URL
ARG REACT_APP_PMS_URL
ARG REACT_APP_WMS_URL
ARG REACT_APP_IMS_URL
ARG REACT_APP_BANK_URL
ARG REACT_APP_SENTRY_DNS
ARG REACT_APP_GOOGLE_ANALYTICS_MEASUREMENT_ID
ARG REACT_APP_GTM_ID
ARG REACT_APP_CLARITY_TOKEN
ARG REACT_APP_GOFTINO_TOKEN
ARG REACT_APP_GOOGLE_CLIENT_ID
ARG REACT_APP_APPLICATION_ID
ARG REACT_APP_JAVASCRIPT_KEY
ARG REACT_APP_METABASE_SITE_URL
ARG REACT_APP_METABASE_SECRET_KEY


COPY ./package.json ./
RUN yarn
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN yarn build

# Stage 2: Serve with default nginx config
FROM nginx:stable-alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom nginx.conf (for HTML5 routing (e.g. React Router))
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port and start Nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]