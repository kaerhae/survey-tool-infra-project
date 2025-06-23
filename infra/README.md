# /infra

This directory contains files for following container implementations:

- Prometheus
    - survey-tool has support for `prom-client`, which collects default metrics, and also customized `http_response_times` histogram metrics
    - survey-tool has support for `/metrics` path, which Prometheus service scrapes 
    - `infra/prometheus/prometheus.yml` contains basic global and scraping configurations, mainly defined to target, which matches survey-tool container

- Grafana
  - Container with Grafana UI
    - `infra/grafana/provisioning/datasources` contains a Loki datasource declaration to Loki container
  - Container with Loki
    - survey-tool has support for sending logging data to Loki
    - `infra/grafana/loki/loki.yml` contains pretty basic configuration for Loki
