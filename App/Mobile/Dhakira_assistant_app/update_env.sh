#!/bin/bash

# Get the IP address of the host
HOST_IP=$(hostname -I | awk '{print $1}')

# Check if .env file exists
if [ -f .env ]; then
    # Update SERVER_IP value in .env file
    sed -i "s/SERVER_IP=.*/SERVER_IP=\"$HOST_IP:3000\"/" .env
    echo "SERVER_IP updated to $HOST_IP:3000"
else
    echo ".env file not found!"
fi
