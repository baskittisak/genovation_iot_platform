# Genovation | IoT Platform

The IoT Platform is a demo project for IoT device management.

## Installation

For the first time, please ensure the Docker daemon is running, and then run the following command:

```bash
(cd client && npm install) && (cd server && npm install) && docker-compose up --build
```

If it’s not your first time, you can just run the command:

```bash
docker-compose up --build
```

## Usage

You can use the URL link from your container, such as Docker Desktop or OrbStack, to run it directly.

If you want to use the prepared database, you can import the file named *iot_platform.devices.json* into MongoDB directly.

## Localhost Installation and Usage

For the first time, run the following command:

```bash
(cd client && npm install) && (cd server && npm install)
```

Then, please open 2 terminals to run these 2 commands (run them in separate terminals).
```bash
cd client && npm start
```
```bash
cd server && npm start
```

You can use the URL link from your localhost to run it directly.

## Testing

Run the following command
```bash
cd server && npm test
```