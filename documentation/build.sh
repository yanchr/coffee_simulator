#!/bin/bash

set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

build_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
output_directory="${build_directory}/out"
build_latex="${build_directory}/../scripts/build-latex.sh"
usage="Usage: ${0} <version>"

if [[ "$#" -ne 1 ]]; then
  echo "${usage}"
  exit 1
fi

version="$1"

cd "${build_directory}"
"${build_latex}" "${build_directory}/documentation.tex" "${output_directory}" "coffee-simulator-documentation-${version}"
