import { Input, Button } from "@chakra-ui/react";
import React, { useState } from "react";

interface SearchUserProps {
  setSearchParam: React.Dispatch<React.SetStateAction<string>>;
}

const SearchUser: React.FC<SearchUserProps> = ({ setSearchParam }) => {
  const [input, setInput] = useState("");

  return (
    <>
      <Input
        placeholder="Name"
        borderRadius="0"
        onChange={(event) => {
          setInput(event.target.value);

          if (event.target.value === "") setSearchParam(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setSearchParam(input);
          }
        }}
      />
      <Button
        bgColor="secondary"
        borderRadius="0"
        onClick={() => setSearchParam(input)}
      >
        Search
      </Button>
    </>
  );
};

export default SearchUser;
