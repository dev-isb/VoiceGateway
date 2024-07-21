const services = {};
const service = require("../services/services");
const fileMapper = {
    1: "tt-monkeys",
    2: "disabled",
    3: "dir-welcome"

}
services.getFileName = async (payload) => {
    const { channel } = payload;
    const getAudioFile = await service.getVariable({ channel, key: "audionum" });
    console.log("getAudioFile :", getAudioFile);
    await channel.setVariable("audio", fileMapper[getAudioFile]);
    console.log("done");
    return;
}

module.exports = services;