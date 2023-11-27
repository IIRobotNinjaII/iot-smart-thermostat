# iot-smart-thermostat
WARNING : COPY EACH COMMAND LINE BY LINE
1) Make a new folder called iot , cd into it and git clone this repo
   Make sure you copy the chaincode to the correct place
   
2) Go to fabric-samples/test-network/ and run these commands
   Make sure you copied the go smart contract to the correct folder 
   ```
   ./network.sh down
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
   docker-compose down
   export EXPLORER_CONFIG_FILE_PATH=./config.json
   export EXPLORER_PROFILE_DIR_PATH=./connection-profile
   export FABRIC_CRYPTO_PATH=/home/devika/hyp/fabric-samples/test-network/organizations #make sure this is set correctly
   filename=$(find $FABRIC_CRYPTO_PATH/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/  -type f -name '*sk')
   base_filename=$(basename "$filename")
   sed -i 's|/tmp/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/\*sk|/tmp/crypto/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp/keystore/'"$base_filename"'|' ./connection-profile/test-network.json
   docker-compose up -d
   ```
   To login to dashboard, go to localhost:8080 these are username, password
   ```
   "id": "exploreradmin",
   "password": "exploreradminpw"
   ```
   
6) Setup Cooja
   Run Cooja and open the simulation file included in cooja/
   Create 3 tunslip instances and connect to all 3 border routers
   
7) Run UDP server
   Run these commands
   ```
   cd server-udp/
   npm i
   node server.js
   ```

8) Run Frontend
    ```
    cd frontend/
    npm i
    npm start
    ```
    
9) Run Off Chain (Optional)
   ```
   cd off-chain/
   npm i
   node off-chain.js
   ```
