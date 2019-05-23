import { includes } from 'lodash';


const ticketDataBase = [
  '123456',
  '654321',
];

export default function verifyTicket(ticketId) {
  return includes(ticketDataBase, ticketId);
}
