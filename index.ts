import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- TESTANDO CONEXÃO E OPERAÇÕES CRUD NO POSTGRESQL VIA DOCKER ---');

  // 1. Criar Usuário (CREATE)
  const user = await prisma.user.create({
    data: {
      name: 'Ester Morais',
      email: `ester.${Date.now()}@example.com`,
    },
  });
  console.log('Usuário Criado:', user);

  // 2. Listar Usuários (READ)
  const users = await prisma.user.findMany();
  console.log('Lista de Usuários no Banco:', users);

  // 3. Atualizar Usuário (UPDATE)
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { name: 'Ester Morais (Atualizado)' },
  });
  console.log('Usuário Atualizado:', updatedUser);

  // 4. Remover Usuário (DELETE)
  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  });
  console.log('Usuário Removido com Sucesso:', deletedUser.id);
}

main()
  .catch((e) => {
    console.error('Erro de Conexão/Execução:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });