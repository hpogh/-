FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf ./*

# Copy HTML files
COPY *.html ./

# Create directories for assets
RUN mkdir -p assets/{css,js}

# Copy CSS
COPY styles.css ./assets/css/

# Copy JS files
COPY firebase-config.js ./assets/js/
COPY authorisation.js ./

# Create empty directories for images if needed
RUN mkdir -p images

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create a simple nginx config if not provided
RUN if [ ! -f /etc/nginx/conf.d/default.conf ]; then \
    echo 'server { \
        listen 80; \
        server_name localhost; \
        root /usr/share/nginx/html; \
        index index.html; \
        location / { \
            try_files \$uri \$uri/ /index.html; \
        } \
    }' > /etc/nginx/conf.d/default.conf; \
    fi

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]