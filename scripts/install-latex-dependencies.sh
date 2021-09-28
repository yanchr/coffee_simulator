#!/bin/bash

set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

usage="Usage: ${0} <dependencies-list>"

if [[ "$#" -ne 1 ]]; then
  echo "${usage}"
  exit 1
fi

dependencies_list="$1"

sudo apt-get update && sudo apt-get install -y $(cat "${dependencies_list}")
