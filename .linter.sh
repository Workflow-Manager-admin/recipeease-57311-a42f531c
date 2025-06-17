#!/bin/bash
cd /home/kavia/workspace/code-generation/recipeease-57311-a42f531c/recipeeas_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

