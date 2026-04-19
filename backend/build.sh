#!/usr/bin/env bash
# chmod +x build.sh
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
python manage.py seed_services
