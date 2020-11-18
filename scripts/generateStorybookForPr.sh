#!/bin/bash
set -eu

export PULL_REQUEST_ID=$(echo $CIRCLE_PULL_REQUEST | awk -F'/' '{print $NF}')
if [ -z "$PULL_REQUEST_ID" ]; then
  echo "Skip building storybook."
  exit 0
fi

npm run build-storybook

export CIRCLE_REPO_ID=22704738
export GITHUB_API_TOKEN="hogehoge"
export TARGET_BRANCH=$(eval curl "https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/pulls/$PULL_REQUEST_ID?access_token=$GITHUB_API_TOKEN" | jq '.base.ref' | tr -d '"')

git fetch
# git diff origin/${TARGET_BRANCH}...HEAD --name-only | grep 'components.*\(react\|react\.story\.js\)$' | sh ./scripts/postModifiedStories.js
git diff | grep 'components.*\(react\|react\.story\.js\)$' | sh ./scripts/postModifiedStories.js
