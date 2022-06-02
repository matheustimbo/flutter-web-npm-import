var Eth = require("@ledgerhq/hw-app-eth");
var TransportWebUSB = require("@ledgerhq/hw-transport-webusb");

var LedgerEth = (function () {
  var instance;

  async function createInstance() {
    const transport = await TransportWebUSB.default.create();
    return new Eth(transport);
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
  try {
    const eth = await LedgerEth.getInstance();

    const address = await eth.getAddress(_derivationPath);

    return address;
  } catch (e) {
    return null;
  }
}

async function signPersonalMessageOnLedger (messageHex) {
  const eth = await LedgerEth.getInstance();

  return eth.signPersonalMessage(_derivationPath, messageHex);
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