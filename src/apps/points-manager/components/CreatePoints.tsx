import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  namedOperations,
  useCreatePointsMutation,
} from "../../../generated/graphql";

interface CreatePointsProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePoints: React.FC<CreatePointsProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [create] = useCreatePointsMutation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a Link</ModalHeader>
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
            onClick={async () => {
              await create({
                variables: { input: { name, value } },
                refetchQueries: [namedOperations.Query.Points],
              });

              onClose();
            }}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePoints;
