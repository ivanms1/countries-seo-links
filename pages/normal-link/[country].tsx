import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

type Country = {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  capital: string;
};

const Country = () => {
  const [country, setCountry] = useState<Country | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const fetchCountry = useCallback(async () => {
    try {
      if (router?.query?.country) {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${router?.query?.country}`
        );
        const data = await res.json();

        setCountry(data[0]);
        setIsLoading(false);
      }
    } catch {
      setIsLoading(false);
    }
  }, [router?.query?.country]);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!country) {
    return <p>Country not found</p>;
  }

  return (
    <div>
      <p>{country?.name?.common}</p>
      <Image
        alt={country.name.common}
        src={country.flags.png}
        height={213}
        width={320}
      />
    </div>
  );
};

export default Country;
