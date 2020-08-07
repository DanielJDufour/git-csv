const GitUrlParse = require("git-url-parse");
const { Octokit } = require("@octokit/rest");
const papaparse = require("papaparse");


module.exports = async ({ accessToken, header=false, debug, url }) => {
    if (debug) console.log("starting gitCSV");

    // parse url
    const parsedURL = GitUrlParse(url);

    if (debug) console.log("parsedURL:", parsedURL);

    const { owner, name: repo, filepath: path } = parsedURL;
    if (debug) console.log("owner:", owner);
    if (debug) console.log("repo:", repo);
    if (debug) console.log("path:", path);

    const options = {};
    if (accessToken) options.auth = accessToken;
    if (debug) console.log("options:", options);
    const octokit = new Octokit(options);

    const result = await octokit.repos.getContent({ owner, repo, path });
    if (debug) console.log("result:", typeof result);

    const { content } = result.data;

    let csv;
    if (typeof Buffer !== 'undefined') {
        csv = Buffer.from(content, 'base64').toString();
    } else if (typeof window !== 'undefined') {
        csv = window.atob(content);
    } else if (typeof self !== 'undefined') {
        csv = self.atob(content);
    } else if (typeof global !== 'undefined') {
        csv = global.atob(content);
    } else {
        throw new Error("Uh oh. Couldn't find a way to parse the response from Github");
    }

    if (debug) console.log("csv:", csv);

    const parsed = papaparse.parse(csv, { header, dynamicTyping: true, skipEmptyLines: true});

    const rows = parsed.data;
    if (debug) console.log("rows:", rows);

    if (debug) console.log("finishing gitCSV");

    return rows;
};
