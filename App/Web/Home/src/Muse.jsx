require('./text-polyfill');

const { MUSE_SERVICE, MuseClient, zipSamples, channelNames } = require('muse-js');
const noble = require('noble');
const bleat = require('bleat').webbluetooth;
const lsl = require('node-lsl');
const { Observable } = require('rxjs');

async function connect() {
    let device = await bleat.requestDevice({
        filters: [{ services: [MUSE_SERVICE] }]
    });
    const gatt = await device.gatt.connect();
    console.log('Device name:', gatt.device.name);

    const client = new MuseClient();
    await client.connect(gatt);
    client.controlResponses.subscribe(x => console.log('Response:', x));
    await client.start();
    console.log('Connected!');
    return client;
}