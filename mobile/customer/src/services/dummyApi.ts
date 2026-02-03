export interface Booking {
  id: number;
  customerName: string;
  vehicleType: string;
  price: number;
}

export const bookings: Booking[] = [
  {
    id: 1,
    customerName: 'Praveen',
    vehicleType: 'Lorry',
    price: 1200,
  },
];
