export default function getRoute(type: string, param: string) {
  switch (type) {
    case "source":
      return `/shelf/${param}`;
    case "post":
      return `/posts/${param}`;
    case "project":
      return `/portfolio/${param}`;
    case "note":
      return `/notes/${param}`;
  }
}
