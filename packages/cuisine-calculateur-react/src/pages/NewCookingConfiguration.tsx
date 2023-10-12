import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createCookingType } from "../store/cookingListSlice.ts";
import { useState } from "react";
import { ICooking } from "../interfaces";


export const NewCookingConfiguration = () => {
  const [cuisson, setCuisson] = useState<ICooking>({
    name: '', weight: 0, duration: 0
  });
  const dispatch = useDispatch();
  const createCookingConfiguration = () => {
    dispatch(createCookingType(cuisson));
  };
  return <HStack px={"2rem"} mb={"2rem"}>
    <Text width={"45%"}>Type de cuisson: </Text>
    <Input value={cuisson.name} onChange={(event) => {
      setCuisson({
        ...cuisson,
        name: event.target.value
      });
    }} />
    <Text width={"50%"} ml={"2rem"}>Poids (en kg): </Text>
    <Input value={cuisson.weight} onChange={(event) => {
      setCuisson({
        ...cuisson,
        weight: parseInt(event.target.value)
      });
    }} />
    <Text width={"50%"} ml={"2rem"}>Durée (en minutes): </Text>
    <Input value={cuisson.duration} onChange={(event) => {
      setCuisson({
        ...cuisson,
        duration: parseInt(event.target.value)
      });
    }} />
    <Button colorScheme="green" width={"30%"} px={"2rem"} onClick={createCookingConfiguration}>Enregistrer</Button>
  </HStack>;
}

