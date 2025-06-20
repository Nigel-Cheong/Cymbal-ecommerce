# Stage 1: Build the React application
# Use a Node.js image with a stable version and Alpine for smaller size
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Declare build arguments for all environment variables used by React
# These will be passed during the docker build command
ARG REACT_APP_APP_ID
# ARG REACT_APP_INITIAL_AUTH_TOKEN
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_STORAGE_BUCKET
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID
# ARG REACT_APP_FIREBASE_MEASUREMENT_ID # Uncomment if you use Analytics

# Set these arguments as environment variables accessible during the build phase.
# React's build process (`npm run build`) reads these `ENV` variables and bakes
# their values into the static JavaScript bundle.
ENV REACT_APP_APP_ID=${REACT_APP_APP_ID}
# ENV REACT_APP_INITIAL_AUTH_TOKEN=${REACT_APP_INITIAL_AUTH_TOKEN}
ENV REACT_APP_FIREBASE_API_KEY=${REACT_APP_FIREBASE_API_KEY}
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=${REACT_APP_FIREBASE_AUTH_DOMAIN}
ENV REACT_APP_FIREBASE_PROJECT_ID=${REACT_APP_FIREBASE_PROJECT_ID}
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=${REACT_APP_FIREBASE_STORAGE_BUCKET}
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}
ENV REACT_APP_FIREBASE_APP_ID=${REACT_APP_FIREBASE_APP_ID}
# ENV REACT_APP_FIREBASE_MEASUREMENT_ID=${REACT_APP_FIREBASE_MEASUREMENT_ID} # Uncomment if you use Analytics

# Copy package.json and yarn.lock (or package-lock.json) first
# This allows Docker to cache the node_modules layer if dependencies haven't changed
COPY package.json yarn.lock ./
# Install project dependencies
RUN yarn install --frozen-lockfile --production=false # --production=false ensures dev dependencies are installed for build

# Copy the rest of the application source code
COPY . .

# Run the React build command to create the optimized static assets
# The output will typically be in a 'build' directory
RUN yarn build

# Stage 2: Serve the static application with Nginx
# Using a lightweight Nginx image for serving the static files
FROM nginx:stable-alpine AS production

# Copy the built React app from the 'build' stage to Nginx's HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80, which Nginx will listen on
EXPOSE 80

# Command to run Nginx in the foreground when the container starts
CMD ["nginx", "-g", "daemon off;"]
