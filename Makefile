APP_DIR := mnist-client
NPM := npm --prefix $(APP_DIR)
PORT ?= 5173

.PHONY: install up test build deploy

install:
	$(NPM) install

up: install
	$(NPM) run dev -- --host 0.0.0.0 --port $(PORT)

test: install
	$(NPM) run build

build: install
	$(NPM) run build

deploy: install
	$(NPM) run deploy
