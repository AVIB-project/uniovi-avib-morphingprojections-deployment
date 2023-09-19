# Description

This example deploy a standalone Keycloak service using a standalone postgreSQL database on [Minikube][] using [custom values][].

If helm or kubectl timeouts occur, you may consider creating a minikube VM with
more CPU cores or memory allocated.

## Requirements


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
