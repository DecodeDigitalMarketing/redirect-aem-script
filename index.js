const { processReading } = require('./services/requestService'); 

async function processAudit() {
    try {
        await processReading()
    } catch (error) {
        
    }
}

processAudit()