# Using Dockhero with Heroku Review Apps

Background: you can add Dockhero add-on to your app manifest to have this add-on in your
 Review Apps created automatically by Heroku for each pull request in Github.

## Problem

`dockhero-compose.yml` still needs to be deployed manually


## Solution

This is a proof-of-concept of a buildpack-based Dockhero automatic deployment approach.
It has lots of moving parts and could be turned into a separate buildpack down the road.

1. Create `app.json` in you Github repo to enable Review Apps.
Mention `HEROKU_APP_NAME` as a required env variable - it's required for Dockhero operations.

2. Add three buildpacks to app.json: heroku-buildpack-apt, heroku-buildpack-shell and heroku/nodejs.

3. Create .heroku/run.sh

4. Create Aptfile which instructs Heroku to install docker-ce and docker-compose

5. Create package.json with `dockhero` dependency and `postdeploy` script. This script is launched from `app.json` and performs the actual installation. `CURL_CA_BUNDLE` is set to an empty string there as a workaround for https://github.com/docker/compose/issues/3365

6. Create dockhero-compose.yml, e.g. via `heroku dh:generate helloworld`

## How it works?

`dockhero` npm package provides two binaries: `dh-docker` and `dh-compose`, which are actually just thin wrappers
around `docker` and `docker-compose`. This means we need to pre-install Docker CE too - we do this via Aptfile.

DOCKHERO_HOST environment variable is set by Dockhero addon within 1-2 minutes after add-on provisioning.
In the actual buildpack, we should simulate `heroku dh:wait`, but in this example we just added `sleep 120`.

## Caveats

Be careful with provisioning the app through the pipeline.
The hooks may not run as expected, and Dockhero setup might not be updated.
