@JS()
library ledgerlive;

import "package:js/js.dart";

@JS('getLedgerLiveAccounts')
external Future<String> getLedgerLiveAccounts();
