export const apiUrl =
  process.env.NEXT_PUBLIC_DOMAIN === 'localhost'
    ? '/api'
    : process.env.NEXT_PUBLIC_API_URL;

export const fallbackImages = {
  avatar: '',
};
