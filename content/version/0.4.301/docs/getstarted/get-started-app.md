---
title: "Deploy your first App"
draft: false
weight: -99
---

## Requirements

- You have a running Root Orchestrator with at least one Cluster Orchestrator registered. 
- You have at least one Worker Node Registered 
- (Optional) If you want the microservices to communicate, you need to have the NetManager installed and properly configured. 
- You can access the APIs at `<root-orch-ip>:10000/api/docs`
- You can access the Dashboard at `http://<root-orch-ip>`

## Your first application using the Dashboard 💻
<a name="your-first-application-💻"></a>

Let's use the dashboard to deploy you first application. 

Navigate to `http://SYSTEM_MANAGER_URL` and login with the default credentials:
-  Username: `Admin`
-  Password: `Admin`

Deactivate the Organization flag for now. *(Not like it is depicted in the reference image)*

![](https://hackmd.io/_uploads/H1-Wncoh2.png)


Add a new application, and specify the app name, namespace, and description. 
**N.b.: Max 30 alphanumeric characters. No symbols.**
![](https://hackmd.io/_uploads/H1HGnqjnh.png)

Then, create a new service using the <img src="https://hackmd.io/_uploads/BkaUb7utp.png" style="width:10em"/> button. 

Fill the form using the following values: 
**N.b.: Max 30 alphanumeric characters. No symbols.**
![image](https://hackmd.io/_uploads/BysAV7uta.png)

```
Service name: nginx
Namespace: test
Virtualization: Container
Memory: 100MB
Vcpus: 1
Port: 80
Code: docker.io/library/nginx:latest
```

Finally, deploy the application using the deploy button.

<p>
<img src="https://hackmd.io/_uploads/rkvdHQdt6.png" style="width:15em"/>
</p>

Check the application status, IP address, and logs.

<p>
<img src="https://hackmd.io/_uploads/r1YoSQdFT.png" style="width:15em"/>
</p>

![image](https://hackmd.io/_uploads/HyX6HmutT.png)

![image](https://hackmd.io/_uploads/Bkh0QmOF6.png)

The Node IP field represents the address where you can reach your service. Let's try to use our browser now to navigate to the IP 131.159.24.51 used by this application. 

![image](https://hackmd.io/_uploads/HkPGUXOt6.png)


### Describe your application using a Dashboard's Service *Deployment Descriptor*  📝

From the dashboard you can create the application graphically as shown previously, or you can describe the services via *deployment descriptor* file. Tis file allow you to submit multiple pre-configured services and once. The *deployment descriptor* file is a simple JSON file that contains the description of the services you want to deploy. Here an example:

```json
{
      "microservices" : [
        {
          "microserviceID": "",
          "microservice_name": "nginx",
          "microservice_namespace": "test",
          "virtualization": "container",
          "cmd": [],
          "memory": 100,
          "vcpus": 1,
          "vgpus": 0,
          "vtpus": 0,
          "bandwidth_in": 0,
          "bandwidth_out": 0,
          "storage": 0,
          "code": "docker.io/library/nginx:latest",
          "state": "",
          "port": "",
          "addresses": {
            "rr_ip": "10.30.55.55"
          },
          "added_files": [],
          "constraints": []
        }
      ]
}

```

for each service, these are the parameters you can set: 
- microservice list, a list of the microservices composing the application. For each microservice the user can specify:
  - microserviceID: leave it empty for new deployments, this is needed only to edit an existing deployment.
  - Fully qualified service name:
    - microservice_name: name of the service **(max 30 alphanumeric characters)**
    - microservice_namespace: namespace of the service, used to reference different deployment of the same service. Examples of namespace name can be `default` or `production` or `test` **(max 30 alphanumeric characters)**
  - virtualization: currently the supported virtualization are `container` or (✨🆕✨) `unikernel`
  - cmd: list of the commands to be executed inside the container at startup or the unikernel parameters
  - environment: list of the environment variables to be set, E.g.: ['VAR=fOO'].
  - vcpu,vgpu,memory: minimum cpu/gpu vcores and memory amount needed to run the container
  - vtpus: currently not implemented
  - code: public link of OCI container image (e.g. `docker.io/library/nginx:latest`) or (✨🆕✨) link to unikernel image in `.tar.gz` format (e.g. `http://<hosting-url-and-port>/nginx_x86.tar.gz`).
  - storage: minimum storage size required (currently the scheduler does not take this value into account)
  - bandwidth_in/out: minimum required bandwidth on the worker node. (currently the scheduler does not take this value into account)
  - port: port mapping for the container in the syntax hostport_1:containerport_1\[/protocol];hostport_2:containerport_2\[/protocol] (default protocol is tcp)
  - addresses: allows to specify a custom ip address to be used to balance the traffic across all the service instances. 
    - rr\_ip: [optional field] This field allows you to setup a custom Round Robin network address to reference all the instances belonging to this service. This address is going to be permanently bounded to the service. The address MUST be in the form `10.30.x.y` and must not collide with any other Instance Address or Service IP in the system, otherwise an error will be returned. If you don't specify a RR_ip and you don't set this field, a new address will be generated by the system.
  - ✨🆕✨ one-shot: using the keyword `"one_shot": true` in the *deployment descriptor* is possible to deploy a one shot service, a service that when terminating with exit status 0 is marked as completed and not re-deployed. 
  - ✨🆕✨ privileged: using the keyword `"privileged": true` in the *deployment descriptor* allows a service to use elevated NodeEngine (containerd) privileges and rights.
  - constraints: array of constraints regarding the service. 
    - type: constraint type
      - `direct`: Send a deployment to a specific cluster and a specific list of eligible nodes. You can specify `"node":"node1;node2;...;noden"` a list of node's hostnames. These are the only eligible worker nodes.  `"cluster":"cluster_name"` The name of the cluster where this service must be scheduled. E.g.:
	```
	"constraints":[
		{
			"type":"direct",
			"node":"xavier1",
			"cluster":"gpu"
		}
	]
	 ```
    
      - `clusters`: Send a deployment to a list of allowed clusters. E.g.:
	```
	"constraints":[
		{
			"type":"clusters",
	      		"allowed": [
	       			"cluster1",	
	 	 			"cluster2"
	      		]
		}
	]
	```

## Deploy your first application using Oak APIs 🚀

As an alternative to the Dashboard, you can use the APIs exposed by the Root Orchestrator to deploy your first application.

First we need an API deployment descriptor, which is a JSON file that describes the application together with all the services you want to deploy. 

**N.b. the application *deployment descriptor* is NOT a service *deployment descriptor*, in fact, the service *deployment descriptor* is included in an application *deployment descriptor*. The former describes a list of applications. Each application contains contains a list of service described by the service *deployment descriptor***

### Application *Deployment Descriptor*

In order to deploy a container an application *deployment descriptor* must be passed to the application create API endpoint. 
This file must descripe all the applications, the service compising these applications and their requirements. 

Here an example of an application *deployment descriptor*.

E.g.: `deploy_curl_application.yaml` 

```json
{
  "sla_version" : "v2.0",
  "customerID" : "Admin",
  "applications" : [
    {
      "applicationID" : "",
      "application_name" : "clientsrvr",
      "application_namespace" : "test",
      "application_desc" : "Simple demo with curl client and Nginx server",
      "microservices" : [
        {
          "microserviceID": "",
          "microservice_name": "curl",
          "microservice_namespace": "test",
          "virtualization": "container",
          "cmd": ["sh", "-c", "curl 10.30.55.55 ; sleep 5"],
          "memory": 100,
          "vcpus": 1,
          "vgpus": 0,
          "vtpus": 0,
          "bandwidth_in": 0,
          "bandwidth_out": 0,
          "storage": 0,
          "code": "docker.io/curlimages/curl:7.82.0",
          "state": "",
          "port": "",
          "added_files": [],
          "constraints":[]
        },
        {
          "microserviceID": "",
          "microservice_name": "nginx",
          "microservice_namespace": "test",
          "virtualization": "container",
          "cmd": [],
          "memory": 100,
          "vcpus": 1,
          "vgpus": 0,
          "vtpus": 0,
          "bandwidth_in": 0,
          "bandwidth_out": 0,
          "storage": 0,
          "code": "docker.io/library/nginx:latest",
          "state": "",
          "port": "80:80/tcp",
          "addresses": {
            "rr_ip": "10.30.55.55"
          },
          "added_files": []
        }
      ]
    }
  ]
}
```

This deployment descriptor example describes one application named *clientsrvr* with the `test` namespace and two microservices:
- nginx server with test namespace, namely `clientsrvr.test.nginx.test`
- curl client with test namespace, namely `clientsrvr.test.curl.test`

This is a detailed description of the deployment descriptor fields currently implemented:
- sla_version: the current version is v0.2
- customerID: id of the user, default is Admin
  - application list, in a single deployment descriptor is possible to define multiple applications, each containing:
    - Fully qualified app name: A fully qualified name in Oakestra is composed of 
        - application_name: unique name representing the application **(max 30 alphanumeric characters)**
        - application_namespace: namespace of the app, used to reference different deployment of the same application. Examples of namespace name can be `default` or `production` or `test` **(max 30 alphanumeric characters)**
        - applicationID: leave it empty for new deployments, this is needed only to edit an existing deployment.  
    - application_desc: Short description of the application
    - microservice list, a list of the microservices composing the application. For each microservice the user can specify:
      - microserviceID: leave it empty for new deployments, this is needed only to edit an existing deployment.
      - Fully qualified service name:
        - microservice_name: name of the service **(max 30 alphanumeric characters)**
        - microservice_namespace: namespace of the service, used to reference different deployment of the same service. Examples of namespace name can be `default` or `production` or `test` **(max 30 alphanumeric characters)**
      - virtualization: currently the supported virtualization are `container` or (✨🆕✨) `unikernel`
      - cmd: list of the commands to be executed inside the container at startup or the unikernel parameters
      - environment: list of the environment variables to be set, E.g.: ['VAR=fOO'].
      - vcpu,vgpu,memory: minimum cpu/gpu vcores and memory amount needed to run the container
      - vtpus: currently not implemented
      - code: public link of OCI container image (e.g. `docker.io/library/nginx:latest`) or (✨🆕✨) link to unikernel image in `.tar.gz` format (e.g. `http://<hosting-url-and-port>/nginx_x86.tar.gz`).
      - storage: minimum storage size required (currently the scheduler does not take this value into account)
      - bandwidth_in/out: minimum required bandwidth on the worker node. (currently the scheduler does not take this value into account)
      - port: port mapping for the container in the syntax hostport_1:containerport_1\[/protocol];hostport_2:containerport_2\[/protocol] (default protocol is tcp)
      - addresses: allows to specify a custom ip address to be used to balance the traffic across all the service instances. 
        - rr\_ip: [optional field] This field allows you to setup a custom Round Robin network address to reference all the instances belonging to this service. This address is going to be permanently bounded to the service. The address MUST be in the form `10.30.x.y` and must not collide with any other Instance Address or Service IP in the system, otherwise an error will be returned. If you don't specify a RR_ip and you don't set this field, a new address will be generated by the system.
      - ✨🆕✨ one-shot: using the keyword `"one_shot": true` in the *deployment descriptor* is possible to deploy a one shot service, a service that when terminating with exit status 0 is marked as completed and not re-deployed. 
      - ✨🆕✨ privileged: using the keyword `"privileged": true` in the *deployment descriptor* allows a service to use elevated NodeEngine (containerd) privileges and rights.
      - constraints: array of constraints regarding the service. 
        - type: constraint type
          - `direct`: Send a deployment to a specific cluster and a specific list of eligible nodes. You can specify `"node":"node1;node2;...;noden"` a list of node's hostnames. These are the only eligible worker nodes.  `"cluster":"cluster_name"` The name of the cluster where this service must be scheduled. E.g.:
		  ```
		  "constraints":[
		  	{
		  		"type":"direct",
		  		"node":"xavier1",
		  		"cluster":"gpu"
		  	}
		  ]
		   ```
        
          - `clusters`: Send a deployment to a list of allowed clusters. E.g.:
		  ```
		  "constraints":[
		  	{
		  		"type":"clusters",
	          		"allowed": [
	           			"cluster1",	
	     	 			"cluster2"
	          		]
		  	}
		  ]
		  ```


### Login to the APIs
After running a cluster you can use the debug OpenAPI page to interact with the apis and use the infrastructure

connect to `<root_orch_ip>:10000/api/docs`

Authenticate using the following procedure:

1. locate the login method and use the try-out button
![try-login](/getstarted/login-try.png)
2. Use the default Admin credentials to login
![execute-login](/getstarted/login-execute.png)
3. Copy the result login token
![token-login](/getstarted/login-token-copy.png)
4. Go to the top of the page and authenticate with this token
![auth-login](/getstarted/authorize.png)
![auth2-login](/getstarted/authorize-2.png)

### Check your Cluster Status
- Use `GET /api/clusters/` to get all the registered clusters.
- Use `GET /api/clusters/active` to get all the clusters currently active and their resources.

### Register an application and the services
After you authenticate with the login function, you can try out to deploy the first application. 

1. Upload the deployment description to the system. You can try using the deployment descriptor above.
![post app](/getstarted/post-app.png)

The response contains the Application id and the id for all the application's services. Now the application and the services are registered to the platform. It's time to deploy the service instances! 

You can always remove or create a new service for the application using the /api/services endpoints

### Deploy an instance of a registered service 

1. Trigger a deployment of a service's instance using `POST /api/service/{serviceid}/instance`

each call to this endpoint generates a new instance of the service

### Monitor the service status

1. With `GET /api/aplications/<userid>` (or simply /api/aplications/ if you're admin) you can check the list of the deployed application.
2. With `GET /api/services/<appid>` you can check the services attached to an application
3. With `GET /api/service/<serviceid>` you can check the status for all the instances of <serviceid>

### Undeploy 

- Use `DELETE /api/service/<serviceid>` to delete all the instances of a service
- Use `DELETE /api/service/<serviceid>/instance/<instance number>` to delete a specific instance of a service
- Use `DELETE /api/application/<appid>` to delete all together an application with all the services and instances

### Check if the deployment succeded

Familiarize yourself with the API and discover for each one of the service the status and the public address.

If both services show the status **ACTIVE** then everything went fine. Otherwise, there might be a configuration issue or a bug. Please debug it with `docker logs system_manager -f --tail=1000` on the root orchestrator, with `docker logs cluster_manager -f --tail=1000` on the cluster orchestrator and checking the logs of the NetManager and NodeEngine. Then please open an issue. 

If both services are ACTIVE, it is time to test the communication. 

Try to reach the nginx server you just deployed reaching: http://<deployment_machine_ip>:6080 If you see the Nginx landing page the deployment succeeded! Hurray! 🎉

If you want to try the semantic addressing, move into the worker node hosting the client and use the following command to log into the container. 

```
sudo ctr -n edge.io task exec --exec-id term1 Client.default.client.default /bin/sh
```

Once we are inside our client, we can curl the Nginx server and check if everything works.

```
curl 10.30.30.30
```  

Note that this address is the one we specified in the Nginx's deployment descriptor. 


### Unikernels Deployment via APIs
It is also possible to use Unikernels by changing the virtulization of the microservice in the *deployment descriptor*

```json
{
	"sla_version": "v2.0",
	"customerID": "Admin",
	"applications": [{
		"applicationID": "",
		"application_name": "nginx",
		"application_namespace": "test",
		"application_desc": "Simple demo of an Nginx server Unikernel",
		"microservices": [{
			"microserviceID": "",
			"microservice_name": "nginx",
			"microservice_namespace": "test",
			"virtualization": "unikernel",
			"cmd": [],
			"memory": 100,
			"vcpus": 1,
			"vgpus": 0,
			"vtpus": 0,
			"bandwidth_in": 0,
			"bandwidth_out": 0,
			"storage": 0,
			"code": "https://github.com/Sabanic-P/app-nginx/releases/download/v1.0/kernel.tar.gz",
			"arch": ["amd64"],
			"state": "",
			"port": "80:80",
			"addresses": {
				"rr_ip": "10.30.30.26"
			},
			"added_files": []
		}]
	}]
}
```
Differences to Container Deployment:
- virtualization: set to unikernel
- code: Specifies a the remote Unikernel accessible via http(s). There can be multiple
        Unikernels in the same string seperated via ",".
- arch: Specifies the architecture of the Unikernel given in code. The order of
        architectures must match the order of Unikernles given via the code field
