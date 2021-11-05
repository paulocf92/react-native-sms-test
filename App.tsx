import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert, LogBox } from 'react-native';
import * as ReadSms from 'react-native-read-sms/ReadSms';

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message (new RN versions)

export default function App() {
  async function startReadSMS() {
    const hasPermission = await ReadSms.requestReadSMSPermission();
    if (hasPermission) {
      console.log('User has permission');
      ReadSms.startReadSMS((status, sms, _) => {
        console.log({ status, sms });
        if (status === 'success') {
          Alert.alert('Great!! you have received new sms:', sms);
        }
      });
    }
  }

  useEffect(() => {
    startReadSMS();

    return () => {
      ReadSms.stopReadSMS();
    };
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container}>
        <Text style={styles.text}>Waiting for an SMS...</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '500',
  },
});
