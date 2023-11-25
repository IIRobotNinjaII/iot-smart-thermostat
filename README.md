# iot-smart-thermostat
WARNING : COPY EACH COMMAND LINE BY LINE
1) Make a new folder called iot , cd into it and git clone this repo
   Make sure you copy the chaincode to the correct place
   
2) Go to fabric-samples/test-network/ and run these commands
   Make sure you copied the go smart contract to the correct folder 
   ```
   		./network.sh up createChannel -c mychannel -ca
    		./network.sh deployCC -ccn basic -ccp ../asset-transfer-basic/chaincode-go/ -ccl go
    		cd addOrg3
    		./addOrg3.sh up -c mychannel -ca
    ```

3) Now let us run the rest api
   Replace the folder in /asset-transfer-basic/rest-api-go with the folder which has been included in this repo
   Then run these
   	```
		run go mod download
		run go run main.go
	```

4) Let us run the blockchain-explorer now
   	```
		cd explorer/
    		sudo cp -r /hyperledger/fabric-samples/test-network/organizations/ . #make sure the path is correct it might be different for you
    		export EXPLORER_CONFIG_FILE_PATH=./config.json
		export EXPLORER_PROFILE_DIR_PATH=./connection-profile
		export FABRIC_CRYPTO_PATH=./organizations
    		docker-compose up -d
	```
5) Setup Cooja
   Run Cooja and open the simulation file included in cooja/
   Create 3 tunslip instances and connect to all 3 border routers
   
6) Run UDP server
   Run these commands
	```
   		cd server-udp/
		npm i
		node server.js
	```
 7) Run Frontend
	```
		cd frontend/
		npm i
		npm start
	```
8) Run Off Chain (Optional)
	```
		cd off-chain/
		npm i
		node off-chain.js
	```
