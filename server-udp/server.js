'use strict';
let portIPv6 = 7878;
let hostIPv6 = 'aaaa::1';
let dgram = require('dgram');
let axios = require('axios');
let serverUDP = dgram.createSocket('udp6');
let disableLogs = false;

serverUDP.on('listening', function() {
    var address = serverUDP.address();
    console.log('[UDP - IPV6] Active IPv6 server addr.:' + address.address + ":" + address.port);
});

serverUDP.on('message', processMessage);

serverUDP.bind(portIPv6, hostIPv6);

function processMessage(message, remote) {
  // console.log(remote.address)
  let dataArray = message.toString().split('|')
  let id = dataArray[0].split(':')[1];
  let org = dataArray[2].split(':')[5]
  let temp = parseInt(dataArray[3]);
  let hum = parseInt(dataArray[4]);
  let pm = parseInt(dataArray[5]);
  let co2 = parseInt(dataArray[6]); 
  let voc = parseInt(dataArray[7]); 
  let thermostat_on = parseInt(dataArray[8]); 
  let humidifier_on = parseInt(dataArray[9]); 
  if (!disableLogs){
    console.log('[UDP - IPv6] ' + new Date().toISOString())
    console.log('Incoming from ' + remote.address + ' Port:' + remote.port);
    console.log('Sensor ID : '+ id);
    console.log('Belongs to Organization : '+org);
    console.log('Temperature : '+temp); 
    console.log('Humidity : '+hum);
    console.log('CO2 : '+co2);
    console.log('VOC : '+voc);
    console.log('PM : '+pm);
    console.log('Thermostat status : '+thermostat_on);
    console.log('Humiifier status : '+humidifier_on+'\n');
  }
    sendData(org,id,temp,hum,pm,co2,voc,thermostat_on,humidifier_on);
}
function sendData(org,id,temp,hum,pm,co2,voc,thermostat_on,humidifier_on) {
  const url = 'http://localhost:3000/invokeorg'+org;

  const data = new URLSearchParams();
  data.append('channelid', 'mychannel');
  data.append('chaincodeid', 'basic');
  data.append('function', 'createAsset');
  data.append('args', id);
  data.append('args', temp);
  data.append('args', hum);
  data.append('args', new Date().toISOString());
  data.append('args', pm);
  data.append('args', co2);
  data.append('args', voc);
  data.append('args', thermostat_on);
  data.append('args', humidifier_on);
  
  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(response => {
      console.log('Successfully added to the Blockchain : ', response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
