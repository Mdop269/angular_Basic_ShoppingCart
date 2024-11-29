export interface Iproduct{
    isEdit: boolean;
    id: number;
    description : string;
    name: string;
    imageName: string;
    category : string;
    price: number;
    quantityShouldBe: number;
    quantity: number;
    originalValues?: Iproduct;
}


