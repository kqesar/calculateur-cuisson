import {Button, Heading, HStack, Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {CookingCalculation} from "./CookingCalculation.tsx";
import {useCookingList} from "@/store/useCookingList.ts";
import {useEffect, useState} from "react";
import {InformationRow} from "@/components/InformationRow.tsx";
import {TableRowCreationCooking} from "@/components/TableRowCreationCooking.tsx";


export const CalculatorView = () => {
  const {cookingList, getCookingTypeList, getCookingList} = useCookingList();
  const [createMode, setCreateMode] = useState(false);
  useEffect(() => {
    getCookingList();
    getCookingTypeList();
  }, []);
  return (
    <>
      <Heading size='md'
        textAlign="center"
        mt="2rem"
        mb="2rem">Calculateur cuisson</Heading>
      <Heading size="md"
        px="2rem"
        mb="2rem">Paramétrage type de viande</Heading>
      <TableContainer maxWidth="90%"
        overflowX="hidden"
        display="flex"
        marginX="auto">
        <Table
          align="center"
          variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Type de cuisson</Th>
              <Th textAlign="center">Poids (kg)</Th>
              <Th textAlign="center">Durée (minutes)</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              cookingList.map((cuisson, index) => (
                <InformationRow cuisson={cuisson}
                  index={index}
                  key={index}/>
              ))}
            {createMode && <TableRowCreationCooking onAction={() => setCreateMode(false)}/>}
          </Tbody>
        </Table>
      </TableContainer>
      <HStack width="90%"
        justifyContent="center">
        {!createMode && <Button colorScheme="green"
          borderTopLeftRadius="0"
          onClick={() => setCreateMode(true)}
          borderTopRightRadius="0">Ajout cuisson</Button>}
      </HStack>
      <Heading size="md"
        px="2rem"
        mt="2rem"
        mb="2rem">Calcul de la cuisson</Heading>
      <CookingCalculation />
    </>
  )
}

