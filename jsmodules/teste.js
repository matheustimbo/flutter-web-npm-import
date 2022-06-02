var Eth = require("@ledgerhq/hw-app-eth");
var TransportWebUSB = require("@ledgerhq/hw-transport-webusb");

var LedgerEth = (function () {
  var instance;

  async function createInstance() {
    const transport = await TransportWebUSB.default.create();
    return new Eth.default(transport);
  }

  return {
      getInstance: async function () {
          if (!instance) {
              instance = await createInstance();
          }
          return instance;
      },
      resetLedgerEthInstance: function () {
        instance = null;
      },
      getCurrentInstance: function() {
        return instance;
      }
  };
})();

const _derivationPath = "44'/60'/0'/0/0";

function resetCurrentLedgetEthInstance  ()  {
  return LedgerEth.resetLedgetEthInstance();
}

function getCurrentLedgetEthInstance () {
  return LedgerEth.getCurrentInstance();
}

async function getLedgerAddress() {
  return new Promise (async (resolve, reject) => {
    try {
      const eth = await LedgerEth.getInstance();
  
      const address = await eth.getAddress(_derivationPath);
     resolve(address.address);
    } catch (e) {
      reject("Erro ao conectar na Ledger.");
    }
  })
}

async function signPersonalMessageOnLedger (messageHex) {
  console.log(messageHex)
  return new Promise (async (resolve, reject) => {
    try {
      const eth = await LedgerEth.getInstance();
      console.log(eth)
      console.log(_derivationPath)
      console.log(messageHex)
      resolve(eth.signPersonalMessage(_derivationPath, messageHex));
    } catch (e) {
      console.log(e)
      reject("Erro ao assinar a mensagem.");
    }
  })
};

function teste() {
  console.log("printeeeeeei");
  return 3;
}

window.resetCurrentLedgetEthInstance = resetCurrentLedgetEthInstance;
window.getCurrentLedgetEthInstance = getCurrentLedgetEthInstance;
window.getLedgerAddress = getLedgerAddress;
window.signPersonalMessageOnLedger = signPersonalMessageOnLedger;
window.teste = teste;