# Description
HAProxy proxy service

## Command executions
Create an auto signed certificates for proxy:

```
$ mkdir haproxy-certs

$ openssl req -x509 -newkey rsa:2048 -nodes \
  -keyout haproxy-certs/key.pem \
  -out haproxy-certs/cert.pem \
  -days 365 \
  -subj "/CN=localhost"

$ cat haproxy-certs/cert.pem haproxy-certs/key.pem > haproxy-certs/haproxy.pem
```