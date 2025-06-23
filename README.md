# survey-tool

Simple backend server, which handles surveys with following operations

    - Creating a survey
    - Listing surveys
    - Get one survey
    - Post answered survey

Basic usage would be that user creates survey template with question palette. Then existing survey template can be filled and posted with answers. 

All in all, nothing too fancy. <b>Main idea for this project is to study infra setup and management on Docker environment, and this backend server is just something to wrap infra around.</b>

More information about infra technologies and declarations can be found on [infra/](/infra/README.md)

## API documentation

`survey-tool` has implementation for Swagger API documentation, which is generated with `npm run swagger`. When app is running, documentation can be found on: `http://${SURVEY_TOOL_HOST}:${SURVEY_TOOL_PORT}/swagger`

Basicly, most relevant API paths are:

|HTTP Method       |  Path              |                             |
| -------------    | ------------------ | ----------------------------|
|   GET            | api/surveys        | Get all available templates
|   POST           | /api/surveys       | Post new template
|   PUT            | /api/surveys       | Update template
|   GET            | /api/answers/${ID} | Get certain answered template
|   POST           | /api/answers       | Post answered template



## Getting started

This repository has `docker-compose.yml` file, which is orchestrates following containers:

* survey-tool
* Prometheus
* Loki
* Grafana

Before starting, Docker environment must be configured to use Loki as logging driver. First install Loki plugin, with:

`docker plugin install grafana/loki-docker-driver:3.3.2-amd64 --alias loki --grant-all-permissions`

Then, configure `/etc/docker/daemon.json`:

```bash
{
  "log-driver": "loki",
  "log-opts": {
    # Notice that this has to match with configured Loki service on docker-compose.yml
    "loki-url": "http://loki:3100/loki/api/v1/push"
  }
}
```

Then services can be started with:
```bash
# With fedora, otherwise can be docker-compose
docker compose up -d
```


## TODOS to study
### Prometheus

TODO MAYBE: alerts

### Traefik

TODO: Reverse proxy, https

## MAYBE TODOS to study

If there is still time and interest, maybe to study following other technologies:

### Kubernetes / K3s

TODO: Pods, services, ingress


### Splunk

TODO: Database monitoring(?), data management

### Elastic search

TODO: data queries