process.env["NO_PROXY"] = "";
require("./services/winstonLogger");
require("dotenv").config();
const agiServer = require("ding-dong");
const services = require("./services/services");
const port = process.env.port || 4000;
const agis = require("./demo/index");
const mapper = {
    getFile: agis.getFileName
}

const requestMessage = async function (channel) {
    try {
        const action = await services.getVariable({ channel, key: "actions" });
        const agi = mapper[action];

        if (agi) {
            await agi({ channel });
            await channel.end();
        } else {
            console.log("Agi not found : " + action);
            await channel.end();
        }

    } catch (error) {
        console.log("Agi not found : " + error.message);
        await channel
            .end()
            .catch((err) => console.log("unable to close agi end : " + err));
    }
};

const app = new agiServer(requestMessage);

console.winstonLogger.info("agi server start listening on : " + port);

app.start(port);

async function getEndTimeOut() {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, 120000, "timeHasEnded");
    });
}
