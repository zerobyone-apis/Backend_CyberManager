"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Notification {
    static header(text) {
        console.log(this.getDate() + 'INFO: ' + chalk_1.default.white.bgGreen(text));
    }
    static info(text) {
        console.log(this.getDate() + 'INFO: ' + chalk_1.default.cyan(text));
    }
    static success(text) {
        console.log(this.getDate() + 'INFO: ' + chalk_1.default.green(text));
    }
    static warn(text) {
        console.log(this.getDate() + 'WARNING: ' + chalk_1.default.yellow(text));
    }
    static error(text) {
        console.log(this.getDate() + 'SEVERE: ' + chalk_1.default.red(text));
    }
    static fatal(text) {
        console.log(this.getDate() + 'SEVERE: ' + chalk_1.default.white.bgRed(text));
    }
    static getDate() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return ('[ ' +
            date.toISOString().substring(0, 10) +
            hours +
            ':' +
            minutes +
            ':' +
            seconds +
            ' ] ');
    }
}
exports.default = Notification;
//# sourceMappingURL=Logger.js.map