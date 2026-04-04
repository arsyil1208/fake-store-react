import { Dropdown, DropdownItem } from "flowbite-react";

export default function DropdownComponent({ sortProducts }) {
  return (
    <Dropdown label="Urutkan Data" color="alternative" dismissOnClick={false}>
      <DropdownItem onClick={() => sortProducts("Harga Termahal")}>
        Harga Termahal
      </DropdownItem>
      <DropdownItem onClick={() => sortProducts("Harga Termurah")}>
        Harga Termurah
      </DropdownItem>
      <DropdownItem onClick={() => sortProducts("A-Z")}>A-Z</DropdownItem>
      <DropdownItem onClick={() => sortProducts("Z-A")}>Z-A</DropdownItem>
    </Dropdown>
  );
}
