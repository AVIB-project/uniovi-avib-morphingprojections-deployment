# Description

Deployment of MongoDB inside kubernetes cluster

# Deployment Steps

**STEP01**: deploy MongoDB using default values

Add Bitnami helm chart repository:

```
$ helm repo add bitnami https://charts.bitnami.com/bitnami
```

Deploy the last MongoDB helm chart inside kubernetes cluster using default values:

```
$ helm install avib-mongodb oci://registry-1.docker.io/bitnamicharts/mongodb
```