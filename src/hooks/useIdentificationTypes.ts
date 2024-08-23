import { useState, useEffect, Dispatch, SetStateAction } from "react";
import React from 'react';
import { IdentificationType } from "../models";
import { getIdentificationTypes } from "../components/mercadoPagoCoreInstance/coreMethods";

const useIdentificationTypes = () => {
  const [identificationTypes, setIdentificationTypes]: [
    IdentificationType[] | undefined,
    Dispatch<SetStateAction<IdentificationType[] | undefined>>
  ] = useState<IdentificationType[] | undefined>([]);
  const [errorFetch, setErrorFetch] = useState("");

  useEffect(() => {
    const fetchIdentificationTypes = async () => {
      try {
        const identificationTypes = await getIdentificationTypes();
        setIdentificationTypes(identificationTypes);
      } catch (error) {
        setErrorFetch(
          "An issue occurred while fetching identification types. Please try again later."
        );
        console.error("Failed to fetch Identification Types: ", error);
      }
    };

    fetchIdentificationTypes();
  }, []);

  return { identificationTypes, errorFetch };
};

export default useIdentificationTypes;
