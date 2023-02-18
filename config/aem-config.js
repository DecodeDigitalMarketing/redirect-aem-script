const COOKIE    = 'oauth-configid=ims; oauth-authid=ims; cq-authoring-mode=TOUCH; login-token=6331858e-f18d-4dc9-bd4e-13f70e2f9b8b:773f5193-94c7-4382-b783-0f05574139be_6776db9e6a934d46224985edd8520356:crx.default; aem-commonspirit="{f9a5bd0103474269540f16b6a3190273befc4a36658b359ff3448fdd763561510df220dae0e3ae6d4a6d847b9b3f4e7d3cccd3d5eed5254815c45c4fccacad1a0e018fcd1c05fe4fdfac96e62cc939f5c111548df47c3c69baaa5c5df71ff3b1c0d3f6ddf9cf0bfb68f727191704e8cd}"'
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