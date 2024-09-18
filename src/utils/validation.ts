export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string) => {
  const phoneRegex = /^[0-9]{10,15}$/; // Adaptar el rango según sea necesario
  return phoneRegex.test(phone);
};
