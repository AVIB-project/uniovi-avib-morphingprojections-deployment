# Description

We will install the mongodb helm chart with these new values

rootPassword: password
usernames: ["admin"]
passwords: ["password"]
databases: ["configuration"]

REGISTRY_NAME=registry-1.docker.io and REPOSITORY_NAME=bitnamicharts

helm install avib-mongodb -f values.yaml oci://REGISTRY_NAME/REPOSITORY_NAME/mongodb

# Installation
$ helm install avib-mongodb -f values.yaml oci://registry-1.docker.io/bitnamicharts/mongodb

Pulled: registry-1.docker.io/bitnamicharts/mongodb:14.4.2
Digest: sha256:f6895b09522a09f5778c1b44eee478550867eb5fde076177aacc7213f3127a4b
NAME: avib-mongodb
LAST DEPLOYED: Tue Dec 12 16:32:39 2023
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
CHART NAME: mongodb
CHART VERSION: 14.4.2
APP VERSION: 7.0.4

** Please be patient while the chart is being deployed **

MongoDB&reg; can be accessed on the following DNS name(s) and ports from within your cluster:

    avib-mongodb.default.svc.cluster.local

To get the root password run:

    export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace default avib-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 -d)

To get the password for "admin" run:

    export MONGODB_PASSWORD=$(kubectl get secret --namespace default avib-mongodb -o jsonpath="{.data.mongodb-passwords}" | base64 -d | awk -F',' '{print $1}')

To connect to your database, create a MongoDB&reg; client container:

    kubectl run --namespace default avib-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:7.0.2-debian-11-r0 --command -- bash

Then, run the following command:
    mongosh admin --host "avib-mongodb" --authenticationDatabase admin -u $MONGODB_ROOT_USER -p $MONGODB_ROOT_PASSWORD

To connect to your database from outside the cluster execute the following commands:

    kubectl port-forward --namespace default svc/avib-mongodb 27017:27017 &
    mongosh --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD
