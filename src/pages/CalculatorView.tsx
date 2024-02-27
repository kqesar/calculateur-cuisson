import { Button, Heading, HStack } from "@chakra-ui/react";
import { CookingCalculation } from "./CookingCalculation.tsx";
import { NewCookingConfiguration } from "./NewCookingConfiguration.tsx";
import { CookingConfiguration } from "./CookingConfiguration.tsx";
import { useCookingList } from "@/store/useCookingList.ts";
import { useEffect } from "react";


export const CalculatorView = () => {
  const state = useCookingList();
  useEffect(() => {
    state.getCookingList()
  }, [])

  return (
    <>
      <Heading size='md' textAlign={'center'} mt={'2rem'}>Calculateur cuisson</Heading>
      <HStack px={'2rem'} mb={'3rem'}>
        <Button colorScheme={"orange"} onClick={() => state.resetCookingList()}>Remise a zero
          cuisson</Button>
      </HStack>
      <Heading size={'md'} px={'2rem'} mb={'2rem'}>Paramétrage type de viande</Heading>
      {state.cookingList.map((cuisson, index) => (
        <CookingConfiguration key={index} cuisson={cuisson} index={index} />
      ))}
      <Heading size={'md'} px={'2rem'} mb={'2rem'} mt={'2rem'}>Ajout nouvelle cuisson</Heading>
      <NewCookingConfiguration />
      <Heading size={'md'} px={'2rem'} mb={'2rem'}>Calcul de la cuisson</Heading>
      <CookingCalculation />
    </>
  )
}

