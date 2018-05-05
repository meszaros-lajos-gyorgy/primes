# Architecture

The whole application is split into a backend and clients. The rule of thumb is that only clients do the calculations. The server stores calculated data, manages connection with clients and distributes tasks to clients. The clients are connected to the backend through websocket.

## Clients

## Server
