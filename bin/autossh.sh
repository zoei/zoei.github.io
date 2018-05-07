#!/bin/bash

# it's usually a good idea to exit upon error
set -e

# your connection parameters
user=root
server=zoei.cc
remotePort=18010
localPort=18010

# some stuff autossh needs to know
AUTOSSH_SERVER_ALIVE_INTERVAL=30
AUTOSSH_SERVER_ALIVE_COUNT=2
export AUTOSSH_POLL=30
export AUTOSSH_GATETIME=0
export AUTOSSH_LOGFILE="/tmp/autossh.log"

# clean up log file on start
touch "${AUTOSSH_LOGFILE}"
rm "${AUTOSSH_LOGFILE}" || true

# autossh -f -M 0 \
#   -o "ExitOnForwardFailure yes" \
#   -o "ServerAliveInterval ${AUTOSSH_SERVER_ALIVE_INTERVAL}" \
#   -o "ServerAliveCountMax ${AUTOSSH_SERVER_ALIVE_COUNT}" \
#   -A ${user}@${server} \
#   -R ${remotePort}:localhost:${localPort}
autossh -M 0 -f \
  -o "ExitOnForwardFailure yes" \
  -o "ServerAliveInterval ${AUTOSSH_SERVER_ALIVE_INTERVAL}" \
  -o "ServerAliveCountMax ${AUTOSSH_SERVER_ALIVE_COUNT}" \
  -A ${user}@${server} \
  -NR ${remotePort}:localhost:${localPort}