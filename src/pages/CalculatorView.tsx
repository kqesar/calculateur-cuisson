import {Button, Heading, HStack, Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {CookingCalculation} from "./CookingCalculation.tsx";
import {useEffect, useState} from "react";
import {InformationRow} from "@/components/InformationRow.tsx";
import {TableRowCreationCooking} from "@/components/TableRowCreationCooking.tsx";
import {getCookingList, getCookingTypeList} from "@/store/useCookingList.ts";
import {ICooking} from "@/interfaces";


export const CalculatorView = () => {
  const [createMode, setCreateMode] = useState(false);
  const [cookingList, setCookingList] = useState<ICooking[]>(getCookingList());
  const [cookingTypeList, setCookingTypeList] = useState<string[]>(getCookingTypeList());
  useEffect(() => {
    setCookingList(getCookingList())
    setCookingTypeList(getCookingTypeList());
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
                  onUpdate={()=> {
                    setCookingList(getCookingList())
                  }}
                  key={index}/>
              ))}
            {createMode && <TableRowCreationCooking onCancel={() => setCreateMode(false)}
              onAction={(cuisson: ICooking) => {
                setCreateMode(false)
                cookingList.push(cuisson)
                setCookingTypeList(getCookingTypeList())
              }}/>}
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
      <CookingCalculation cookingList={cookingList}
        cookingTypeList={cookingTypeList}/>
    </>
  )
}

