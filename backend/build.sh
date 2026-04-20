#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --noinput --clear
python manage.py migrate
python manage.py seed_services
python manage.py seed_core
