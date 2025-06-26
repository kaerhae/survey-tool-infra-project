#!/bin/bash

#########################################################
#
#   On development, survey-tool is only used from local 
#   registry, since image will not be published. So there 
#   is no useful reason to push it to Docker hub. 
#
#   This script provides a way to build local
#   image and push it to k3s image registry.
#########################################################

VERSION=$1
IMAGE=kaerhae/survey-tool:$VERSION

function usage {
    echo "usage: build-and-push-image-to-k3s.sh ARG"
    echo "  ARG:    Image version e.g. 0.0.1"      
}

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root, because k3s might require it." 
   exit 1
fi

if [[ -z $VERSION ]]; then
    echo "Please provide version number as argument."
    usage
    exit 1
fi

docker build -t $IMAGE .

docker save $IMAGE | k3s ctr image import -



