## Description

Configure ingress rules to redirect external request to our kubernetes services

## Deployment

Deploy ingress for Keycloak Backend service

```
$ kubectl apply -f avib_backend_ingress.yaml
```

Deploy ingress for AVID Backend (Gateway) microservice

```
$ kubectl apply -f avib_backend_ingress.yaml
```

Deploy ingress for AVID Frontend (Portal) microservice

```
$ kubectl apply -f avib_portal_ingress.yaml
```

## Services published

Open Keycloak Backend service

```
https://avispe.edv.uniovi.es
```

Open Keycloak Portal service

```
https://avispe.edv.uniovi.es/morphingprojections-portal
```