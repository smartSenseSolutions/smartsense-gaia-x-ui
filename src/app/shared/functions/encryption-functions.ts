/**
 * Encryption Functions class
 */
export class EncryptionFunctions {
  /**
   * Encrypt object method
   * @param value
   * @returns
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public static ENCRYPT_OBJ(value: any): string {
    let result = '';
    try {
      result = btoa(encodeURIComponent(JSON.stringify(value)));
    } catch (e) {}
    return result;
  }

  /**
   * Decrypt object method
   * @param value
   * @param key
   * @returns
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public static DECRYPT_OBJ(value: string | null): any {
    let result = '';
    if (value && value != null) {
      try {
        result = JSON.parse(decodeURIComponent(atob(value.toString())));
      } catch (e) {}
    }
    return result;
  }
}
