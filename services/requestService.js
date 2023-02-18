const axios = require('axios');
const https = require('https');
const { options, crxde, replicationUrl } = require('../config/aem-config');
const XLSX = require("xlsx");

const { 
    readSpreadsheet, 
    createSpreadSheet,
    writeOnSpreadsheet, 
    batchUpdateOnSpreadSheet
} = require('./GoogleSheetService');

const spreadsheetId = '1l9Z0fRGTcM8qrUEDFWKpMefDF6sjzexfRey3RToMFlI'

const markets = [
    {
        market: 'stlukeshealth',
        csv: 'https://www.stlukeshealth.org/content/dam/stlukeshealth/devops/redirects/stlukeshealth-redirects.csv',
        sheetRange: ['stlukeshealth-redirects!A:D'],
        domain: 'https://www.stlukeshealth.org'
    },
    {
        market: 'stjoseph-stlukeshealth',
        csv: 'https://stjoseph.stlukeshealth.org/content/dam/stjoseph-stlukeshealth/devops/redirects/stjoseph-stlukeshealth-redirects.csv',
        sheetRange: ['stjoseph-stlukeshealth-redirects!A:D'],
        domain: 'https://stjoseph.stlukeshealth.org'
    },
    {
        market: 'dignityhealth',
        csv: 'https://www.dignityhealth.org/content/dam/dignity-health/devops/redirects/dignity-health-redirects.csv',
        sheetRange: ['dignity-health-redirects!A:D'],
        domain: 'https://www.dignityhealth.org'
    },
]


async function request(url) {
    try {
        if (!url) throw new Error('No path provided')
        const instance = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: false
            }),
            headers: options.headers
        });
        const response = await instance.get(url); 

        return response; 

    } catch (error) {
        //console.log(error.message)
        return null
    }   
}

async function processReading() {
    try {
        for (const item of markets) {
            const ranges    = item.ranges;
            const market    = item.market;
            const res       = await readSpreadsheet(spreadsheetId, ranges); 
            const path      = res.data.sheets[0].data[0].rowMetadata
            const rows      = res.data.sheets[0].data[0].rowData.filter((i, index) =>  !path[index].hiddenByFilter ).map(i => i.values.map(i => i.formattedValue));
            const dataRows  = rows.slice(1, rows.length);
            const urlFrom   = new Set([...dataRows.map((item) => item[0])])

            const spreadSheetData = [['Path']]

            for (const url of Array.from(urlFrom)) {
                const path = `${crxde}${market}/en${encodeURI(url)}`
                const response = await request(path);
                if (response && response.status == 200) {
                    const replicationPath = `${replicationUrl}?path=/content/${market}/en${encodeURI(url)}`
                    const response = await request(replicationPath); 
                    if (response && response.data && response.data.isActivated && response.data.lastPublished) {
                        spreadSheetData.push([`${item.domain}${url}`])
                    } 
                }
            }
            const id = '1k2LdqWVbSzTBq31x0FXa4HY6Ufjm0XRrf4wtRM0ZLBY';
            const response = await writeOnSpreadsheet(id, [`${market}!A:B`], spreadSheetData)
        }

      } catch (error) {
        console.error(error.message);
      }
}


  module.exports = {
    processReading
  }




