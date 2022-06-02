var LedgerLiveApi = require('@ledgerhq/live-app-sdk');
//import LedgerLiveApi, { WindowMessageTransport } from '@ledgerhq/live-app-sdk'
//LedgerLiveApi.WindowMessageTransport

var LedgerLiveApiSingleton = (function () {
  var instance;

  function createInstance() {
    console.log({LedgerLiveApi})
    var object = new LedgerLiveApi.default(new LedgerLiveApi.WindowMessageTransport())
    console.log({object})
    object.connect()
    return object;
  }

  return {
      getInstance: function () {
          if (!instance) {
              instance = createInstance();
          }
          return instance;
      }
  };
})();


/*useEffect(() => {
    if (router.query.ledger) {
      const llapi = new LedgerLiveApi(new WindowMessageTransport())
      llapi.connect()
      if (llapi) {
        api.current = llapi
      }
      return () => {
        api.current = undefined
        void llapi.disconnect()
      }
    }
    return
}, [router.query.ledger])*/

async function getLedgerLiveAccounts() {
    console.log('asdadad')
    return new Promise (async (resolve, reject) => {
      try {
        const apiInstance = LedgerLiveApiSingleton.getInstance();
        console.log(apiInstance)
        //const accounts = await apiInstance.requestAccount({ currencies });
        const accounts = await apiInstance.requestAccount();

       resolve(accounts);
      } catch (e) {
        console.log(e)
        reject("Erro ao procurar contas.");
      }
    })
  }

  window.getLedgerLiveAccounts = getLedgerLiveAccounts


