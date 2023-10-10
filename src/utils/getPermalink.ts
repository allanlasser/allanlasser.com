import getSiteUrl from "./getSiteUrl";

interface PermalinkableObject {
  _type: string;
  _id: string;
  slug: {
    current: string | null;
  } | null;
}

const routeMap = {
  note: "notes",
  source: "shelf",
  post: "posts",
};

export default function getPermalink(object: PermalinkableObject) {
  const siteURL = getSiteUrl();
  return `${siteURL}/${routeMap[object._type]}/${
    object.slug?.current ?? object._id
  }`;
}
