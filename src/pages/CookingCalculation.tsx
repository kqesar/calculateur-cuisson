import { HStack, Input, Select, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ICooking } from "../interfaces";
import { useCookingList } from "../store/useCookingList";


export const CookingCalculation = () => {

  const { cookingList, cookingTypeList } = useCookingList();
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
        <Text fontSize={"sm"} w={"20%"} as={"label"} htmlFor="cooking-type">Type de viande:</Text>
        <Select size={"sm"} id="cooking-type" placeholder={'Sélectionner type de viande'} onChange={(event) => {
          setCookingType(event.target.value);
        }}>
          {cookingTypeList.map((cookingType, index) => (
            <option value={cookingType} key={index}>{cookingType}</option>
          ))}
        </Select>
      </HStack>
      {(cookingType != "") && (
        <HStack mt={'2rem'} mb={'2rem'} px={"2rem"}>
          <Text fontSize={"sm"} w={"20%"} as={"label"} htmlFor="weight">Poids de la cuisson:</Text>
          <Input size={"sm"} id="weight" onChange={(event) => {
            const weight = parseFloat(event.target.value.replace(",", "."))
            setCookingWeight(weight);
          }} />
        </HStack>
      )}
      {(cookingWeight > 0 && cookingDuration > 0) && (
        <Text px={"2rem"}>{displayCookingDuration}</Text>
      )}
    </>
  );
}

