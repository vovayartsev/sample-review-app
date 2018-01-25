#!/bin/bash

# docker-compose is actually just a Python script
# and apt-get installs it into a non-standard location
export PYTHONPATH=/app/.apt/usr/lib/python2.7/dist-packages

echo "Here is my environment:"
env
