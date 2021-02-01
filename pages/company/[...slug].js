import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import DateDiff from "date-diff";

import { slugify } from "../../lib/helpers";
import { airtable } from "../../lib/airtable";

import { useServicesState } from "../../contexts/ServicesContext";

import { Twitter, Linkedin } from "../../components/Icon";
import Layout from "../../components/Layout";

function Company({ id, fields }) {
  const { status, services: allServices } = useServicesState();
  const {
    name,
    url,
    size,
    services,
    description,
    address,
    address_locality,
    postal_code,
    twitter,
    linkedin,
  } = fields;
  const [updatedRecently, setUpdatedRecently] = useState(false);

  const domain = url.match(/https?:\/\/(.+)/);
  const mapsUrl = `https://www.google.com/maps/place/${address}+${address_locality}+${postal_code}`;

  useEffect(() => {
    if (!updatedRecently) {
      axios
        .get(`/api/recently-updated/${domain[1]}?ar=${id}`)
        .then((response) => {
          let today = new Date();
          let lastChecked = new Date(response.data.lastUpdate);

          if (new DateDiff(today, lastChecked).days() < 7) {
            setUpdatedRecently(true);
          }
        });
    }
  }, [domain, updatedRecently]);

  return (
    <Layout hideFilters={true}>
      <Head>
        <title>{name} | Seattle Design</title>
        <meta name="description" content={`${description}`} />
        <meta property="og:title" content={`${name} | Seattle Design`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": url,
              name: name,
              address: {
                "@type": "PostalAddress",
                addressLocality: address_locality,
                addressRegion: "WA",
                postalCode: postal_code,
                streetAddress: address,
              },
              url: url,
            }),
          }}
        />
      </Head>
      <article className="text-center bg-gray-light p-md rounded-md relative">
        <header className="mb-md">
          <h1 className="font-display">
            <a rel="noreferrer noopener" href={url} className="flex flex-col">
              <span className="text-xl">{name}</span>
              {url}
            </a>
          </h1>
          <div
            className={`uppercase text-xs p-sm m-sm top-0 right-0 text-brand bg-white rounded transition-opacity duration-200 absolute ${
              updatedRecently ? "opacity-100" : "opacity-0"
            }`}
          >
            Updated recently!
          </div>
        </header>

        <div className="mb-md flex justify-center">
          {twitter && (
            <a
              rel="noreferrer noopener"
              className="hover:text-link-hover mx-sm"
              href={twitter}
            >
              <Twitter height="20" width="20" />
            </a>
          )}
          {linkedin && (
            <a
              rel="noreferrer noopener"
              className="hover:text-link-hover mx-sm"
              href={linkedin}
            >
              <Linkedin height="20" width="20" />
            </a>
          )}
        </div>

        <div className="mb-lg flex-grow">
          <h2 className="uppercase tracking-widest text-gray-dark text-sm mb-xs">
            Services
          </h2>
          {status === "done" &&
            services
              .map((service) => {
                const s = allServices.find((s) => s.id === service);
                return <span key={service}>{s.name}</span>;
              })
              .reduce((prev, curr) => [prev, ", ", curr])}
        </div>

        <div className="mb-lg flex-grow">
          <h2 className="uppercase tracking-widest text-gray-dark text-sm mb-xs">
            Size
          </h2>
          {size}
        </div>

        <div className="mb-lg flex-grow">
          <h2 className="uppercase tracking-widest text-gray-dark text-sm mb-xs">
            Location
          </h2>
          <a href={mapsUrl.replace(/\s/g, "+")}>{address}</a>
        </div>

        <div className="mt-lg text-md text-left">{description}</div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const [name, id] = slug;

  try {
    const response = await airtable.get(`/Companies/${id}`);

    return {
      props: {
        id: response.data.id,
        fields: response.data.fields,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        id: null,
        fields: [],
      },
    };
  }
}

export async function getStaticPaths() {
  const response = await airtable.get("/Companies", {
    params: {
      view: "Grid view",
    },
  });

  return {
    paths: response.data.records.map((company) => {
      return { params: { slug: [slugify(company.fields.name), company.id] } };
    }),
    fallback: false,
  };
}

export default Company;
