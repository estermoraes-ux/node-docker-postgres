import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== RELACIONAMENTO 1:N (AUTHORS & BOOKS) ===\n');

  const authorWithBooks = await prisma.author.create({
    data: {
      name: 'Machado de Assis',
      books: {
        create: [
          { title: 'Dom Casmurro' },
          { title: 'Memórias Póstumas de Brás Cubas' },
        ],
      },
    },
    include: {
      books: true,
    },
  });

  console.log('Autor e Livros cadastrados com sucesso:');
  console.log(JSON.stringify(authorWithBooks, null, 2));
}

main()
  .catch((e) => {
    console.error('Erro ao cadastrar autor e livros:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });