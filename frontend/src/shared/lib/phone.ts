export function clearPhone(phone: string): string {
  return "8" + phone.replace(/\D/g, "").slice(1);
}
export function formatPhoneNumber(phoneNumber: string): string {
  // Проверяем, что номер состоит из 11 цифр
  if (phoneNumber.length !== 11 || isNaN(Number(phoneNumber))) {
    throw new Error("Неверный формат номера телефона");
  }

  // Форматируем номер телефона
  const formattedNumber = `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
    4,
    7
  )}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9)}`;

  return formattedNumber;
}
