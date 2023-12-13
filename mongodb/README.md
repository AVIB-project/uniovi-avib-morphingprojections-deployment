## Description

We will deploy the mongodb database service using a helm chart packaed published in the repo of bitmani. We must to have the bitmani repo installed in our local helm repositories previous to any deployment:

## Installation

Add bitnami repo to our local helm installation:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
```

Check that this repo was added correctly:
```
$ helm repo list
```

We can recover the default **values.yml** file from bitnami mongodb chart package like this:

```
$ helm show values bitnami/mongodb > values.yaml
```

Change some default values in this **values.yml** file created like this:

```
rootPassword: password
usernames: ["admin"]
passwords: ["password"]
databases: ["configuration"]
```

After change the **values.yaml** execute this command to deploy our mongodb release in kubernetes with name **avib-mongodb**:

```
$ helm install avib-mongodb -f values.yaml oci://REGISTRY_NAME/REPOSITORY_NAME/mongodb

where:

REGISTRY_NAME=registry-1.docker.io 
REPOSITORY_NAME=bitnamicharts
```

The deployment chart command finally will be like this:

```
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
```
## Connect to mongodb using kubectl portforward

We can connect to mongodb creating a external temporal proxy portforward using kubectl command like this:

```
$ kubectl port-forward svc/avib-mongodb 27017:27017
```

Test this new proxy using the URI string in MongoDB Compass tool

```
mongodb://root:password@localhost
```

## Connect to mongodb using kubernetes ingress

By default the only TCP connections are under HTTP ports:80 and 443, so we must apply some pataches to the ingress controller to open new TCP port for mongoDB throw ingress, so we must apply some patches to our ingress controller.

Patch the **tcp-service config-map** located in the namespace **ingress-nginx** of the nginx ingress controller to create a port related to mongodb service executing this command:

```
$ kubectl patch configmap tcp-services -n ingress-nginx --patch '{"data":{"27017":"default/avib-mongodb:27017"}}'
```


After apply the patch we can execute this comnmand:
```
$ kubectl get configmap tcp-services -n ingress-nginx -o yaml
```

And see something like this, wher a new data attribute was added to our tcp-service config-map:

```
apiVersion: v1
data:
  "27017": default/avib-mongodb:27017
kind: ConfigMap
metadata:
  annotations:
    kubectl.kubernetes.io/last-applied-configuration: |
      {"apiVersion":"v1","kind":"ConfigMap","metadata":{"annotations":{},"labels":{"addonmanager.kubernetes.io/mode":"EnsureExists","app.kubernetes.io/component":"controller","app.kubernetes.io/instance":"ingress-nginx","app.kubernetes.io/name":"ingress-nginx"},"name":"tcp-services","namespace":"ingress-nginx"}}
  creationTimestamp: "2023-09-14T07:31:41Z"
  labels:
    addonmanager.kubernetes.io/mode: EnsureExists
    app.kubernetes.io/component: controller
    app.kubernetes.io/instance: ingress-nginx
    app.kubernetes.io/name: ingress-nginx
  name: tcp-services
  namespace: ingress-nginx
  resourceVersion: "5629339"
  uid: 7d70734d-6cb1-43c8-853c-a82fb9f59bf8
```

Patch the **nginx ingress controller** to open a TCP port for the previous port created in the config map tcp-service, applying the patch file ingress-nginx-controller-patch.yaml:

```
$ kubectl patch deployment ingress-nginx-controller --patch "$(cat ingress-nginx-controller-patch.yaml)" -n ingress-nginx
```

# Test the ingress connection
We can connect to our mongodb database throw ingress using MongoDB Compass tool and this uri connection string:

```
mongodb://root:passwprd@minikube.io
```

Or simple exexute a telnet to the mongosb default port configured:

![mongo-db-connection](captures/mongo-db-connection.png)

```
$ telnet $(minikube ip) 27017
```

## Links

- [Ingress nginx for TCP and UDP services in Minikube](https://minikube.sigs.k8s.io/docs/tutorials/nginx_tcp_udp_ingress/)

- [Exposing TCP and UDP services in nginx ingress controller](https://kubernetes.github.io/ingress-nginx/user-guide/exposing-tcp-udp-services/)