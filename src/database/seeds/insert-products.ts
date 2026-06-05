import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("products").del();

    await knex("products").insert([
        { product_name: "Batata Frita Tradicional", product_price: 22.90 },
        { product_name: "Batata Frita com Cheddar e Bacon", product_price: 32.50 },
        { product_name: "Anéis de Cebola Empanados", product_price: 19.90 },
        { product_name: "Bruschetta de Tomate e Manjericão", product_price: 24.00 },
        { product_name: "Iscas de Peixe Empanadas", product_price: 45.90 },
        { product_name: "Pastéis Mistos (Carne e Queijo) - 6un", product_price: 28.00 },
        { product_name: "Coxinha de Frango com Catupiry - 4un", product_price: 18.50 },

        // --- PRATOS PRINCIPAIS ---
        { product_name: "Filé Mignon ao Molho Madeira", product_price: 68.90 },
        { product_name: "Parmegiana de Frango com Purê", product_price: 42.00 },
        { product_name: "Feijoada Completa Individual", product_price: 49.90 },
        { product_name: "Risoto de Cogumelos Trufado", product_price: 54.50 },
        { product_name: "Salmão Grelhado com Legumes", product_price: 72.00 },
        { product_name: "Strogonoff de Carne com Batata Palha", product_price: 38.90 },
        { product_name: "Burguer Artesanal 180g com Bacon", product_price: 36.00 },
        { product_name: "Massa Penne ao Molho Pesto", product_price: 35.50 },
        { product_name: "Salada Caesar com Tiras de Frango", product_price: 29.90 },

        // --- BEBIDAS ---
        { product_name: "Água Mineral Sem Gás 500ml", product_price: 4.50 },
        { product_name: "Água Mineral Com Gás 500ml", product_price: 5.00 },
        { product_name: "Refrigerante Lata 350ml", product_price: 6.50 },
        { product_name: "Suco Natural de Laranja 400ml", product_price: 9.00 },
        { product_name: "Suco Natural de Limão 400ml", product_price: 8.50 },
        { product_name: "Chá Gelado com Limão", product_price: 7.90 },
        { product_name: "Cerveja Long Neck Premium", product_price: 11.00 },
        { product_name: "Chopp Artesanal Caneca 500ml", product_price: 15.00 },

        // --- SOBREMESAS ---
        { product_name: "Pudim de Leite Condensado", product_price: 12.00 },
        { product_name: "Grand Gateau com Picolé", product_price: 28.90 },
        { product_name: "Brownie com Sorvete de Creme", product_price: 19.50 },
        { product_name: "Mousse de Maracujá", product_price: 10.00 },
        { product_name: "Cheesecake de Frutas Vermelhas", product_price: 22.00 },
        { product_name: "Salada de Frutas com Sorvete", product_price: 14.90 }
    ]);
};
