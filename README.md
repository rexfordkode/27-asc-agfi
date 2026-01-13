# AGFI 3-Day Program Image Gallery

A modern React + TypeScript single-page application showcasing OneDrive images grouped by day. Built with Vite, TailwindCSS, and fully Dockerized for easy deployment.

## Features

- 📸 Image gallery with day-based organization
- 🎨 Responsive design with TailwindCSS
- ⚡ Lightning-fast with Vite
- 🐳 Docker support for containerized deployment
- 🔗 Social media integration

## Quick Start

### Local Development

```bash
# Install dependencies (using pnpm)
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:5173`

### Docker Deployment

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or build manually
docker build -t agfi-gallery .
docker run -p 3000:80 agfi-gallery
```

Visit `http://localhost:3000`

### Docker Commands

```bash
# Build the image
docker build -t agfi-gallery .

# Run container in detached mode
docker run -d -p 3000:80 --name agfi-gallery agfi-gallery

# Run container with custom port
docker run -d -p 8080:80 --name agfi-gallery agfi-gallery

# Stop container
docker stop agfi-gallery

# Start container
docker start agfi-gallery

# Restart container
docker restart agfi-gallery

# View logs
docker logs agfi-gallery

# Follow logs in real-time
docker logs -f agfi-gallery

# Remove container
docker rm agfi-gallery

# Remove image
docker rmi agfi-gallery

# Docker Compose commands
docker-compose up -d          # Start services in background
docker-compose down           # Stop and remove containers
docker-compose logs           # View logs
docker-compose logs -f        # Follow logs
docker-compose restart        # Restart services
docker-compose build          # Rebuild images
docker-compose up --build -d  # Rebuild and start

# Clean up everything
docker-compose down -v        # Stop and remove containers + volumes
docker system prune -a        # Remove all unused images, containers, networks
```

## Configuration

- **Social Links**: Edit `src/constants/social.ts`
- **Images**: Edit `src/data/images.ts`

## Tech Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Docker + Nginx

## Build for Production

```bash
pnpm run build
```

The production-ready files will be in the `dist/` directory.
