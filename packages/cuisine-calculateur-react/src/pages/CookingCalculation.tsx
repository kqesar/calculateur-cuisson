import { HStack, Input, Select, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useEffect, useState } from "react";
import { ICooking } from "../interfaces";


export const CookingCalculation = () => {

  const { cookingList, cookingTypeList } = useSelector((state: RootState) => state.cookingList);

  const [cookingType, setCookingType] = useState('');
  const [cookingWeight, setCookingWeight] = useState(0);
  const [cookingDuration, setCookingDuration] = useState(0);
  const [displayCookingDuration, setDisplayCookingDuration] = useState('');

  useEffect(() => {
    const cuisson = cookingList.find((cuisson: ICooking) => {
      return cuisson.name === cookingType;
    });
    if (cuisson) {
      const poidsCuisson = parseFloat(cookingWeight.toString().replace(",", "."));
      setCookingDuration(() => {
        return (poidsCuisson * cuisson.duration) / cuisson.weight;
      });
    }
  }, [cookingWeight, cookingList, cookingType]);
  useEffect(() => {
    const heure = Math.floor(cookingDuration / 60);
    const minutes = Math.floor(cookingDuration - (heure * 60));
    setDisplayCookingDuration(() => {
      return (isNaN(cookingDuration)) ? '' : `${heure} h ${minutes} (${Math.floor(cookingDuration)} minutes)`;
    });
  }, [cookingDuration]);

  return (
    <>
      <HStack px={"2rem"}>
        <Text fontSize={"sm"} w={"20%"}>Type de viande:</Text>
        <Select size={"sm"} placeholder={'Sélectionner type de viande'} onChange={(event) => {
          setCookingType(event.target.value);
        }}>
          {cookingTypeList.map((cookingType, index) => (
            <option value={cookingType} key={index}>{cookingType}</option>
          ))}
        </Select>
      </HStack>
      {(cookingType != "") && (
        <HStack mt={'2rem'} mb={'2rem'} px={"2rem"}>
          <Text fontSize={"sm"} w={"20%"}>Poids de la cuisson:</Text>
          <Input size={"sm"} onChange={(event) => {
            setCookingWeight(parseInt(event.target.value));
          }} />
        </HStack>
      )}
      {(cookingWeight > 0 && cookingDuration > 0) && (
        <Text px={"2rem"}>{displayCookingDuration}</Text>
      )}
    </>
  );
}

