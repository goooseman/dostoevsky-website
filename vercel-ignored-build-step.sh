#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" != "gh-pages" ]] && [[ "$VERCEL_GIT_COMMIT_REF" != "l10n_develop"  ]] ; then
  # Proceed with the build
  exit 1;

else
  # Don't build
  exit 0;
fi