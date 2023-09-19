# Description

This example deploy a Argo Workflows service on [Minikube][] using [custom values][].

If helm or kubectl timeouts occur, you may consider creating a minikube VM with
more CPU cores or memory allocated.

## Requirements


## Usage

* Deploy Argo Workflows chart with the default values: `make install`

* You can now setup a port forward to load the Keycloak Admin Portal:

  ```
  kubectl port-forward service/avib-keycloak 8080:80
  ```

  ## Links
  [keycloak Chart](https://artifacthub.io/packages/helm/bitnami/keycloak)
