import { get } from "./fetch";

export const version = async () => {
  const getMayor = 1;
  const getMenor = 0;
  const getRevision = 0;

  const { data } = await get("version").then((res) => res.json());

  if (data.length) {
    const { mayor, menor, revision, createdAt } = data[0];

    if (getMayor < mayor) {
      return { value: false, fecha: createdAt };
    } else if (getMenor < menor) {
      return { value: false, fecha: createdAt };
    } else if (getRevision < revision) {
      return { value: false, fecha: createdAt };
    }

    return { value: true, fecha: "" };
  }
};
