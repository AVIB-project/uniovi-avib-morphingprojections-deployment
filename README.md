# Description

This repository represent the code to deploy the AVIB Architecture Infraestructure Services

# Apache Reverse Prxy Configuration

These are the entrances inside the file **/etc/apache2/sites-available/default-ssl.conf** in

```
...
<IfModule mod_ssl.c>
        <VirtualHost _default_:443>
            # Begin Kubernetes
            <Location "/kubernetes">                        
                Require ip 156.35.152
                ProxyPreserveHost On                    
                ProxyPass http://192.168.49.2
                ProxyPassReverse http://192.168.49.2
            </Location>

            <Location "/iam">
                Require ip 156.35.152
                ProxyPreserveHost On
                ProxyPass http://192.168.49.2
                ProxyPassReverse http://192.168.49.2
            </Location>
        </VirtualHost>
</IfModule>            
# End Kubernetes

...

```

# List of Services

The infraestructure services deployed in the kubernetes cluster are:

- Kubernetes Dashboard Service: [for more details click here](https://dev.azure.com/gsdpi/avib/_wiki/wikis/avib.wiki/29/Kubernetes-Dashboard-Kubernetes-Resources-Visual-Manager)
- Elasticsearch Service: [for more details click here](https://dev.azure.com/gsdpi/avib/_wiki/wikis/avib.wiki/23/Elasticsearch-Configuration-and-Deploy-in-Minikube)
- Argo Workflow Service: [for more details click here](https://dev.azure.com/gsdpi/avib/_wiki/wikis/avib.wiki/25/Argo-Workflows-Service)
- Keycloak with PostgreSQL Service:[for more details click here](https://dev.azure.com/gsdpi/avib/_wiki/wikis/avib.wiki/37/Keycloak-Service)
