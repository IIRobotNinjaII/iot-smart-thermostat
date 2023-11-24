const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const assetSchema = new Schema({
    ID: String,
    Temperature: [Number],
    Humidity: [Number],
    Date: [String],
    PM: [Number],
    CO2: [Number],
    VOC: [Number],
    ThermostatOn: Number,
    HumidifierOn: Number,
});

const Asset = mongoose.model('smart-thermostat-data', assetSchema);

mongoose.connect('mongodb+srv://at822076:balls123@iot.os0xjzn.mongodb.net/?retryWrites=true&w=majority')
console.log('Connected to MongoDB')

const updateAssetData = async (assetData) => {
    try {
        const existingAsset = await Asset.findOne({ ID: assetData.ID });

        if (existingAsset) {
            // Update existing record
            existingAsset.Temperature = assetData.Temperature;
            existingAsset.Humidity = assetData.Humidity;
            existingAsset.Date = assetData.Date;
            existingAsset.PM = assetData.PM;
            existingAsset.CO2 = assetData.CO2;
            existingAsset.VOC = assetData.VOC;
            existingAsset.ThermostatOn = assetData.ThermostatOn;
            existingAsset.HumidifierOn = assetData.HumidifierOn;

            await existingAsset.save();
            console.log('Existing record updated for sensor ID : ',assetData.ID);
        } else {
            // Create new record
            const newAsset = new Asset(assetData);
            await newAsset.save();
            console.log('New record created for sensor ID : ',assetData.ID);
        }
    } catch (error) {
        console.error('Error updating/inserting data:', error);
    }
};

const fetchData = async () => {
    try {
        const response = await fetch('http://localhost:3000/query?channelid=mychannel&chaincodeid=basic&function=GetAllAssets');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

setInterval(async () => {
    data = await fetchData();   
    for (item of data){
        await updateAssetData(item)
    }

}, 30000);