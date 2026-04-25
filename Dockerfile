# 1. Switch from Alpine to Playwright's official image
FROM mcr.microsoft.com/playwright:v1.59.1-jammy

# 2. Set environment to development (Tests need devDependencies)
ENV NODE_ENV=development

WORKDIR /usr/src/app

# 3. Copy all package files (handles your multiple package.json setup)
COPY package*.json ./
COPY **/package*.json ./

# 4. Install ALL dependencies (Playwright is a devDependency!)
RUN npm install --silent

# 5. Ensure Chromium is ready
RUN npx playwright install --with-deps chromium

# 6. Copy your code
COPY . .

# 7. Security: Use the pre-existing 'pwuser' instead of 'node'
# Playwright images come with a built-in 'pwuser' for safety
RUN chown -R pwuser /usr/src/app
USER pwuser

EXPOSE 3000

# 8. Command to run your tests
CMD ["npx", "playwright", "test"]
