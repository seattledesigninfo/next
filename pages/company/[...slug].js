import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import DateDiff from "date-diff";

import { slugify } from "../../lib/helpers";

import { useServicesState } from "../../contexts/ServicesContext";

import Layout from "../../components/Layout";

function Company({ id, fields }) {
  const { status, services: allServices } = useServicesState();
  const { name, url, size, services, description, twitter, linkedin } = fields;
  const [updatedRecently, setUpdatedRecently] = useState(false);

  const domain = url.match(/https?:\/\/(.+)/);

  useEffect(() => {
    axios.get(`/api/recently-updated/${domain[1]}`).then((response) => {
      let today = new Date();
      let lastChecked = new Date(response.data.lastUpdate);

      if (new DateDiff(today, lastChecked).days() < 7) {
        setUpdatedRecently(true);
      }
    });
  }, [url, updatedRecently]);

  return (
    <Layout hideFilters={true}>
      <Head>
        <title>{name} | Seattle Design</title>
        <meta name="description" content={`${description}`} />
        <meta property="og:title" content={`${name} | Seattle Design`} />
      </Head>
      <article className="text-center bg-gray-light p-md rounded-md">
        <header className="mb-md">
          <h1 className="font-display">
            <a rel="noreferrer noopener" href={url} className="flex flex-col">
              <span className="text-xl">{name}</span>
              {url}
            </a>
          </h1>
          {updatedRecently && (
            <span className="uppercase text-xs p-sm m-sm inline-block text-white bg-link-hover rounded">
              Updated recently!
            </span>
          )}
        </header>

        <div className="mb-md flex-grow">
          <h2 className="uppercase tracking-widest text-gray-dark text-xs mb-sm">
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

        <div className="mb-md flex-grow">
          <h2 className="uppercase tracking-widest text-gray-dark text-xs mb-sm">
            Size
          </h2>
          {size}
        </div>

        {twitter && (
          <div className="mb-md flex-grow">
            <h2 className="uppercase tracking-widest text-gray-dark text-xs mb-sm">
              Twitter
            </h2>
            <a href={`https://twitter.com/${twitter}`}>{twitter}</a>
          </div>
        )}

        {linkedin && (
          <div className="mb-md flex-grow">
            <h2 className="uppercase tracking-widest text-gray-dark text-xs mb-sm">
              LinkedIn
            </h2>
            <a href={linkedin}>{linkedin}</a>
          </div>
        )}

        <div className="mt-lg text-md text-left">{description}</div>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const [name, id] = slug;

  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Companies/${id}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
    });

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
  const url = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE}/Companies`;
  const response = await axios.get(url, {
    params: {
      view: "Grid view",
    },
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
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
