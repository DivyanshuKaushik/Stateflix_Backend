# Base image
FROM node:16-alpine as base

# Build stage
FROM base as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# Final stage
FROM base
WORKDIR /app
COPY package.json yarn.lock ./
COPY --from=builder /app/dist ./
RUN yarn install --only=production
EXPOSE 4000
CMD ["app.js"]

# COPY package*.json ./
# COPY --from=builder /app/dist ./
# RUN npm install --only=production
# EXPOSE 4000
# CMD ["app.js"]