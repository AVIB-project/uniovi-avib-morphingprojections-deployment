# Description

This example deploy a standalone Keycloak service using a standalone postgreSQL database on [Minikube][] using [custom values][].

If helm or kubectl timeouts occur, you may consider creating a minikube VM with
more CPU cores or memory allocated.

## Requirements

Build chart keycloak dependencies executing this command:

```
$ cd ../base
$ helm dependency build
Hang tight while we grab the latest from your chart repositories...
...Successfully got an update from the "nginx-stable" chart repository
...Successfully got an update from the "concourse" chart repository
...Successfully got an update from the "elastic" chart repository
...Successfully got an update from the "argo" chart repository
...Successfully got an update from the "gitlab" chart repository
...Successfully got an update from the "bitnami" chart repository
Update Complete. ⎈Happy Helming!⎈
Saving 2 charts
Downloading postgresql from repo oci://registry-1.docker.io/bitnamicharts
Pulled: registry-1.docker.io/bitnamicharts/postgresql:12.11.1
Digest: sha256:65dea09ba4863236d4a3ad1acdf1c36fef2a9af31e14420e7cefef4fcc2a602f
Downloading common from repo oci://registry-1.docker.io/bitnamicharts
Pulled: registry-1.docker.io/bitnamicharts/common:2.11.0
Digest: sha256:2638866385d838584e5e46adedd8d7b9978299e8d5b94235621d1ee41726ae6f
Deleting outdated charts
```

## Usage

* Deploy Elasticsearch chart with the default values: `make install`

* You can now setup a port forward to load the Keycloak Admin Portal:

```
kubectl port-forward service/avib-keycloak 8080:80
```
## Admin Portal

Access to Admin Portal from this url:

```
http://localhost:8080/admin/master/console/#/avib
```
The default administrator username will define as custom value calles: admin

Get the default administrator password from kubernetes secret called **avib-keycloak**


Credentials will be by defult user /
## Links
  [keycloak Chart](https://artifacthub.io/packages/helm/bitnami/keycloak)
