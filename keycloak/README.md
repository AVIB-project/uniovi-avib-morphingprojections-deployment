# Description

Deployment of Keycloak inside kubernetes cluster behinde a ingress proxy

# Deployment Steps


**STEP01**: deploy keycloak using our custom values

```
helm install avib-keycloak --values values.yaml oci://registry-1.docker.io/bitnamicharts/keycloak
```

**STEP02**: deploy keycloak ingress entrance
```
kubectl apply -f keycloak-ingress.yaml
```
