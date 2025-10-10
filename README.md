# Description

This repository explain the commands to be executed to deploy the infrastructure services used by the System. Exist a folder per service.

## Deploy commands
**In development mode**

We must deploy the business services from locally using the eclipse and visual code enviroments

- Gateway microservice
- Security microservice
- Organization microservice
- Annotation microservice
- Storage microservice
- Job microservice
- Analytics microservice
- Front UI microservice

The infraestructure services will be started from docker-compose like this, with all ports published:

- MongoDB service
- Minio service
- Keycloak service
- PostreSQL Keycloak service

```
$ docker-compose -f docker-compose.dev.yaml up -d
```

To dedeploy a particular service, for example the mongodb service:

```
$ docker-compose -f docker-compose.dev.yaml up -d mongodb
```

**In production mode**

We deploy all services: business and infraestructure from docker-compose like with all ports private except the proxy port:

```
$ ARG_ANGULAR_PROFILES_ACTIVE=build-prod docker-compose up -d --build
```

To dedeploy a particular service, for example the mongodb service:

```
$ ARG_ANGULAR_PROFILES_ACTIVE=build-prod docker-compose up -d --build mongodb
```