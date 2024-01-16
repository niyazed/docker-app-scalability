# Scale your app using docker `--scale`
A tiny example of docker application scalability using nginx.

## Without Scaling: 
```
# Running the container:
-------------------------
$ docker compose up
 ✔ Network docker-app-scalability_default  Created                0.2s 
 ✔ Container node_app                      Created                0.0s 
Attaching to node_app
node_app  | Server on port 3000
node_app  | cpus: 12, memory: 16663027712, uptime: 230.44
node_app  | I am sending response from aff5cc4589b5

# Sending request from another terminal:
----------------------------------------
$ curl http://localhost:3000
{"message":"Ok, It works...","hostname":"aff5cc4589b5","cpus":12,"memory":16663027712,"uptime":230.44}
```

## With Scaling:
```
$ docker compose up --scale api=2
[+] Running 3/2
 ✔ Container docker-app-scalability-api-1    Recreated             0.5s 
 ✔ Container docker-app-scalability-api-2    Recreated             10.9s 
 ✔ Container docker-app-scalability-nginx-1  Created               0.0s 
Attaching to docker-app-scalability-api-1, docker-app-scalability-api-2, docker-app-scalability-nginx-1
docker-app-scalability-api-2    | 🚀 @ http://localhost:3000
docker-app-scalability-api-1    | 🚀 @ http://localhost:3000

# Sending request from another terminal:
----------------------------------------
$ curl http://localhost:3000
{"message":"Ok, It works...","hostname":"edd866006535","cpus":12,"memory":16663027712,"uptime":3504.16}
$ curl http://localhost:3000
{"message":"Ok, It works...","hostname":"2ced356183cd","cpus":12,"memory":16663027712,"uptime":3504.68}
```


## Possible Errors:
```
# Error you may encounter:
---------------------------
$ docker compose up --scale api=2
[+] Building 0.0s (0/0)                                                                                                                                                                         
WARNING: The "api" service is using the custom container name "node_app". 
Docker requires each container to have a unique name. 
Remove the custom name to scale the service


# After fixing the container name issue:
---------------------------------------
$ docker compose up --scale api=2
[+] Building 0.0s (0/0)                                docker:default
[+] Running 2/0
 ✔ Container docker-app-scalability-api-2  Created             0.0s 
 ✔ Container node_app                      Recreated           0.0s 
Attaching to docker-app-scalability-api-1, docker-app-scalability-api-2
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:3000 -> 0.0.0.0:0: listen tcp 0.0.0.0:3000: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
```

## HTTPS with Caddy:
- Install Caddy
- Replace your domain in `Caddyfile`
- Run this command: `sudo caddy run`

## Reference
- https://www.youtube.com/watch?v=9aOpRhm33oM
