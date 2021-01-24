import trimString from "@utils/dataNormalizer/trimString";
import dateToLocalisedString from "@utils/date/dateToLocalisedString";

const getAge = (dateOfBirth: string | undefined | null): number | null => {
  const birthDate = trimString(dateOfBirth);
  if (!birthDate) return null;
  const birthYear = dateToLocalisedString(birthDate, "YYYY");
  const birthMonth = dateToLocalisedString(birthDate, "MM");
  const birthDay = dateToLocalisedString(birthDate, "DD");

  const today = new Date();
  const todayYear = dateToLocalisedString(today, "YYYY");
  const todayMonth = dateToLocalisedString(today, "MM");
  const todayDate = dateToLocalisedString(today, "DD");

  // 引き算
  return Math.floor(
    (Number(todayYear + todayMonth + todayDate) -
      Number(birthYear + birthMonth + birthDay)) /
      10000
  );
};

export default getAge;
