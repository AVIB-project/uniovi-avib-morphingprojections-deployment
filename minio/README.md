# Description

Deployment of Minio inside kubernetes cluster

# Deployment Steps

**STEP01**: deploy keycloak using our custom values

Add minio helm chart repository:

```
$ helm repo add minio-operator https://operator.min.io
```

Deploy the last minio operator helm chart inside kubernetes cluster using default values:

```
$ helm install avib-minio-operator --namespace minio-operator --create-namespace minio-operator/operator
```
