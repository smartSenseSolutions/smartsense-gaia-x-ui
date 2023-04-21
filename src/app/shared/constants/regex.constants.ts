export class RegexConstant {
  public static UPPERCASE_LOWERCASE = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
  public static MIN_LENGTH_SIX = /^.{6,}$/;
  public static SPECIAL_CHARACTER = /[$&+,:;=?@#|'<>.^*()%!-]/;
  public static CONTAIN_NUMBER = /[0-9]/;
  public static ALPHA_NUMERIC = /^[A-Za-z0-9]+$/;
}
