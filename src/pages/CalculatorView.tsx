import { Button, Heading, HStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCookingList,
  resetCookingList
} from "../store/cookingListSlice.ts";
import { RootState } from "../store";
import { useEffect } from "react";
import { CookingCalculation } from "./CookingCalculation.tsx";
import { NewCookingConfiguration } from "./NewCookingConfiguration.tsx";
import { CookingConfiguration } from "./CookingConfiguration.tsx";

export const CalculatorView = () => {
  const { cookingList } = useSelector((state: RootState) => state.cookingList)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCookingList())
  }, [dispatch])

  function resetCookingConfigurations() {
    return () => dispatch(resetCookingList());
  }

  return (
    <>
      <Heading size='md' textAlign={'center'} mt={'2rem'}>Calculateur cuisson</Heading>
      <HStack px={'2rem'} mb={'3rem'}>
        <Button colorScheme={"orange"} onClick={resetCookingConfigurations()}>Remise a zero
          cuisson</Button>
      </HStack>
      <Heading size={'md'} px={'2rem'} mb={'2rem'}>Paramétrage type de viande</Heading>
      {cookingList.map((cuisson, index) => (
        <CookingConfiguration key={index} cuisson={cuisson} index={index} />
      ))}
      <Heading size={'md'} px={'2rem'} mb={'2rem'} mt={'2rem'}>Ajout nouvelle cuisson</Heading>
      <NewCookingConfiguration />
      <Heading size={'md'} px={'2rem'} mb={'2rem'}>Calcul de la cuisson</Heading>
      <CookingCalculation />
    </>
  )
}
