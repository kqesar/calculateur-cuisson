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
    <Text fontSize="sm" width={'60%'} as={"label"}>Type de cuisson: </Text>
    <Input size="sm" w="80%" placeholder="type de cuisson" value={cuisson.name} onChange={(event) => {
      const newCuisson: ICooking = {
        ...cuisson,
        name: event.target.value
      };
      setCuisson(newCuisson);
    }} />
    <Text fontSize="sm" as={"label"} width={'50%'} ml={'2rem'}>Poids (kg): </Text>
    <Input size="sm" w="40%" placeholder="Poids (en kg)" value={cuisson.weight || ''} onChange={(event) => {
      const newCuisson: ICooking = {
        ...cuisson,
        weight: parseInt(event.target.value)
      };
      setCuisson(newCuisson);
    }} />
    <Text fontSize="sm" as={"label"} width={'50%'} ml={'2rem'}>Durée (minutes): </Text>
    <Input size="sm" w="50%" placeholder="Durée (en minutes)" value={cuisson.duration || ''} onChange={(event) => {
      const newCuisson: ICooking = {
        ...cuisson,
        duration: parseInt(event.target.value)
      };
      setCuisson(newCuisson);
    }} />
    <Button colorScheme='green' size="sm" width={'40%'} px={'2rem'} onClick={updateCookingConfiguration}>Modifier</Button>
    <Button colorScheme='red' size="sm" width={'40%'} onClick={deleteCookingConfiguration}>Supprimer</Button>
  </HStack >;
}

