import React, { useState } from "react";
import { Dropdown, ThemmeButton, ThemmeButtons } from "./DropDownMenu.styled";
import { useTheme } from "context/theme";
import paper from "images/paper.png";
import ocean from "images/ocean.jpg";

export function DropDownMenu() {
  const [visible, setVisible] = useState(false);
  const { updateTheme } = useTheme();
  const toggle = () => {
    setVisible((prevVisible) => !prevVisible);
  };

  return (
    <Dropdown>
      <ThemmeButton type="button" className="Dropdown__toggle" onClick={toggle}>
        {visible ? "Hide" : "Chooze your theme"}
      </ThemmeButton>

      {visible && (
        <div className="Dropdown__menu">
          <ThemmeButtons
            onClick={() => {
              updateTheme({
                src: ocean,
                colors: { textColor: "rgb(255, 222, 173)" },
                size: "cover",
                position: "unset",
              });
            }}
          >
            Dark
          </ThemmeButtons>

          <ThemmeButtons
            onClick={() => {
              updateTheme({
                src: paper,
                colors: { textColor: "#DC143C" },
                size: "cover",
                position: "unset",
              });
            }}
          >
            Light
          </ThemmeButtons>
        </div>
      )}
    </Dropdown>
  );
}
