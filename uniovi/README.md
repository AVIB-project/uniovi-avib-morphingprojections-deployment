## Description

We will deploy the ingress for all AVIB microservices

## Deployment

Deploy ingress for AVID Backend microservice

```
$ kubectl apply -f ingress-uniovi-backend.yaml
```

Deploy ingress for AVID Backend Annotation microservice

```
$ kubectl apply -f ingress-uniovi-backend-annotation.yaml
```

Deploy ingress for AVID Frontend microservice

```
$ kubectl apply -f ingress-uniovi-frontend.yaml
```