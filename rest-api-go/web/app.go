package web

import (
	"fmt"
	"net/http"

	"github.com/hyperledger/fabric-gateway/pkg/client"
)

// OrgSetup contains organization's config to interact with the network.
type OrgSetup struct {
	OrgName      string
	MSPID        string
	CryptoPath   string
	CertPath     string
	KeyPath      string
	TLSCertPath  string
	PeerEndpoint string
	GatewayPeer  string
	Gateway      client.Gateway
}

// Serve starts http web server.
func Serve(setup1 OrgSetup, setup2 OrgSetup,setup3 OrgSetup) {

	http.HandleFunc("/query", setup1.Query)
	http.HandleFunc("/invokeorg1", setup1.Invoke)
	http.HandleFunc("/invokeorg2", setup2.Invoke)
	http.HandleFunc("/invokeorg3", setup3.Invoke)
	
	fmt.Println("Listening (http://localhost:3000/)...")
	if err := http.ListenAndServe(":3000", nil); err != nil {
		fmt.Println(err)
	}
}
