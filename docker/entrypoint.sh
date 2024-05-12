#!/bin/bash

npm cache clean --force
npm install -g npm@latest
npm install
# npm run build
npm run dev