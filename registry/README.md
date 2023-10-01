# Create namespace
$ kubectl create namespace docker-registry

# Create Persistence Volume Claim
Create file registry-pvc.yaml like this:

apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: docker-registry-pv-claim
  namespace: docker-registry
spec:
  accessModes:
    - ReadWriteOnce
  volumeMode: Filesystem
  resources:
    requests:
      storage: 10Gi
  storageClassName: standard

$ kubectl apply -f registry-pvc.yaml

$ kubectl get pvc docker-registry-pv-claim -n docker-registry
NAME              					STATUS   VOLUME		CAPACITY   ACCESS MODES   STORAGECLASS
docker-registry-pv-claim		Bound    ***			60Gi       RWO            csi-cinder-classic

# Generate credentials to access docker Registry

Create file gen-pass.sh

export REGISTRY_USER=admin
export REGISTRY_PASS=registryPass
export DESTINATION_FOLDER=./registry-creds

# Backup credentials to local files (in case you'll forget them later on)
mkdir -p ${DESTINATION_FOLDER}
echo ${REGISTRY_USER} >> ${DESTINATION_FOLDER}/registry-user.txt
echo ${REGISTRY_PASS} >> ${DESTINATION_FOLDER}/registry-pass.txt

docker run --entrypoint htpasswd registry:2.7.0 \
    -Bbn ${REGISTRY_USER} ${REGISTRY_PASS} \
    > ${DESTINATION_FOLDER}/htpasswd

unset REGISTRY_USER REGISTRY_PASS DESTINATION_FOLDER

Execute
$ sh gen-pass.sh

# Install helm repository

$ helm repo add twuni https://helm.twun.io
$ helm repo update

# Define custom helm configurations

Create file registry-chart.yaml:

---
replicaCount: 1
persistence:
  enabled: true
  size: 60Gi
  deleteEnabled: true
  storageClass: standard
  existingClaim: docker-registry-pv-claim
secrets:
  htpasswd: <USER:PASSWORD>

update htpasswd credentials credentials created in previous steps

Create release from chart with custom Configurations
$ helm install -f registry-chart.yaml docker-registry --namespace docker-registry twuni/docker-registry

To update execute
$ helm upgrade -f registry-chart.yaml docker-registry --namespace docker-registry twuni/docker-registry

# Add Ingress entrance (TODO)

# expose default port docker registry
$ kubectl port-forward -n docker-registry service/docker-registry 5000:5000

# check docker registry and get images
$ curl -u admin localhost:5000/v2/_catalog
Enter host password for user 'admin':
{"repositories":[]}

# login docker to docker registry
$ docker login -u $(cat ./registry-creds/registry-user.txt) -p $(cat ./registry-creds/registry-pass.txt) localhost:5000

# Check private docker registry
$ docker pull nginx
$ docker tag nginx localhost:5000/my-nginx
$ docker push localhost:5000/my-nginx

$ curl -u admin --insecure localhost:5000/v2/_catalog
Enter host password for user 'admin':
{"repositories":["my-nginx"]}

# Links

- (Docker Registry in Kubernetes)[https://www.paulsblog.dev/how-to-install-a-private-docker-container-registry-in-kubernetes/]
