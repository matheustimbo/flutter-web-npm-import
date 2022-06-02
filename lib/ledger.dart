@JS()
library ledger;

import "package:js/js.dart";

@JS('getLedgerAddress')
external Future<String> getLedgerAddress();

@JS('signPersonalMessageOnLedger')
external Future signPersonalMessageOnLedger(String message);
