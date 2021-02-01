#!/bin/bash
if [[ "$1" = *"high"* || "$1" = *"critical"* ]]; then
    printf "$1"
    printf "\n\n\033[0;31mDiscovered high or critical vulnerability, audit failed\n\n"
    exit 1
else
    printf "$1"
    exit 0
fi
