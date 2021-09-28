#!/bin/bash

set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

usage="Usage: ${0} <file> <output-directory> <output-filename>"

if [[ "$#" -ne 3 ]]; then
  echo "${usage}"
  exit 1
fi

file="$1"
output_directory="$2"
output_filename="$3"

function ensure_command_available() {
  local cmd="${1}"
  command -v "${cmd}" >/dev/null 2>&1 || {
    echo >&2 "Script requires '${cmd}' but it's not installed. Aborting."
    exit 1
  }
}

ensure_command_available "latexmk"
mkdir -p "${output_directory}"
latexmk -pdf -output-directory="${output_directory}" -jobname="${output_filename}" -shell-escape "${file}"
