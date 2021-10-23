import { useDispatch, useSelector } from "react-redux";
import { authSelectors, authOperations } from "redux/authorization";
import { Text, Button } from "./UserMenu.styled";
import { IoMdLogOut } from "react-icons/io";

export function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <div style={{ marginLeft: "auto", display: "flex" }}>
      <Text>Welcom, {name}</Text>
      <Button type="button" onClick={() => dispatch(authOperations.logout())}>
        <IoMdLogOut />
      </Button>
    </div>
  );
}
