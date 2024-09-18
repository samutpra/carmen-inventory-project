curl -X POST --location "http://localhost:4000/api/tenants" \ -H "Content-Type: application/json" \ -d '{ "name": "Tenant 1" }'
curl -X POST --location "http://localhost:4000/api/tenants" \ -H "Content-Type: application/json" \ -d '{ "name": "Tenant 2" }'


# Get Tenants
curl -X GET --location "http://localhost:4000/api/tenants" \ -H "Accept: application/json"

# read current tenant


curl -X POST --location "http://localhost:4000/api/currencies" \ -H "Content-Type: application/json" \ -d '{ "name": "Currency 1", "description": "Currency 1 Description", "active": false }'
curl -X POST --location "http://localhost:4000/api/currencies" \ -H "Content-Type: application/json" \ -H "X-Tenant-ID: f4d6f363-e4cf-4bda-af19-f0dc2feada81" \ -d '{ "name": "Currency 2", "description": "Currency 2 Description", "active": true }'
curl -X POST --location "http://localhost:4000/api/currencies" \ -H "Content-Type: application/json" \ -H "X-Tenant-ID: df19344b-1063-4699-809a-e596138b2194" \ -d '{ "name": "Currency 3", "description": "Currency 3 Description", "active": true }'


# Get Currencies
curl -X GET --location "http://localhost:4000/api/currencies" \ -H "Accept: application/json"