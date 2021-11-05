declare module 'react-native-read-sms/ReadSms' {
  type Callback = (
    status: 'success' | 'error',
    sms: string,
    error: string,
  ) => void;

  export function startReadSMS(callback: Callback): Promise<void>;

  export function hasSMSPermission(): Promise<boolean>;

  export function requestReadSMSPermission(): Promise<boolean>;

  export function stopReadSMS(): void;
}
