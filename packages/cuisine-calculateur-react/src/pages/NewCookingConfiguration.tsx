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
    <Text as={"label"} fontSize={"sm"} width={"45%"}>Type de cuisson: </Text>
    <Input value={cuisson.name} size={"sm"} onChange={(event) => {
      setCuisson({
        ...cuisson,
        name: event.target.value
      });
    }} />
    <Text as={"label"} fontSize={"sm"} width={"50%"} ml={"2rem"}>Poids (en kg): </Text>
    <Input value={cuisson.weight} size={"sm"} onChange={(event) => {
      setCuisson({
        ...cuisson,
        weight: parseInt(event.target.value)
      });
    }} />
    <Text as={"label"} fontSize={"sm"} width={"50%"} ml={"2rem"}>Durée (en minutes): </Text>
    <Input size="sm" value={cuisson.duration} onChange={(event) => {
      setCuisson({
        ...cuisson,
        duration: parseInt(event.target.value)
      });
    }} />
    <Button colorScheme="green" size={"sm"} width={"30%"} px={"2rem"} onClick={createCookingConfiguration}>Enregistrer</Button>
  </HStack>;
}

