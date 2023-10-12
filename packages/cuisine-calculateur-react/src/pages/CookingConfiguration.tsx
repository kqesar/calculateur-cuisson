import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { deleteCooking, updateCooking } from "../store/cookingListSlice.ts";
import { useState } from "react";
import { ICooking } from "../interfaces";


export const CookingConfiguration = (props: { cuisson: ICooking; index: number; }) => {
  const [cuisson, setCuisson] = useState(props.cuisson);
  const dispatch = useDispatch();

  const deleteCookingConfiguration = () => {
    dispatch(deleteCooking(props.index));
  };

  const updateCookingConfiguration = () => {
    dispatch(updateCooking({ cuisson, index: props.index }));
  };

  return <HStack px={"2rem"} mb={"0.5rem"}>
    <Text width={'45%'}>Type de cuisson: </Text>
    <Input value={cuisson.name} onChange={(event) => {
      const newCuisson: ICooking = {
        ...cuisson,
        name: event.target.value
      };
      setCuisson(newCuisson);
    }} />
    <Text width={'50%'} ml={'2rem'}>Poids (en kg): </Text>
    <Input value={cuisson.weight} onChange={(event) => {
      const newCuisson: ICooking = {
        ...cuisson,
        weight: parseInt(event.target.value)
      };
      setCuisson(newCuisson);
    }} />
    <Text width={'50%'} ml={'2rem'}>Durée (en minutes): </Text>
    <Input value={cuisson.duration} onChange={(event) => {
      const newCuisson: ICooking = {
        ...cuisson,
        duration: parseInt(event.target.value)
      };
      setCuisson(newCuisson);
    }} />
    <Button colorScheme='green' width={'30%'} px={'3rem'} onClick={updateCookingConfiguration}>Modifier
      cuisson</Button>
    <Button colorScheme='red' width={'30%'} onClick={deleteCookingConfiguration}>Supprimer</Button>
  </HStack>;
}

