const fs                = require('fs').promises;
const path              = require('path');
const process           = require('process');
const {authenticate}    = require('@google-cloud/local-auth');
const {google}          = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH        = path.join(process.cwd(), './token.json');
const CREDENTIALS_PATH  = path.join(process.cwd(), './credentials.json');
//const spreadsheetId     = '1FGo31_QvYrTUeTJx6oYc1usWAb6ltatYNMuw2wn89RM';

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(CREDENTIALS_PATH);
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Updates values in a Spreadsheet.
 * @param {string} ranges The sheet range 
 * @return {obj} spreadsheet information
 */
async function readSpreadsheet(spreadsheetId, ranges) {
    try {
        const auth              =   await authorize(); 
        const service           =   google.sheets({version: 'v4', auth});

        const result            =   await service.spreadsheets.get({
            spreadsheetId,
            ranges,
            includeGridData: true
        }); 

        return result;
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

/**
 * Updates values in a Spreadsheet.
 * @param {string} spreadsheetId The sheet 
 * @param {string} range The sheet range 
 * @param {(string[])[]} values A 2d array of values to update.
 * @return {obj} spreadsheet information
 */
async function writeOnSpreadsheet(spreadsheetId, range, values) {
    try {

        const auth              =   await authorize(); 
        const service           =   google.sheets({version: 'v4', auth});
        const valueInputOption  =   'USER_ENTERED';
      
        const resource = { values };
        const result = await service.spreadsheets.values.update({
            spreadsheetId,
            range,
            valueInputOption,
            resource
        });

        return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
}

/**
 * Create a google spreadsheet
 * @param {string} title Spreadsheets title
 * @return {string} Created spreadsheets ID
 */
async function createSpreadSheet(title) {
  try {
    const auth              =   await authorize(); 
    const service           = google.sheets({version: 'v4', auth});
    const resource = {
      properties: {
        title,
      },
    };
    const spreadsheet = await service.spreadsheets.create({
      resource,
      fields: 'spreadsheetId',
    });

    return spreadsheet.data.spreadsheetId;
  } catch (err) {

    throw err;
  }
}

/**
 * Updates the Spreadsheet title. Finds and replaces a string in the sheets.
 * @param {string} spreadsheetId The Spreadsheet to update
 * @param {string} title The new Spreadsheet title
 * @param {string} find The text to find
 * @param {string} replacement The text to replace
 * @return {obj} holding the information regarding the replacement of strings
 */
async function batchUpdateOnSpreadSheet(spreadsheetId, title) {
  try {
    const auth              =   await authorize(); 
    const service           =   google.sheets({version: 'v4', auth});
    
    const requests = [
      {
        addSheet: {
          properties: {
            title
          }
        }
      }
    ];

    const batchUpdateRequest = {requests};

    const response = await service.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: batchUpdateRequest,
    });

    console.log(response)

    return response;
  } catch (err) {
    // TODO (developer) - Handle exception
    throw err;
  }
}

module.exports = {
    writeOnSpreadsheet,
    readSpreadsheet,
    createSpreadSheet,
    batchUpdateOnSpreadSheet
}