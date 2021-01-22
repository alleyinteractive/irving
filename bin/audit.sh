#!/bin/bash
if [[ "$1" = *"high"* ]]; then
    printf "$1"
    printf "\n\n\033[0;31mDiscovered high vulnerability, audit failed\n\n"
    exit 1
else
    printf "$1"
    exit 0
fi
