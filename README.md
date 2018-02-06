# Using Dockhero with Heroku Review Apps

Background: you can add Dockhero add-on to your app manifest to have this add-on in your
 Review Apps created automatically by Heroku for each pull request in Github.

## Problem

`dockhero-compose.yml` still needs to be deployed manually


## Solution

One can run docker-compose from a `postdeploy` hook in `app.json`.
Find more about postdeploy hooks and release phases [here](https://devcenter.heroku.com/articles/release-phase#review-apps-and-postdeploy-script)

To enable that, two things need to be added to the app:
1. `docker-compose` buildpack
2. `dockhero` npm package (which in turn requires `nodejs` buildpack) - v1.0.24 or higher

## Step-by-step guide

1. Create `app.json` in you Github repo to enable Review Apps.
Mention `HEROKU_APP_NAME` as a required env variable - it's [set by Heroku automatically](https://devcenter.heroku.com/articles/github-integration-review-apps#heroku_app_name-and-heroku_parent_app_name) when a review app is created

2. Add two buildpacks to app.json: `https://github.com/dockhero/heroku-buildpack-docker-compose.git` and `heroku/nodejs` (see `app.json` example in the current repo).

3. Create `package.json` with `dockhero` dependency

4. In `package.json`, create a `postdeploy` script with Dockhero deployment command, e.g. `dh-compose up -d`. The usage is very similar to `heroku dh:compose` plugin usage. There are two binaries available: `dh-docker` and `dh-compose`. They wrap `docker` and `docker-compose` standard tools.

5. In `app.json`, create `postdeploy` command - it should execute `yarn postdeploy`

6. Create dockhero-compose.yml, e.g. via `heroku dh:generate helloworld`

## Give it a try

Once the steps above are finished, commit your code to Github and try deploying it using Heroku button.
E.g. the current repo can be deployed to Heroku using this button:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://www.heroku.com/deploy/?template=https://github.com/vovayartsev/sample-review-app)

When the deployment is finished, open your main Heroku app. It will contain a link to a "helloworld" stack deployed via Dockhero.

## Caveats

Be careful with provisioning the app through the pipeline.
The hooks may not run as expected, and Dockhero setup might not be updated.
