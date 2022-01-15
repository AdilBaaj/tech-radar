import fetch from 'node-fetch';

function parseData(data){
    const mapQuadrantNameToId = {
        frontend: 2,
        backend: 3,
        devops: 1,
        data: 0
    }

    const mapStatusToRing = {
        adopt: 0,
        trial: 1,
        assess: 2,
        hold: 3
    }
    return data.map(d => {
            const quadrant = d.properties['Quadrant'].select.name
            const status = d.properties['Status'].rich_text[0].text.content
            const label = d.properties['Technology'].title[0].plain_text
            return {
                "active": true,
                "label": label,
                "moved": 0,
                "quadrant": mapQuadrantNameToId[quadrant],
                "ring": mapStatusToRing[status]
            }
        }
    )
}

async function getData() {
    const databaseId = "bfd73bc4439646f1b6f64a5e1f605dd1"
    const notionApiKey = "secret_VaHw57mbhpoyqbAGLfQ78HClZDkIEohkgXl9KRHRyjk"
    const notionVersion = '2021-08-16'
    const url = `https://api.notion.com/v1/databases/${databaseId}/query`
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${notionApiKey}`,
            'Notion-Version': notionVersion
        }
    })
    return response.json();
}

export default function getFormattedData(){
    return getData().then(data => parseData(data.results));
}
