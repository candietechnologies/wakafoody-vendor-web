import { FormControl, FormLabel, Input, Spinner } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useGet from "../hooks/useGet";
import { url } from "../utils/lib";

export default function SearchAddress({ onClick, label }) {
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);
  const [show, setShow] = useState(false);

  const queryClient = useQueryClient();

  const apiurl = `${url}/v1/address-suggestion?searchText=${search}`;

  const { data, isPending } = useGet(apiurl, "locations");
  const results = data?.data;

  useEffect(() => {
    const formatted = results?.map((el) => {
      return {
        address: el.formattedAddress,
        lat: el?.referencePosition?.latitude,
        long: el?.referencePosition?.longitude,
        street: el?.address?.street,
        state: el?.address?.state,
        city: el?.address?.city,
        country: el?.address?.countryName,
      };
    });
    setLocations(formatted);
  }, [results]);

  useEffect(() => {
    queryClient.invalidateQueries(["locations"]);
  }, [queryClient, search]);

  return (
    <FormControl>
      <FormLabel fontSize={{ lg: 16, md: 15, base: 12 }}>{label}</FormLabel>

      <Input
        type="search"
        position="relative"
        // onBlur={() => setShow(false)}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          if (!show) setShow(true);
        }}
        fontSize={{ lg: 16, md: 16, base: 16 }}
        _placeholder={{ fontSize: { lg: 16, md: 15, base: 12 } }}
        placeholder="Search Address"
        bg="#FFF0E6"
        border="none"
        textTransform="lowercase"
        focusBorderColor={"#FF4500"}
      />
      {isPending && (
        <div className="w-full cursor-pointer absolute bg-white z-50 top-[75px] flex items-start flex-col p-1 rounded-sm shadow-xl">
          <Spinner colorScheme="orange" />
        </div>
      )}
      {show && !isPending && (
        <div className="w-full cursor-pointer absolute bg-white z-50 top-[75px] flex items-start flex-col p-1 rounded-sm shadow-xl">
          {locations?.map((el, i) => (
            <p
              onClick={() => {
                onClick(el);
                setShow(false);
                setSearch(el.address);
              }}
              key={i}
              className="w-full text-base text-black p-2 border-b">
              {el?.address}
            </p>
          ))}
        </div>
      )}
    </FormControl>
  );
}
