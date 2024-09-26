export type TService = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  duration: number; // in minutes
  isDeleted: boolean; // false means it is not deleted
};
