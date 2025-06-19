# Stage 1: Build the React application
# Use a stable Node.js image for building the React app.
FROM node:18-alpine AS builder

# Set the working directory inside the container.
WORKDIR /app

# Copy package.json and yarn.lock first.
# This allows Docker to cache these layers, speeding up builds if dependencies haven't changed.
COPY package.json yarn.lock ./

# Install project dependencies using Yarn.
RUN yarn install --frozen-lockfile

# Copy the rest of the application source code.
COPY . .

# Build the React application for production using Yarn.
# This command generates the static files in the 'build' directory.
RUN yarn build

# Stage 2: Serve the React application with Nginx
# Use a lightweight Nginx image to serve the static files.
FROM nginx:alpine

# Copy the Nginx configuration file.
# This file is crucial for telling Nginx how to serve your React app,
# especially for handling client-side routing (e.g., with React Router).
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the 'builder' stage into the Nginx public directory.
# The 'build' directory from the previous stage contains all the static assets.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose the port Nginx will listen on. Cloud Run expects applications to listen on PORT 8080.
# However, Nginx by default listens on port 80. The nginx.conf will map this.
EXPOSE 8080

# Command to run Nginx.
# 'daemon off;' keeps Nginx running in the foreground, which is necessary for Docker containers.
CMD ["nginx", "-g", "daemon off;"]
```

**`nginx.conf` (remains the same):**
```nginx
server {
    listen 8080; # Cloud Run expects applications to listen on port 8080
    root /usr/share/nginx/html;
    index index.html index.htm;

    # Try serving static files first. If not found, fall back to index.html.
    # This is essential for client-side routing (e.g., React Router) so that
    # refreshing or direct access to a deep link routes back to your app.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets (images, CSS, JS) for better performance.
    # Adjust max-age as per your caching strategy.
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|woff|woff2|ttf|svg|eot)$ {
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
