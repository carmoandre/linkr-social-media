export default function isValidUserState(user){
  if (
    typeof user.token === "string"
    && typeof user.user === "object"
    && typeof user.user.id === "number"
    && typeof user.user.email === "string"
    && typeof user.user.username === "string"
    && typeof user.user.avatar === "string"
  ) return true;
  else return false;
}