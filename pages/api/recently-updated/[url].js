import axios from "axios";

const instance = axios.create({
  baseURL: "https://graphql.fauna.com/graphql",
  headers: {
    Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
  },
});

const getContentLength = async (url) => {
  try {
    let response = await axios.get(url);

    if (parseInt(response.headers["content-length"], 10) > 0) {
      return parseInt(response.headers["content-length"], 10);
    } else {
      return parseInt(response.data.length, 10);
    }
  } catch (error) {
    throw error;
  }
};

const updateSiteRecord = async (_id, url, lastUpdate, contentLength) => {
  await instance.post(
    "",
    JSON.stringify({
      query: `mutation ($id: ID!, $url: String!, $lastUpdate: Time!, $contentLength: Int!) {
        updateSite(id: $id, data: { url: $url, lastUpdate: $lastUpdate, contentLength: $contentLength }) {
          url
          lastUpdate
          contentLength
        }
      }
      `,
      variables: {
        id: _id,
        url: url,
        lastUpdate: lastUpdate,
        contentLength: contentLength,
      },
    })
  );
};

const createSiteRecord = async (url, lastUpdate, contentLength) => {
  await instance.post(
    "",
    JSON.stringify({
      query: `mutation ($url: String!, $lastUpdate: Time!, $contentLength: Int!) {
        createSite(data: { url: $url, lastUpdate: $lastUpdate, contentLength: $contentLength }) {
          url
          lastUpdate
          contentLength
        }
      }
      `,
      variables: {
        url: url,
        lastUpdate: lastUpdate,
        contentLength: contentLength,
      },
    })
  );
};

const getLastUpdate = async (url) => {
  let { data } = await instance.post(
    "",
    JSON.stringify({
      query: `query ($url: String!) {
            getSiteByUrl(url: $url) {
              _id
              url
              lastUpdate
              contentLength
            }
          }
        `,
      variables: {
        url: url,
      },
    })
  );

  if (!data.data) {
    return { _id: null, url, dbLastUpdate: new Date(), dbContentLength: 0 };
  }

  return {
    _id: data.data.getSiteByUrl._id,
    url: data.data.getSiteByUrl.url,
    lastUpdate: data.data.getSiteByUrl.lastUpdate,
    dbContentLength: data.data.getSiteByUrl.contentLength,
  };
};

export default async (req, res) => {
  const {
    query: { url },
    method,
  } = req;

  console.log(url);

  let requestUrl = new URL(`//${url}`, "https://www.google.com");
  const timestamp = new Date();

  switch (method) {
    case "HEAD":
    case "GET":
      try {
        const contentLength = await getContentLength(requestUrl.origin);
        let { _id, lastUpdate, dbContentLength } = await getLastUpdate(url);

        if (dbContentLength === 0) {
          // the website was not found, so we need to create it update our database

          await createSiteRecord(url, timestamp, contentLength);
          return res.status(200).json({
            url,
            contentLength: contentLength,
            lastUpdate: timestamp,
          });
        } else if (dbContentLength === contentLength) {
          // the website has not been updated since last crawled

          return res.status(200).json({
            url,
            contentLength: contentLength,
            lastUpdate: lastUpdate,
          });
        } else {
          await updateSiteRecord(_id, url, timestamp, contentLength);

          return res.status(200).json({
            url,
            contentLength: contentLength,
            lastUpdate: timestamp,
          });
        }
      } catch (error) {
        console.log({ error });
        res.status(500).end(`Rutroh`);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
