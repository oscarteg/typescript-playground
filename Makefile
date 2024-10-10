# Makefile for running TypeScript files with Bun

# Default target
.DEFAULT_GOAL := help

# Phony targets
.PHONY: run clean help

# Variables
TS_FILE ?= $(wildcard *.ts)
BUN := bun

# Check if Bun is installed
ifeq ($(shell which $(BUN)),)
$(error "Bun is not installed. Please install Bun first.")
endif

# Run the TypeScript file
run:
	@if [ -z "$(TS_FILE)" ]; then \
		echo "No TypeScript file found. Please specify a file with TS_FILE=your_file.ts"; \
	else \
		echo "Running $(TS_FILE) with Bun..."; \
		$(BUN) run $(TS_FILE); \
	fi

# Clean up any generated files (if necessary)
clean:
	@echo "Cleaning up..."
	@rm -f *.js

# Help target
help:
	@echo "Usage:"
	@echo "  make run [TS_FILE=your_file.ts] - Run a TypeScript file with Bun"
	@echo "  make clean                      - Clean up generated files"
	@echo "  make help                       - Show this help message"
