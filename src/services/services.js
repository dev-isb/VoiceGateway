
const log = console.log;
class services {
    getNextDayNumber(num) {
        num += 1;
        num %= 7;
        if (num == 0) {
            num = 7;
        }
        return num;
    }

    formatCellNumber(cellno) {
        console.log(cellno)
        if (cellno.startsWith("+92")) {
            cellno = cellno.substring(3);
        } else if (cellno.startsWith("0092")) {
            cellno = cellno.substring(4);
        } else if (cellno.startsWith("03")) {
            console.log("number is fin")
        } else if (cellno.startsWith("3")) {
            cellno = `0${cellno}`;
        }

        return cellno;

    }

    async getVariable(payload) {
        const { channel, key } = payload;
        const chVar = channel.getVariable(key);
        const timeOutPromise = this.getTimeOut();
        const valueVar = await Promise.race([chVar, timeOutPromise]);
        if (valueVar == "timeout") {
            return await this.getVariable(payload);
        }

        return valueVar.value;
    }

    getTimeOut() {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 2000, 'timeout');
        });
    }
}

module.exports = new services();
