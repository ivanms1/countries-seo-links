import { NextSeo } from "next-seo";
import Image from "next/image";

import type { GetStaticProps } from "next";

interface Country {
  country: {
    name: {
      common: string;
    };
    flags: {
      png: string;
    };
    capital: string;
  };
}

const Country = ({ country }: Country) => {
  return (
    <div>
      <p>{country?.name}</p>
      <Image
        alt={country.name.common}
        src={country.flags.png}
        height={213}
        width={320}
      />
      <NextSeo
        openGraph={{
          type: "website",
          url: "https://www.example.com/page",
          title: country.name.common,
          description: `Capital ${country.capital}`,
          images: [
            {
              url: country.flags.png,
              width: 320,
              height: 213,
              alt: country.name.common,
            },
          ],
        }}
      />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${params?.name}`
  );

  const results = await res.json();
  return {
    props: {
      country: results?.[0],
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");

  const data = await res.json();
  console.log("data", data);
  return {
    paths: data?.map((country: { name: { common: string } }) => ({
      params: {
        name: country.name.common.toLocaleLowerCase().replaceAll(" ", "-"),
      },
    })),
    fallback: true,
  };
};

export default Country;
