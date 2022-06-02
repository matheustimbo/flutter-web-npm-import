import 'package:flutter/material.dart';
import 'package:js/js_util.dart';

import 'ledger.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var ledgerAddress = '';

  void getLedger() async {
    promiseToFuture(getLedgerAddress()).then((value) {
      setState(() {
        ledgerAddress = value;
      });
      print(value);
    }).catchError((error) {
      print(error);
    });
  }

  void signMessage() async {
    promiseToFuture(signPersonalMessageOnLedger('222')).then((value) {
      print(value);
    }).catchError((error) {
      print(error);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          children: [
            /*ElevatedButton(
              onPressed: () {
                final val =
                    js.context.callMethod('resetCurrentLedgetEthInstance', []);
                print(val);
              },
              child: const Text('resetCurrentLedgetEthInstance'),
            ),
            ElevatedButton(
              onPressed: () {
                final val =
                    js.context.callMethod('getCurrentLedgetEthInstance', []);
                print(val);
              },
              child: const Text('getCurrentLedgetEthInstance'),
            ),*/
            ElevatedButton(
              onPressed: getLedger,
              child: const Text('getLedgerAddress'),
            ),
            ElevatedButton(
              onPressed: signMessage,
              child: const Text('signPersonalMessageOnLedger'),
            ),
            /*ElevatedButton(
              onPressed: () {
                final val = js.context.callMethod('teste', []);
                print(val);
              },
              child: const Text('teste'),
            ),*/
          ],
        ),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
