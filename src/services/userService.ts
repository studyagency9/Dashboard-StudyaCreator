
export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
}

// Simuler une récupération des 3 derniers utilisateurs
const users: User[] = [
  { id: '1', name: 'Alice Johnson', phone: '+1 111 222 333', avatar: 'https://i.pravatar.cc/40?u=user1' },
  { id: '2', name: 'Bob Williams', phone: '+1 444 555 666', avatar: 'https://i.pravatar.cc/40?u=user2' },
  { id: '3', name: 'Charlie Brown', phone: '+1 777 888 999', avatar: 'https://i.pravatar.cc/40?u=user3' },
  { id: '4', name: 'Diana Miller', phone: '+1 222 333 444', avatar: 'https://i.pravatar.cc/40?u=user4' },
  { id: '5', name: 'Ethan Davis', phone: '+1 555 666 777', avatar: 'https://i.pravatar.cc/40?u=user5' },
];

export const getNewUsers = async (): Promise<User[]> => {
  console.log('Fetching new users...');
  // Simuler un appel API avec un délai
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simuler une réponse qui peut changer
  const shuffled = [...users].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
};
