import { useDispatch, useSelector } from "react-redux";
import { authSelectors } from "redux/authorization";
import { Text, Button } from "./UserMenu.styled";
import { IoMdLogOut } from "react-icons/io";
import { useLogoutMutation } from "redux/authorization/auth";
import { unsetCredentials } from "redux/authorization/authSlice";

export function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);
  const [logout] = useLogoutMutation();
  return (
    <div style={{ marginLeft: "auto", display: "flex" }}>
      <Text>Welcom, {name}</Text>
      <Button
        type="button"
        onClick={async () => {
          try {
            const result = await logout();
            if (result.data) {
              dispatch(unsetCredentials());
            }
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <IoMdLogOut />
      </Button>
    </div>
  );
}
