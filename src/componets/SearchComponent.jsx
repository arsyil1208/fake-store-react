import { Label, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";

export default function SearchComponent({ prosessearch }) {
  return (
    <div>
      <div className="w-5xl">
        <TextInput
          id="search"
          type="text"
          icon={IoIosSearch}
          placeholder="cari produts"
          required
          onKeyUp={(event) => prosessearch(event)}
        />
      </div>
    </div>
  );
}
