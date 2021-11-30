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
import axios from "axios";
import React, { useState } from "react";
import { useSWRConfig } from "swr";

interface CreatePointsProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreatePoints: React.FC<CreatePointsProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState("");
    const { mutate } = useSWRConfig();

    const submit = async () => {
        const res = await axios.post("/api/points", {
            name,
        });

        if (res.data) {
            mutate("/api/points");
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create an Email</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                placeholder="Ex. TechTalks"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                        </FormControl>
                    </Stack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        bgColor="secondary"
                        borderRadius="0"
                        isDisabled={name === ""}
                        onClick={submit}
                    >
                        Create
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreatePoints;
