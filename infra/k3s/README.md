# k3s

Currently this directory contains manifest files for survey-tool (deployment, service, ingress).

To apply all manifests, run:
```bash
# If in this directory
kubectl apply -R -f .
# From project root:
kubectl apply -R -f infra/k3s
```