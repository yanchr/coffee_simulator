#!/bin/bash

set -o errexit
set -o errtrace
set -o pipefail
set -o nounset

usage="Usage: ${0} <format>"

if [[ "$#" -ne 1 ]]; then
  echo "${usage}"
  exit 1
fi

format="$1"

function ensure_command_available() {
  local cmd="${1}"
  command -v "${cmd}" >/dev/null 2>&1 || {
    echo >&2 "Script requires '${cmd}' but it's not installed. Aborting."
    exit 1
  }
}

scripts_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
workspace="${scripts_directory}/.."

ensure_command_available "git"

base_version="$(cat "${workspace}/VERSION.txt")"
revision_count="$(git rev-list --count HEAD)"
revision="$(git rev-parse --short HEAD)"

case "${format}" in
  "docker")
    echo -n "${base_version}-${revision_count}-${revision}"
    ;;

  "python")
    echo -n "${base_version}+${revision_count}.${revision}"
    ;;

  *)
    echo >&2 "Invalid version format '${format}'. Should be 'docker' or 'python'."
    exit 1
    ;;
esac
