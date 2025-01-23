export default interface TBooking {
  customer: string;
  serviceId: string | undefined;
  slotId: string;
  serviceName: string;
  userName: string;
  email: string;
  price: number;
  time: string;
}
