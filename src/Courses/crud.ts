import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('=== INICIANDO CRUD DE CURSOS (PRISMA ORM) ===\n');

  // 1. Cadastrar (CREATE)
  const newCourse = await prisma.course.create({
    data: {
      title: 'Desenvolvimento Fullstack com Node.js e Docker',
      description: 'Aprenda a criar aplicações modernas containerizadas com Prisma ORM.',
      duration: 40,
    },
  });
  console.log('1. Curso Cadastrado:', newCourse);

  // 2. Buscar Todos (READ - ALL)
  const allCourses = await prisma.course.findMany();
  console.log('\n2. Todos os Cursos:', allCourses);

  // 3. Buscar por ID (READ - ONE)
  const courseById = await prisma.course.findUnique({
    where: { id: newCourse.id },
  });
  console.log('\n3. Curso Encontrado por ID:', courseById);

  // 4. Alterar (UPDATE)
  const updatedCourse = await prisma.course.update({
    where: { id: newCourse.id },
    data: {
      title: 'Desenvolvimento Fullstack Avançado com Docker e Prisma',
      duration: 60,
    },
  });
  console.log('\n4. Curso Atualizado:', updatedCourse);

  // 5. Excluir (DELETE)
  const deletedCourse = await prisma.course.delete({
    where: { id: newCourse.id },
  });
  console.log('\n5. Curso Removido com Sucesso. ID:', deletedCourse.id);
}

main()
  .catch((e) => {
    console.error('Erro na execução do CRUD:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });