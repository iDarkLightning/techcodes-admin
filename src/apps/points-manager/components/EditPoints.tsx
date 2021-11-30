import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useSWRConfig } from "swr";

interface EditPointsProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditPoints: React.FC<EditPointsProps> = ({ userId, isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const { mutate } = useSWRConfig();

  const submit = async () => {
    const res = await axios.post("/api/points/manual", {
      userId,
      name,
      value,
    });

    if (res.data) {
      mutate("/api/users");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Points</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Ex. Attendance"
                onChange={(event) => setName(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Value</FormLabel>
              <NumberInput onChange={(_, value) => setValue(value)}>
                <NumberInputField placeholder="Points Awarded" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            bgColor="secondary"
            borderRadius="0"
            isDisabled={name === "" || value === 0}
            onClick={submit}
          >
            Edit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPoints;
