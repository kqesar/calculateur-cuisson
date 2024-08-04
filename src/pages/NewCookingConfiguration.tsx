import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ICooking } from "../interfaces";
import { useCookingList } from "../store/useCookingList";


export const NewCookingConfiguration = () => {
  const [cuisson, setCuisson] = useState<ICooking>({
    name: '', weight: 0, duration: 0
  });
  const [formState,setFormState] = useState({
    weight: '',
    duration: ''
  });
  const { createCookingType } = useCookingList()
  const createCookingConfiguration = () => {
    createCookingType(cuisson);
  };
  return <HStack px={"2rem"} mb={"2rem"}>
    <Text as={"label"} fontSize={"sm"} width={"45%"} htmlFor="new-cooking-type">Type de cuisson: </Text>
    <Input value={cuisson.name} size={"sm"} id="new-cooking-type" onChange={(event) => {
      setCuisson({
        ...cuisson,
        name: event.target.value
      });
    }} />
    <Text as={"label"} fontSize={"sm"} width={"50%"} ml={"2rem"} htmlFor="new-weight">Poids (kg): </Text>
    <Input value={formState.weight} size={"sm"} id="new-weight" onChange={(event) => {
      const value = event.target.value;
      if(value) {
        setCuisson({
          ...cuisson,
          weight: parseInt(value, 10)
        });
      }
      setFormState({
        ...formState,
        weight: value
      });
    }} />
    <Text as={"label"} fontSize={"sm"} width={"50%"} ml={"2rem"} htmlFor="new-duration">Durée (minutes): </Text>
    <Input size="sm" value={formState.duration} id="new-duration" onChange={(event) => {
      const value = event.target.value;
      if(value) {
        setCuisson({
          ...cuisson,
          duration: parseInt(value, 10)
        });
      }
      setFormState({
        ...formState,
        duration: value
      });
    }} />
    <Button colorScheme="green" size={"sm"} width={"30%"} px={"2rem"} onClick={createCookingConfiguration}>Ajouter</Button>
  </HStack>;
}

