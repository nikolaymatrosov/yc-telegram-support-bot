#!/bin/sh
source .env
yc serverless function create --name=$BOT_FUNCTION_NAME
if [[ ! -e "build" ]]; then
    mkdir "build"
fi

cp package.json ./build/package.json
npx tsc --build tsconfig.json

yc serverless function version create \
  --function-name=$BOT_FUNCTION_NAME \
  --runtime nodejs14 \
  --entrypoint botHandler.handler \
  --memory 256m \
  --execution-timeout 30s \
  --source-path ./build\
  --environment BOT_TOKEN=$BOT_TOKEN,BOT_HOOK_PATH=$BOT_HOOK_PATH

