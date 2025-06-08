export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category?: string;
  dataAiHint?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface UserInfo {
  phone: string;
  name: string;
  address: string;
  complement?: string; // Adicionado campo complemento
}
