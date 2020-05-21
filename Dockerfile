# Use latest Node LTS (Erbium)
FROM node:erbium

# Install Firebase CLI
RUN npm install -g firebase-tools

ENTRYPOINT ["/usr/local/bin/firebase"]
