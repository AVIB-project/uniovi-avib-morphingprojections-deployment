default: test

RELEASE := avib-argo
TIMEOUT := 1200s

install:
	helm upgrade --wait --timeout=$(TIMEOUT) --install --values values.yaml $(RELEASE) ../base

test: install
	helm test $(RELEASE)

purge:
	helm del $(RELEASE)
