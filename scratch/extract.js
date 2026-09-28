const fs = require('fs');
const cheerio = require('cheerio');

const clientsPath = 'C:\\Users\\new user\\.gemini\\antigravity-ide\\brain\\7ab31caa-6300-4d26-82aa-9cca9e8a72c4\\.system_generated\\steps\\327\\content.md';
const servicesPath = 'C:\\Users\\new user\\.gemini\\antigravity-ide\\brain\\7ab31caa-6300-4d26-82aa-9cca9e8a72c4\\.system_generated\\steps\\328\\content.md';

function extractClients() {
    const html = fs.readFileSync(clientsPath, 'utf8');
    const $ = cheerio.load(html);
    const clients = [];

    $('.blogbox').each((i, el) => {
        const link = $(el).find('a.lightbox-image').attr('href');
        const title = $(el).find('h2').text().trim();
        
        if (link && title) {
            const filename = link.split('/').pop();
            let cleanTitle = title.replace(/^#\d+\s*/, ''); // Remove "#1 " prefix
            
            clients.push({
                "client_id": i + 1,
                "client_image": filename,
                "client_title": cleanTitle,
                "client_desc": null,
                "client_status": 1,
                "client_order": i + 1,
                "client_slug": cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')
            });
        }
    });

    const finalJson = {
        "status": true,
        "message": "Client data fetched successfully",
        "data": {
            "clients": clients,
            "paths": {
                "client_image": "https://snehagraphicssolutions.com/public/img/uploads/our_clients/"
            }
        }
    };
    
    fs.writeFileSync('../src/constants/clientData.json', JSON.stringify(finalJson, null, 2));
    console.log(`Extracted ${clients.length} clients`);
}

function extractServices() {
    const html = fs.readFileSync(servicesPath, 'utf8');
    const $ = cheerio.load(html);
    const services = [];

    $('.blogbox').each((i, el) => {
        const link = $(el).find('a.lightbox-image').attr('href');
        const title = $(el).find('h2').text().trim();
        
        if (link && title) {
            const filename = link.split('/').pop();
            
            services.push({
                "service_id": i + 1,
                "service_image": filename,
                "service_title": title
            });
        }
    });

    const finalJson = {
        "status": true,
        "message": "Service data fetched successfully",
        "data": {
            "services": {
                "current_page": 1,
                "data": services
            },
            "paths": {
                "service_image": "https://snehagraphicssolutions.com/public/img/uploads/technical_services/"
            }
        }
    };
    
    fs.writeFileSync('../src/constants/clientServiceData.json', JSON.stringify(finalJson, null, 2));
    console.log(`Extracted ${services.length} services`);
}

extractClients();
extractServices();
