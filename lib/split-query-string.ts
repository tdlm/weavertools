export default function splitQueryString(url: string) {
  const queryParams = new URLSearchParams(new URL(url).search);
  const parsedParams: { [key: string]: string } = {}; // Add index signature

  queryParams.forEach((value, key) => {
    parsedParams[key] = value;
  });

  return parsedParams;
}
