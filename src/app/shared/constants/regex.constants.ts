export default class RegexConstant {
 public static UPPERCASE_LOWERCASE  = /^(?=.*[a-z])(?=.*[A-Z]).+$/ ;
 public static MIN_LENGTH_SIX =  /^.{6,}$/;
 public static SPECIAL_CHARACTER = /[$&+,:;=?@#|'<>.^*()%!-]/;
 public static CONTAIN_NUMBER  = /[0-9]/;
}
