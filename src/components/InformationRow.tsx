import {ICooking} from "@/interfaces";
import {Button, Input, Td, Text, Tr} from "@chakra-ui/react";
import {CheckIcon, DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useState} from "react";
import {getFromLocalStorage, setDataToLocalStorage} from "@/lib/storage.ts";

type InformationRowProps = {
  cuisson: ICooking,
  onUpdate(): void
  index: number
}
export const InformationRow = ({cuisson, index,onUpdate}: InformationRowProps) => {
  const [editableMode, setEditableMode] = useState(false)
  const [cuissonState, setCuissonState] = useState({
    name: cuisson?.name,
    weight: cuisson?.weight.toString(),
    duration: cuisson?.duration.toString()
  })

  const updateRow = () => {
    const cookingList = getFromLocalStorage<ICooking[]>("cuissons") || []
    cookingList[index] = {
      name: cuissonState.name,
      weight: parseFloat(cuissonState.weight),
      duration: parseFloat(cuissonState.duration)
    }
    setDataToLocalStorage("cuissons", cookingList)
    setEditableMode(!editableMode)
    onUpdate()
  }

  return editableMode ? (<Tr>
    <Td width="30%"><Input type="text"
      border="1px"
      value={cuissonState.name}
      onChange={(event) => setCuissonState({
        ...cuissonState,
        name: event.target.value
      })}/> </Td>
    <Td width="30%"><Input type="text"
      border="1px"
      value={cuissonState.weight}
      onChange={(event) => setCuissonState(
        {...cuissonState, weight: event.target.value}
      )}/></Td>
    <Td width="30%"><Input type="text"
      border="1px"
      value={cuissonState.duration}
      onChange={(event) => setCuissonState(
        {...cuissonState, duration: event.target.value}
      )}/></Td>
    <Td>
      <Button colorScheme='green'
        size="sm"
        width="fit-content"
        onClick={updateRow}
      ><CheckIcon/></Button>
    </Td>
  </Tr>) : (
    <Tr>
      <Td width="30%">
        <Text>{cuisson?.name}</Text></Td>
      <Td width="30%">{cuisson?.weight}</Td>
      <Td width="30%">{cuisson?.duration}</Td>
      <Td>
        <Button colorScheme='green'
          size="sm"
          width="fit-content"
          onClick={()=>setEditableMode(!editableMode)}
        ><EditIcon/></Button>
        <Button colorScheme='red'
          size="sm"
          width="fit-content"
          marginStart="1rem"
        ><DeleteIcon/></Button>
      </Td>
    </Tr>
  )
}
