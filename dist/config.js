import os from "os";
import path from "path";
import fs from "fs";
function getConfigFilePath() {
    const homeDir = os.homedir();
    return path.join(homeDir, ".gatorconfig.json");
}
function writeConfig(cfg) {
    const temp = {
        db_url: cfg.dbUrl,
        current_user_name: cfg.currentUserName
    };
    const configJson = JSON.stringify(temp);
    fs.writeFileSync(getConfigFilePath(), configJson);
}
function validateConfig(rawConfig) {
    if (!rawConfig.db_url) {
        throw new Error("Missing Field/s");
    }
    const config = {
        dbUrl: rawConfig.db_url,
        currentUserName: rawConfig.current_user_name
    };
    return config;
}
export function readConfig() {
    const fullPath = getConfigFilePath();
    const fileInfo = fs.readFileSync(fullPath, "utf-8");
    const rawConfig = JSON.parse(fileInfo);
    return validateConfig(rawConfig);
}
export function setUser(userName) {
    const config = readConfig();
    config.currentUserName = userName;
    writeConfig(config);
}
