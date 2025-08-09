const express = require('express');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.post('/user', async (req, res) => {
  const { username, password, Mobile, cardId } = req.body;

  if (!/^\d{1,10}$/.test(Mobile)) {
    return res.status(400).json({ error: 'Mobile ต้องเป็นตัวเลขไม่เกิน 10 หลัก' });
  }

  if (!/^\d{1,13}$/.test(cardId)) {
    return res.status(400).json({ error: 'cardId ต้องเป็นตัวเลขไม่เกิน 13 หลัก' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
        Mobile,
        cardId: BigInt(cardId),
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: 'เกิดข้อผิดพลาด' });
  }
});

app.listen(5555, () => {
  console.log('Server running at http://localhost:5555');
});

