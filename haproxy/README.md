# Description
HAProxy Deployment and configuration

# Proxy configuration

We can resume the principal topics configured in HAProxy. The proxy have this configuration located in **haproxy.cfg**:

- **Frontend: gsdpi_frontend**:
    - Recover all 80 and 443 requests
    - Redirect all 80 requests to 443 by default
    - Use the certificare created by certbots
    - Has two backend rules: 
        - **mp_application_backend**: redirect all /MP requests to MP traccion Bokeh Application
        - **k8s_backend**: redirect the rest of the request to Ingress Proxy running inside the Kubernetes Cluster

- **Backend: mp_application_backend**:
    - **server mp localhost:5006**:
    The Ip where Bokeh Server is running as a container.

- **Backend: k8s_backend**:
    - **option forwarded proto host by by_port for**:
    This rule activate the terminated port-forward in HAProxy sending the proxy forward headers to Ingress running inside Kubernetes cluster
    - **server k8s 192.168.59.103:80**: this is the public IP of the kubernetes cluster where ingress is listening.

# Deployment steps
 Execute this command
```
docker run -d \
--name server-proxy \
-u root \
-p 80:80 -p 443:443 \
--volume /etc/letsencrypt/live/avispe.edv.uniovi.es/fullchain.pem:/etc/ssl/certs/avib/server.crt \
--volume /etc/letsencrypt/live/avispe.edv.uniovi.es/privkey.pem:/etc/ssl/certs/avib/server.crt.key \
--volume ${PWD}/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg \
--network host \
haproxy:3.0-alpine
```

Some points to be explained:

- **--name k8s-proxy**: is the docker friendly name used to indentify the container
- **-u root**: we must start the container as root permissions because wit need open the priviledge ports: 80 and 443
- **-p 80:80 -p 443:443**: the ports to be open from the HAProxy service
- **--volume ${PWD}/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg**: a bind-mount volumne where exist the HAProxy configuration is located.
- **--volume ${PWD}/certs/avispe.edv.uniovi.es.pem:/etc/ssl/certs/ssl.pem**: a bind-mount volume where the certificate for TLS protocol is located.
- **--network host**: this host is to share the same netowork as host, necesary to have access from NAT router of the University.
- **--restart always**: set restart policy to always. If the service go down or the host is restarted the docker container will start again.
- **haproxy:3.0-alpine**: is the cocker image used implementing the HAProxy service.