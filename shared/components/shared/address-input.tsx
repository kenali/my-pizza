"use client";

import { useState } from "react";
import AsyncSelect from "react-select/async";
import { Input } from "../ui";

interface Props {
  onChange: (value: string) => void;
}

export const AddressInput = ({ onChange }: Props) => {
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedStreet, setSelectedStreet] = useState<any>(null);
  const [house, setHouse] = useState("");

  const API_KEY = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY;
  const updateFullAddress = (city: any, street: any, houseNum: string) => {
    if (city && street && houseNum) {
      onChange(`${city.label}, ${street.label}, bldg. ${houseNum}`);
    } else {
      onChange("");
    }
  };

  const loadCityOptions = async (inputValue: string) => {
    if (inputValue.length < 3) return [];
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "AddressGeneral",
        calledMethod: "searchSettlements",
        methodProperties: { CityName: inputValue, Limit: "20" },
      }),
    });
    const res = await response.json();
    if (!res.success) return [];
    return (
      res.data[0]?.Addresses?.map((item: any) => ({
        value: item.DeliveryCity,
        label: item.Present,
      })) || []
    );
  };

  const loadStreetOptions = async (inputValue: string) => {
    if (!selectedCity?.value || inputValue.length < 2) return [];
    const response = await fetch("https://api.novaposhta.ua/v2.0/json/", {
      method: "POST",
      body: JSON.stringify({
        apiKey: API_KEY,
        modelName: "Address",
        calledMethod: "getStreet",
        methodProperties: {
          CityRef: selectedCity.value,
          FindByString: inputValue,
          Limit: "20",
        },
      }),
    });
    const res = await response.json();
    if (!res.success) return [];
    return res.data.map((item: any) => ({
      value: item.Ref,
      label: item.Description,
    }));
  };

  const handleCityChange = (city: any) => {
    setSelectedCity(city);
    setSelectedStreet(null);
    setHouse("");
    updateFullAddress(city, null, "");
  };

  const handleStreetChange = (street: any) => {
    setSelectedStreet(street);
    updateFullAddress(selectedCity, street, house);
  };

  const handleHouseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHouse(value);
    updateFullAddress(selectedCity, selectedStreet, value);
  };

  return (
    <div className="flex flex-col gap-4">
      <AsyncSelect
        instanceId="city-select"
        cacheOptions
        isClearable
        value={selectedCity}
        loadOptions={loadCityOptions}
        placeholder="Select city..."
        onChange={handleCityChange}
      />

      <div className="flex gap-2">
        <div className="flex-1">
          <AsyncSelect
            instanceId="street-select"
            key={selectedCity?.value}
            cacheOptions
            isClearable
            value={selectedStreet}
            loadOptions={loadStreetOptions}
            isDisabled={!selectedCity}
            placeholder={selectedCity ? "Enter street..." : "Select city first"}
            onChange={handleStreetChange}
          />
        </div>

        <Input
          className="flex h-10 w-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Apt/Bldg"
          value={house}
          disabled={!selectedStreet}
          onChange={handleHouseChange}
        />
      </div>
    </div>
  );
};
