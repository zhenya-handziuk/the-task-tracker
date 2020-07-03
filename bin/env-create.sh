#!/bin/bash

CONF_DIR=.

# Create a random password of length specified by $1
function randpwd()
{
  LENGTH=25
  if [ ! -z "$1" ] && [ $1 -gt 1 ]; then
    LENGTH=$1
  fi
  NUMBYTES=$(echo $LENGTH | awk '{print int($1*1.16)+1}')

  openssl rand -base64 $NUMBYTES | tr -d "=+/" | cut -c1-$LENGTH
}

if [ ! -f "${CONF_DIR}"../.env ]; then
  {
    echo "ENV=${ENV:-development}"
    echo "HOST=${HOST:-http://localhost}"
    echo "PORT=${PORT:-3000}"
    echo "NAME=${NAME:-api}"
    echo "PGHOST=${POSTGRES_HOST:-postgres}"
    echo "PGPORT=${POSTGRES_PORT:-5432}"
    echo "PGUSER=${POSTGRES_USER:-development}"
    echo "PGPASSWORD=${POSTGRES_PASSWORD:-develop}"
    echo "PGDATABASE=${POSTGRES_DB:-tov_development}"
  } >> "${CONF_DIR}"./.env
fi
