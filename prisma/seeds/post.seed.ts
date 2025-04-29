import { PrismaClient } from '@prisma/client';

export async function seedPost(prisma: PrismaClient) {
  await prisma.post.createMany({
    data: [
      {
        title: 'Post 1',
        description: 'Description 1',
        body: 'Body 1',
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: 1,
      },
      {
        title: 'Post 2',
        description: 'Description 2',
        body: 'Body 2',
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        authorId: 2,
      },
    ],
  });

  console.log('Posts seed added successfully 🌱.');
}
