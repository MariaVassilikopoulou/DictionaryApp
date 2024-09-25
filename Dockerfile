FROM node:16

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Install the 'serve' package globally
RUN npm install -g serve

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "dist"]
