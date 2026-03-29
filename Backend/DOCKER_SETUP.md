# Docker Setup Guide for Clinicy Backend

This guide provides comprehensive instructions on how to configure Docker, build images, create containers, and deploy the Clinicy backend application.

## Table of Contents

- [Docker Configuration](#docker-configuration)
- [Building the Dockerfile](#building-the-dockerfile)
- [Docker Image Creation](#docker-image-creation)
- [Docker Container Creation](#docker-container-creation)
- [Building the Application](#building-the-application)
- [Useful Docker Commands](#useful-docker-commands)

---

## Docker Configuration

### Current Dockerfile Overview

The `Dockerfile` in the project is configured as follows:

```dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
```

### Configuration Breakdown

| Component | Description |
|-----------|-------------|
| `FROM node:18-alpine` | Uses Node.js 18 on Alpine Linux (lightweight image ~150MB) |
| `WORKDIR /usr/src/app` | Sets the working directory inside the container |
| `COPY package*.json ./` | Copies package.json and package-lock.json (if exists) |
| `RUN npm install` | Installs dependencies |
| `COPY . .` | Copies entire project into the container |
| `EXPOSE 4000` | Exposes port 4000 (for the Express server) |
| `CMD ["npm", "run", "dev"]` | Default command runs the development server with tsx |

### Port Configuration

- **Container Port**: 4000 (where the app runs inside the container)
- **Application Port**: Defined in your app configuration

### Why Alpine Linux?

- Minimal base image (~5MB)
- Reduced attack surface
- Faster build and deployment times
- Ideal for containerized applications

---

## Building the Dockerfile

Before you can create a docker image, ensure you have Docker installed on your system.

### Prerequisites

- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))
- The project files in your working directory
- Internet connection (for downloading dependencies)

### Step-by-Step Build Process

1. **Navigate to the Backend Folder**
   ```powershell
   cd Backend
   ```

2. **Build the Docker Image**
   ```powershell
   docker build -t clinicy-backend:latest .
   ```

   **Breakdown of the command:**
   - `docker build`: Creates a new Docker image
   - `-t clinicy-backend:latest`: Tags the image with name `clinicy-backend` and version `latest`
   - `.`: Uses the Dockerfile in the current directory

3. **Verify the Build**
   ```powershell
   docker images
   ```
   You should see `clinicy-backend:latest` in the list.

### Build with Custom Tags

To create versioned images:

```powershell
docker build -t clinicy-backend:v1.0 .
```

### Rebuild (Ignore Cache)

If you need to rebuild from scratch:

```powershell
docker build --no-cache -t clinicy-backend:latest .
```

---

## Docker Image Creation

### What is a Docker Image?

A Docker image is a lightweight, standalone, executable package that contains everything needed to run the application (code, runtime, dependencies, etc.).

### Viewing Your Images

```powershell
# List all images
docker images

# List images with specific name
docker images clinicy-backend

# Get detailed information about an image
docker inspect clinicy-backend:latest
```

### Image Size Optimization

Check your image size:

```powershell
docker images --format "table {{.Repository}}\t{{.Size}}"
```

### Creating Multiple Image Versions

```powershell
# Development image
docker build -t clinicy-backend:dev --target development .

# Production image
docker build -t clinicy-backend:prod .

# Tag existing image with new name
docker tag clinicy-backend:latest clinicy-backend:v1.0.0
```

### Pushing Image to Registry (Optional)

To push to Docker Hub or other registries:

```powershell
# Tag the image for your registry
docker tag clinicy-backend:latest your-registry/clinicy-backend:latest

# Push to registry
docker push your-registry/clinicy-backend:latest
```

---

## Docker Container Creation

### Creating and Running a Container

A Docker container is a running instance of a Docker image.

### Basic Container Creation

```powershell
docker run -p 4000:4000 --name clinicy-app clinicy-backend:latest
```

**Breakdown:**
- `docker run`: Creates and starts a new container
- `-p 4000:4000`: Maps port 4000 from host to port 4000 in container
- `--name clinicy-app`: Names the container
- `clinicy-backend:latest`: The image to use

### Running in Detached Mode (Background)

```powershell
docker run -d -p 4000:4000 --name clinicy-app clinicy-backend:latest
```

- `-d`: Runs in detached mode (background)
- Returns a container ID you can use to manage the container

### Running with Volume Mounting (For Development)

```powershell
docker run -d -p 4000:4000 -v C:\path\to\Backend\src:/usr/src/app/src --name clinicy-app clinicy-backend:latest
```

- `-v`: Mounts a volume for live code reloading
- Changes to local files are reflected in the container

### Running with Environment Variables

```powershell
docker run -d -p 4000:4000 --name clinicy-app `
  -e NODE_ENV=development `
  -e PORT=4000 `
  clinicy-backend:latest
```

### Port Mapping Options

```powershell
# Map to different host port
docker run -p 3000:4000 --name clinicy-app clinicy-backend:latest

# Expose multiple ports
docker run -p 4000:4000 -p 9229:9229 --name clinicy-app clinicy-backend:latest
```

### Container Management Commands

```powershell
# List running containers
docker ps

# List all containers (including stopped)
docker ps -a

# Stop a container
docker stop clinicy-app

# Start a stopped container
docker start clinicy-app

# Restart a container
docker restart clinicy-app

# Remove a container
docker rm clinicy-app

# View container logs
docker logs clinicy-app

# Follow logs in real-time
docker logs -f clinicy-app

# Execute command in running container
docker exec -it clinicy-app /bin/sh

# View container resource usage
docker stats clinicy-app
```

---

## Building the Application

### Build Scripts in package.json

The project includes several build and run scripts:

| Script | Command | Purpose |
|--------|---------|---------|
| `build` | `tsc` | Compiles TypeScript to JavaScript |
| `start` | `node dist/index.js` | Runs the compiled app |
| `dev` | `tsx src/index.ts` | Runs in development mode (tsx auto-compilation) |
| `debug` | Node inspector with tsx | Runs with debugging enabled on port 9229 |
| `test` | Compiles and runs Jasmine tests | Runs all tests |
| `startNodemon` | `nodemon` | Runs with nodemon (watches for changes) |

### Building Inside Docker

The Dockerfile automatically handles dependencies via `npm install`, but you can also build locally:

```powershell
# Build TypeScript to JavaScript
npm run build

# This generates a dist/ folder with compiled JavaScript
```

### Building and Running the Docker Container

**Development Mode:**
```powershell
docker build -t clinicy-backend:latest .
docker run -d -p 4000:4000 --name clinicy-app clinicy-backend:latest
```

**Production Mode (with build step):**
```powershell
# Modify Dockerfile CMD to use start instead of dev
docker run -d -p 4000:4000 --name clinicy-app clinicy-backend:latest npm run start
```

### Test Building Inside Container

```powershell
# Run tests inside a new container
docker run --rm clinicy-backend:latest npm run test
```

- `--rm`: Automatically removes the container after execution

---

## Useful Docker Commands

### Image Commands

```powershell
# Remove an image
docker rmi clinicy-backend:latest

# Remove unused images
docker image prune

# Save image to file
docker save clinicy-backend:latest -o clinicy-backend.tar

# Load image from file
docker load -i clinicy-backend.tar
```

### Container Commands

```powershell
# Copy files from container to host
docker cp clinicy-app:/usr/src/app/dist ./dist-backup

# Copy files from host to container
docker cp ./config.json clinicy-app:/usr/src/app/config.json

# Inspect container details
docker inspect clinicy-app

# Get container IP address
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' clinicy-app
```

### Health Checking

```powershell
# Ping the application
curl http://localhost:4000

# Or from PowerShell
Invoke-WebRequest http://localhost:4000
```

### Cleanup Commands

```powershell
# Stop and remove all containers
docker container prune

# Remove all dangling images
docker image prune -a

# Full cleanup (be careful!)
docker system prune -a
```

---

## Quick Reference: Complete Workflow

### 1. Build Image
```powershell
cd Backend
docker build -t clinicy-backend:latest .
```

### 2. Create and Run Container
```powershell
docker run -d -p 4000:4000 --name clinicy-app clinicy-backend:latest
```

### 3. Check Application
```powershell
# View logs
docker logs clinicy-app

# Access the app
curl http://localhost:4000
```

### 4. Stop and Clean Up
```powershell
docker stop clinicy-app
docker rm clinicy-app
```

---

## Troubleshooting

### Container exits immediately
- Check logs: `docker logs clinicy-app`
- Ensure the app doesn't crash on startup

### Port already in use
```powershell
# Use different port
docker run -p 3000:4000 --name clinicy-app clinicy-backend:latest

# Or find and stop the process using port 4000
netstat -ano | findstr :4000
```

### Build fails
```powershell
# Rebuild without cache
docker build --no-cache -t clinicy-backend:latest .
```

### Permission denied
- On Linux/Mac: Use `sudo` or add your user to the docker group
- On Windows: Run PowerShell as Administrator

---

## Additional Resources

- [Docker Official Documentation](https://docs.docker.com/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
- [Alpine Linux for Docker](https://alpinelinux.org/)
- [Docker Hub](https://hub.docker.com/)

