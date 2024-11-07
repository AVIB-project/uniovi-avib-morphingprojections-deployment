# Description

Deployment of Keycloak inside kubernetes cluster

# Deployment Steps

**STEP01**: deploy keycloak using our custom values

Add bitnami helm chart repository:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
```

Deploy the last keycloak helm chart inside kubernetes cluster using custom values:

```
$ helm install avib-keycloak --values values.yaml oci://registry-1.docker.io/bitnamicharts/keycloak
```
