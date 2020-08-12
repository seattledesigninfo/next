import axios from "axios";
import Head from "next/head";

import { slugify } from "../../lib/helpers";

import { useServicesState } from "../../contexts/ServicesContext";

import Layout from "../../components/Layout";

function Company({ id, fields }) {
  const { status, services: allServices } = useServicesState();
  const { name, url, size, services, twitter, linkedin } = fields;

  return (
    <Layout hideFilters={true}>
      <Head>
        <title>{name} | Seattle Design</title>
        <meta property="og:title" content={`${name} | Seattle Design`} />
      </Head>
      <article className="text-center">
        <header className="mb-md">
          <h1 className="font-display">
            <a href={url} className="flex flex-col">
              <span className="text-xl">{name}</span>
              {url}
            </a>
          </h1>
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
