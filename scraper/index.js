import jsdom from 'jsdom'
import fs from 'fs'

const URLS = [
    {
        url: "https://news.wisc.edu/h5n1-virus-isolated-from-infected-dairy-worker-is-100-lethal-in-ferrets-but-does-not-appear-to-be-circulating-in-nature-anymore/",
        img: "h5n1.jpg",
        tags: ["research", "cows"]
    },
    {
        url: "https://news.wisc.edu/uw-madison-researchers-use-ai-to-identify-sex-specific-risks-associated-with-brain-tumors/",
        img: "tumor.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/an-ancient-animal-is-helping-scientists-improve-modern-technology/",
        img: "tardigrade.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/cultivate-curiosity-at-the-14th-annual-wisconsin-science-festival/",
        img: "festival.jpg",
        tags: ["research", "campus", "community"]
    },
    {
        url: "https://news.wisc.edu/teaching-research-lead-uw-to-rise-in-worldwide-rankings/",
        img: "teaching.jpg",
        tags: ["campus"]
    },
    {
        url: "https://news.wisc.edu/aquatic-invasive-species-are-more-widespread-in-wisconsin-than-previously-thought/",
        img: "aquatic.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/sitting-pretty-author-to-deliver-go-big-read-keynote-oct-16/",
        img: "gobigread.jpg",
        tags: ["campus", "community"]
    },
    {
        url: "https://news.wisc.edu/portage-attracts-residents-businesses-and-workers-after-univercity-partnership/",
        img: "portage.jpg",
        tags: ["community"]
    },
    {
        url: "https://news.wisc.edu/great-lakes-climate-reporter-to-visit-campus-as-fall-science-journalist-in-residence/",
        img: "izzy.jpg",
        tags: ["research"]
    },
    {
        url: "https://news.wisc.edu/faculty-and-staff-explore-states-rivers-culture-and-more-in-wisconsin-idea-seminar/",
        img: "explore.jpg",
        tags: ["community"]
    },
    {
        url: "https://news.wisc.edu/top-chef-standout-will-whip-up-a-speech-for-uws-winter-commencement/",
        img: "topchef.jpg",
        tags: ["campus", "community"]
    },
    {
        url: "https://news.wisc.edu/from-cattle-farmer-to-college-freshman-buckys-pell-pathway-eases-the-way/",
        img: "pell.jpg",
        tags: ["campus", "cows"]
    },
    {
        url: "https://news.wisc.edu/raw-milk-is-risky-but-airborne-transmission-of-h5n1-from-cows-milk-is-inefficient-in-mammals/",
        img: "cows.jpg",
        tags: ["research", "cows"]
    },
    {
        url: "https://news.wisc.edu/update-from-uw-madison-experts-on-bird-flu-spread/",
        img: "birdflu.jpg",
        tags: ["cows"]
    }
]

const articles = [];

for(const url of URLS) {
    console.log("Processing " + url.url);
    const resp = await fetch(url.url);
    const data = await resp.text();
    // https://stackoverflow.com/questions/11398419/trying-to-use-the-domparser-with-node-js
    const dom = new jsdom.JSDOM(data);
    const story = dom.window.document.getElementsByClassName("story-body")[0].textContent
        .replace(/(\r?\n)+/g, "\n")
        .replace(/Share via .*/g, "")
        .replace(/Photo by .*/g, "")
        .split("\n")
        .map(cleanStr)
        .filter(t => t)
    const title = dom.window.document.getElementsByClassName("story-head")[0].getElementsByTagName("h1")[0].textContent
    const author = dom.window.document.getElementsByClassName("writer")[0]?.textContent.replace(/By /g, "")
    const dt = dom.window.document.getElementsByClassName("date")[0]?.textContent
    await sleep(500 + Math.ceil(500 * Math.random()))
    articles.push({
        title: cleanStr(title),
        body: story,
        posted: dt ?? "unknown",
        url: url.url,
        author: author ?? "unknown",
        img: url.img,
        tags: url.tags
    })
}

fs.writeFileSync("_articles.json", JSON.stringify(articles, null, 2))

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function cleanStr(s) {
    return s.trim()
        .replace(/“/g, '"')
        .replace(/”/g, '"')
        .replace(/’/g, '\'')
        .replace(/–/g, "-")
        .replace(/ /g, " ")
}