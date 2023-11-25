package main

import (
	"fmt"
	"rest-api-go/web"
)

func main() {
	org1CryptoPath := "../../test-network/organizations/peerOrganizations/org1.example.com"
	org1Config := web.OrgSetup{
		OrgName:      "Org1",
		MSPID:        "Org1MSP",
		CertPath:     org1CryptoPath + "/users/User1@org1.example.com/msp/signcerts/cert.pem",
		KeyPath:      org1CryptoPath + "/users/User1@org1.example.com/msp/keystore/",
		TLSCertPath:  org1CryptoPath + "/peers/peer0.org1.example.com/tls/ca.crt",
		PeerEndpoint: "localhost:7051",
		GatewayPeer:  "peer0.org1.example.com",
	}

	org1Setup, err := web.Initialize(org1Config)
	if err != nil {
		fmt.Println("Error initializing setup for Org1: ", err)
		return
	}

	fmt.Println("Org1 Initialised")

	org2CryptoPath := "../../test-network/organizations/peerOrganizations/org2.example.com"
	org2Config := web.OrgSetup{
		OrgName:      "Org2",
		MSPID:        "Org2MSP",
		CertPath:     org2CryptoPath + "/users/User1@org2.example.com/msp/signcerts/cert.pem",
		KeyPath:      org2CryptoPath + "/users/User1@org2.example.com/msp/keystore/",
		TLSCertPath:  org2CryptoPath + "/peers/peer0.org2.example.com/tls/ca.crt",
		PeerEndpoint: "localhost:9051", 
		GatewayPeer:  "peer0.org2.example.com",
	}

	org2Setup, err := web.Initialize(org2Config)
	if err != nil {
		fmt.Println("Error initializing setup for Org2: ", err)
		return
	}

	fmt.Println("Org2 Initialised")
	
	org3CryptoPath := "../../test-network/organizations/peerOrganizations/org3.example.com"
	org3Config := web.OrgSetup{
		OrgName:      "Org3",
		MSPID:        "Org3MSP",
		CertPath:     org3CryptoPath + "/users/User1@org3.example.com/msp/signcerts/cert.pem",
		KeyPath:      org3CryptoPath + "/users/User1@org3.example.com/msp/keystore/",
		TLSCertPath:  org3CryptoPath + "/peers/peer0.org3.example.com/tls/ca.crt",
		PeerEndpoint: "localhost:11051", 
		GatewayPeer:  "peer0.org3.example.com",
	}

	org3Setup, err := web.Initialize(org3Config)
	if err != nil {
		fmt.Println("Error initializing setup for Org3: ", err)
		return
	}

	fmt.Println("Org3 Initialised")

	web.Serve(web.OrgSetup(*org1Setup),web.OrgSetup(*org2Setup),web.OrgSetup(*org3Setup))

}