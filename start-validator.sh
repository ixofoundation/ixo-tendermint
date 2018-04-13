#!/bin/sh
echo Starting docker container...

echo Please ensure that your privkey.json and genesis.json files are in the same folder as where you are running this script:

BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)

echo Pulling image from Docker HUB...
docker pull 04110000/ixo-tendermint 
echo Creating ixo-tendermint container...
docker create --name ixo-tendermint -p 46657:46657 -p 46661:46661 -p 46660:46660 -p 3000:3000 --env-file /ixo/config/.env -e LOTION_HOME=/ixo/config/.lotion 04110000/ixo-tendermint
sleep 7
echo Transfering key file to docker container...
docker cp ${BASE_DIR}/privkey.json ixo-tendermint:/usr/src/ixo/privkey.json
echo Transfering genesis file to docker container...
docker cp ${BASE_DIR}/genesis.json ixo-tendermint:/usr/src/ixo/genesis.json
echo Starting docker container...
docker start ixo-tendermint
