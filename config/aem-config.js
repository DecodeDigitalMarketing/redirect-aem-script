const COOKIE    = 'ys-tools=o%3AactiveTab%3Ds%253Areplication; ys-repository=o%3Awidth%3Dn%253A621%5Eheight%3Dn%253A680%5Ecollapsed%3Db%253A0%5EselectedPath%3Ds%253A/crx.default%253Ajcr%25253aroot/content/stlukeshealth/en/locations/physical-medicine-baylor-st-lukes-medical-group-livingston-tx; oauth-configid=ims; oauth-authid=ims; cq-authoring-mode=TOUCH; login-token=6331858e-f18d-4dc9-bd4e-13f70e2f9b8b%3a97cf63e4-214a-4a25-9c62-726e4c59dd89_a5ffa250add62e9eb788a2e85b98007e%3acrx.default; aem-commonspirit="{45d98bb6bbf53c78d8ba65e080d6e3b16fa1d482fe89b5108395955d82ddb05030d5ace038f9e5f399b5fdce23c4cfe5bcaf7e80cb735d8e92a9b735aa417b2cd1d9aaa1ff2201ec4766ee94b254f690f3e86d71cfe6e0d299d4d760a3635dc05d5aa0e7af799ec37c7b43854d76d9ac}"'
const url       = 'https://author1.qa.commonspirit.adobecqms.net'

module.exports = {
    url,
    market : 'dignity-health',
    cookie : COOKIE,
    replicationUrl: `${url}/crx/de/replication.jsp`,
    crxde  : `${url}/crx/server/crx.default/jcr%3aroot/content/`,
    options: {
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Cookie': `${COOKIE}`,
            'Origin': `${url}`,
            'Pragma': 'no-cache',
            'Overwrite': 'T',
            'Referer': `${url}/crx/de/index.jsp`,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': "macOS"
        },
        sslVerifyPeer: false
    }
}