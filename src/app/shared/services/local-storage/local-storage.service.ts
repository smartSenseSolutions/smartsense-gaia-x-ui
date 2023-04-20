import { Injectable } from '@angular/core';
import { EncryptionFunctions, appLog } from '../../functions';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  /**
   * To set Key-value pair into local storage
   * @param key key to Set
   * @param value Value to Set
   */
  setItem<T>(key: string, value: T): void {
    try {
      const encryptedValue: string = EncryptionFunctions.ENCRYPT_OBJ(value);
      localStorage.setItem(key, encryptedValue);
    } catch (e) {
      appLog('Error while setting item in local storage', e);
    }
  }

  /**
   * To get Item from Key
   * @param key Key of the item to get
   * @returns Value of key
   */
  getItem<T>(key: string): T | null {
    try {
      return EncryptionFunctions.DECRYPT_OBJ(localStorage.getItem(key));
    } catch (e) {
      appLog('Error while getting item from local storage', e);
      return null;
    }
  }

  /**
   * To remove specific key-value pair from local storage
   * @param key Key
   */
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * To clear Local storage
   */
  clear(): void {
    localStorage.clear();
  }
}
