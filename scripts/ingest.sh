#!/bin/bash

# Check if environment argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <environment>"
    echo "Example: $0 local"
    echo "         $0 docker"
    exit 1
fi

ENV="$1"
JSON_FILE="microservices/products-service/src/test/resources/test-products.json"

# Set URL based on environment
if [ "$ENV" == "docker" ]; then
    URL="localhost"
else
    URL="localhost:8080"
fi

jq -c '.[]' "$JSON_FILE" | while read -r product; do
    name=$(echo "$product" | jq -r '.name')
    description=$(echo "$product" | jq -r '.description')
    price=$(echo "$product" | jq -r '.price')
    imageUrl=$(echo "$product" | jq -r '.imageUrl')

    curl -s -X POST "http://$URL/products" \
        -H "Content-Type: application/json" \
        -d "{\"name\": \"$name\", \"price\": $price, \"description\": \"$description\", \"imageUrl\": \"$imageUrl\"}" \
        | jq .
done
