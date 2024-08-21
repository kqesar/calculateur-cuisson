import {Button, Input, Td, Tr} from "@chakra-ui/react";
import {AddIcon, CloseIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {ICooking} from "@/interfaces";
import {getFromLocalStorage, setDataToLocalStorage} from "@/lib/storage.ts";

type TableRowCreationCookingProps = {
  onAction(cuisson: ICooking): void
  onCancel(): void
}
export const TableRowCreationCooking = ({onAction, onCancel}:TableRowCreationCookingProps) => {
  const [cuissonState, setCuissonState] = useState({
    name: '',
    weight: '',
    duration: ''
  })
  return (
    <Tr>
      <Td><Input type="text"
        border="1px"
        value={cuissonState.name}
        onChange={(event) => setCuissonState({
          ...cuissonState,
          name: event.target.value
        })}/> </Td>
      <Td><Input type="text"
        border="1px"
        value={cuissonState.weight}
        onChange={(event) => setCuissonState(
          {...cuissonState, weight: event.target.value}
        )}/></Td>
      <Td><Input type="text"
        border="1px"
        value={cuissonState.duration}
        onChange={(event) => setCuissonState(
          {...cuissonState, duration: event.target.value}
        )}/></Td>
      <Td>
        <Button colorScheme='green'
          size="sm"
          width="fit-content"
          onClick={() => {
            const cookingList = getFromLocalStorage<ICooking[]>("cuissons") || []
            const newCuisson: ICooking = {
              name: cuissonState.name,
              weight: parseFloat(cuissonState.weight),
              duration: parseFloat(cuissonState.duration)
            };
            setDataToLocalStorage("cuissons", [...cookingList, newCuisson])
            onAction(newCuisson);
          }}
        ><AddIcon/></Button>
        <Button colorScheme="red"
          size="sm"
          onClick={onCancel}
          marginStart="1rem"
          width="fit-content">
          <CloseIcon/>
        </Button>
      </Td>
    </Tr>
  )
}
